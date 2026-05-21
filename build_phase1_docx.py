from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

RED = RGBColor(0xc8, 0x32, 0x1a)
GOLD = RGBColor(0xc9, 0xa8, 0x4c)
BLACK = RGBColor(0x0d, 0x0d, 0x0d)
GRAY = RGBColor(0x6b, 0x6b, 0x6b)
CREAM_HEX = "F5F2EE"
RED_HEX = "C8321A"
GOLD_HEX = "C9A84C"

doc = Document()

style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)
style.font.color.rgb = BLACK

for s in doc.sections:
    s.top_margin = Cm(2)
    s.bottom_margin = Cm(2)
    s.left_margin = Cm(2)
    s.right_margin = Cm(2)


def shade(cell, hex_color):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:fill'), hex_color)
    tc_pr.append(shd)


def add_title(text, size=28, color=RED, bold=True, align=WD_ALIGN_PARAGRAPH.LEFT):
    p = doc.add_paragraph()
    p.alignment = align
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = color
    return p


def add_subtitle(text, color=GRAY, size=11, italic=True):
    p = doc.add_paragraph()
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.italic = italic
    r.font.color.rgb = color
    return p


def add_h2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(6)
    r = p.add_run(text)
    r.font.size = Pt(16)
    r.font.bold = True
    r.font.color.rgb = BLACK
    pPr = p._p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '12')
    bottom.set(qn('w:color'), RED_HEX)
    pBdr.append(bottom)
    pPr.append(pBdr)
    return p


def add_h3(text, color=RED):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(text)
    r.font.size = Pt(13)
    r.font.bold = True
    r.font.color.rgb = color
    return p


