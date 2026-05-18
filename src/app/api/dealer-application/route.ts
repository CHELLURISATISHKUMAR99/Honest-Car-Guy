import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const ApplicationSchema = z.object({
  tier: z.enum(['listed', 'certified', 'premier']),
  dealership: z.object({
    name: z.string().min(1),
    licenseNumber: z.string().min(1),
    yearsInBusiness: z.number().int().min(0),
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}$/),
    website: z.string().optional(),
    inventoryType: z.enum(['new', 'used', 'both']),
  }),
  contact: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7),
    role: z.string().min(1),
  }),
  details: z.object({
    specialties: z.array(z.string()).min(1),
    blurb: z.string().min(20).max(2000),
  }),
  pledge: z
    .object({
      pricingOTD: z.boolean(),
      noMarketAdjustments: z.boolean(),
      responseTime: z.boolean(),
      inspectionsWelcome: z.boolean(),
      noMandatoryAddOns: z.boolean(),
      freeVehicleHistory: z.boolean(),
    })
    .optional(),
});

type Application = z.infer<typeof ApplicationSchema>;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid application data', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const app = parsed.data;

  if (app.tier !== 'listed') {
    if (!app.pledge || !Object.values(app.pledge).every(Boolean)) {
      return NextResponse.json(
        { error: 'All six pledge commitments are required for Certified and Premier tiers.' },
        { status: 400 },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ADMIN_EMAIL;

  if (apiKey && from && to) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: app.contact.email,
        subject: `[Dealer Application] ${app.dealership.name} — ${app.tier}`,
        text: formatEmail(app),
      });
    } catch (e) {
      console.error('[dealer-application] resend send failed', e);
    }
  } else {
    console.log('[dealer-application] received (no email configured)');
    console.log(JSON.stringify(app, null, 2));
  }

  return NextResponse.json({ ok: true });
}

function formatEmail(app: Application): string {
  const lines: string[] = [];
  lines.push(`Tier: ${app.tier}`);
  lines.push('');
  lines.push('Dealership');
  lines.push(`  Name: ${app.dealership.name}`);
  lines.push(`  License: ${app.dealership.licenseNumber}`);
  lines.push(`  Years: ${app.dealership.yearsInBusiness}`);
  lines.push(`  Inventory: ${app.dealership.inventoryType}`);
  lines.push(
    `  Address: ${app.dealership.address}, ${app.dealership.city}, ${app.dealership.state} ${app.dealership.zip}`,
  );
  if (app.dealership.website) lines.push(`  Website: ${app.dealership.website}`);
  lines.push('');
  lines.push('Contact');
  lines.push(`  ${app.contact.name} (${app.contact.role})`);
  lines.push(`  ${app.contact.email}`);
  lines.push(`  ${app.contact.phone}`);
  lines.push('');
  lines.push('Specialties');
  lines.push(`  ${app.details.specialties.join(', ')}`);
  lines.push('');
  lines.push('About');
  lines.push(`  ${app.details.blurb}`);
  if (app.pledge) {
    lines.push('');
    lines.push('Pledge');
    for (const [k, v] of Object.entries(app.pledge)) {
      lines.push(`  ${v ? '[x]' : '[ ]'} ${k}`);
    }
  }
  return lines.join('\n');
}