def add_bullet(text, level=0, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.left_indent = Cm(0.6 + level * 0.6)
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.font.bold = True
        r.font.color.rgb = BLACK
        r2 = p.add_run(" " + text)
        r2.font.color.rgb = BLACK
    else:
        r = p.add_run(text)
        r.font.color.rgb = BLACK
    return p


add_title("Phase 1 — Revised Scope", size=30)
add_subtitle("Info For You Auto  ·  Prepared by Quad 4 Consulting", color=GRAY, size=11, italic=True)

p = doc.add_paragraph()
r = p.add_run("Phase 1 delivers brand assets plus the public-facing website. Dealer applications are routed via email; approval is manual. No database, payments, or admin panel — those are scoped into Phases 2 and 3.")
r.font.size = Pt(10)
r.font.italic = True
r.font.color.rgb = GRAY

add_h2("1. Branding Deliverables")

add_h3("Logo Design", color=RED)
add_bullet("3 design concepts presented for review")
add_bullet("2 rounds of revisions on the chosen concept")
add_bullet("Final files delivered in vector formats: .svg and .ai")
add_bullet("PNG with transparent background (multiple sizes)")
add_bullet("Favicon for the website (.ico + .png)")

add_h3("Visiting Card Design", color=RED)
add_bullet("Front and back layouts")
add_bullet("Print-ready PDF (300 DPI, CMYK, with bleed)")
add_bullet("High-resolution JPG for digital sharing")
add_bullet("Design matched to the approved logo and brand palette")

add_h2("2. Website Build")

add_h3("Home Page + Podcast Page", color=RED)
add_bullet("Branded home page: hero, recent episodes, Car Finder explainer, certified dealers preview")
add_bullet("Podcast archive listing every episode")
add_bullet("Inline YouTube video player on episode cards (click-to-play, performance optimized)")
add_bullet("Audio-only episodes display gracefully without a player")

add_h3("Car Finder (7-Step Tool)", color=RED)
add_bullet("Guided 7-step flow: Budget → Body Style → Fuel → Seats → Use → Priorities → ZIP")
add_bullet("Custom scoring algorithm ranks vehicles against shopper inputs")
add_bullet("Top-5 vehicle results shown with plain-English reasons for each pick")
add_bullet("Nearby dealer recommendations based on ZIP proximity, tier, and specialty match")
add_bullet("One-click 'Get directions' opens Google Maps to the dealer")

add_h3("Dealer Apply Form", color=RED)
add_bullet("Multi-step application form on /dealers/apply")
add_bullet("Required fields: dealership info, license, contact, specialties, pledge signature")
add_bullet("Submission emails AutoInfo4U with the full application via Resend")
add_bullet("AutoInfo4U vets and approves dealers via email reply")
add_bullet("Approved dealers are manually added to the site by editing the dealer data file")

add_h3("Transparency Pledge Page", color=RED)
add_bullet("Public page listing the six dealer commitments")
add_bullet("Performance threshold table comparing Certified vs Premier requirements")
add_bullet("Automatic disqualifier note (bait-and-switch, fake reviews, etc.)")
add_bullet("Call-to-action linking to the dealer application form")

add_h3("Packages Page", color=RED)
add_bullet("Dealer tier pricing: Listed, Certified, Premier")
add_bullet("Podcast sponsorship tiers: Episode Spot, Series Sponsor, Season Sponsor")
add_bullet("Each card links directly to the dealer application or sponsor inquiry")

add_h3("Hosting, Domain, Source Code", color=RED)
add_bullet("Deployed to Vercel with automatic HTTPS and global CDN")
add_bullet("Custom domain configuration (AutoInfo4U owns the domain)")
add_bullet("Full source code transferred to AutoInfo4U's GitHub repository")
add_bullet("AutoInfo4U owns the code outright — no licensing, no vendor lock-in")

add_h2("3. Phase 1 At-a-Glance Summary")

table = doc.add_table(rows=1, cols=2)
table.style = 'Light Grid Accent 1'
hdr = table.rows[0].cells
hdr[0].text = "Deliverable"
hdr[1].text = "Format"

for c in hdr:
    shade(c, "0D0D0D")
    for para in c.paragraphs:
        for run in para.runs:
            run.font.bold = True
            run.font.color.rgb = RGBColor(0xff, 0xff, 0xff)
            run.font.size = Pt(11)

rows = [
    ("Logo design package", "SVG, AI, PNG, favicon"),
    ("Visiting card design", "Print-ready PDF + JPG"),
    ("Home page", "Live URL"),
    ("Podcast page with inline YouTube videos", "Live URL"),
    ("Car Finder (7-step tool)", "Live URL"),
    ("Transparency Pledge page", "Live URL"),
    ("Dealer Apply form (emails AutoInfo4U)", "Live URL + Resend integration"),
    ("Packages page (dealer + sponsor tiers)", "Live URL"),
    ("404 / not found page", "Live URL"),
    ("Hosting on Vercel + custom domain", "Production URL with HTTPS"),
    ("Source code on GitHub", "Repository ownership transferred"),
    ("Documentation (README, brand guide)", "Markdown in repo"),
    ("60-min handoff walkthrough", "Recorded session"),
]

for i, (deliverable, fmt) in enumerate(rows):
    row = table.add_row().cells
    row[0].text = deliverable
    row[1].text = fmt
    fill = CREAM_HEX if i % 2 == 0 else "FFFFFF"
    for c in row:
        shade(c, fill)
        for para in c.paragraphs:
            for run in para.runs:
                run.font.size = Pt(10)
                run.font.color.rgb = BLACK

add_h2("4. Workflow When a Dealer Signs Up")

add_h3("Automated steps (instant)", color=GOLD)
add_bullet("Dealer completes the multi-step application form on /dealers/apply", bold_prefix="1.")
add_bullet("Form validates required fields and pledge commitments before submit", bold_prefix="2.")
add_bullet("Server re-validates with zod, then emails AutoInfo4U via Resend", bold_prefix="3.")
add_bullet("Dealer sees a 'Thanks — we'll be in touch within 2 business days' screen", bold_prefix="4.")

add_h3("Manual steps (AutoInfo4U handles)", color=GOLD)
add_bullet("AutoInfo4U reviews the application in their email inbox", bold_prefix="5.")
add_bullet("Verifies state dealer license, BBB rating, online reviews", bold_prefix="6.")
add_bullet("Replies to the dealer with approval, request for more info, or polite rejection", bold_prefix="7.")
add_bullet("If approved, invoices the dealer outside the site (Stripe Invoicing, QuickBooks, etc.)", bold_prefix="8.")
add_bullet("Adds the approved dealer to the site's dealer data file and publishes (live in ~60 seconds)", bold_prefix="9.")
add_bullet("Confirms to the dealer their public listing URL", bold_prefix="10.")

add_h2("5. Phase 1 Boundaries (For Clarity)")

p = doc.add_paragraph()
r = p.add_run("Phase 1 includes the brand assets and the website only. The capabilities below are intentionally scoped into Phase 2 or Phase 3:")
r.font.size = Pt(10.5)
r.font.color.rgb = BLACK

excluded = [
    "Database for persistent storage of episodes, dealers, leads, applications",
    "Lead capture from Car Finder (storing shopper preferences and contact info)",
    "Email lead routing to matched dealers",
    "Post-engagement surveys (NPS, response time, quote accuracy)",
    "Stripe-based dealer payment collection",
    "Login / authentication for dealers or admins",
    "Admin panel for managing dealers and reviewing applications",
    "Dealer self-service dashboard",
    "Automated tier-demotion based on performance metrics",
    "Per-episode and per-dealer SEO pages",
    "Newsletter automation",
]

for item in excluded:
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.left_indent = Cm(0.6)
    r = p.add_run(item)
    r.font.size = Pt(10)
    r.font.color.rgb = GRAY

doc.add_paragraph()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = p.add_run("Quad 4 Consulting  ·  info@quad4consulting.com")
r.font.size = Pt(9)
r.font.color.rgb = GRAY
r.font.italic = True

out = "Phase1_Scope_AutoInfo4U.docx"
doc.save(out)
print("OK:", out)
