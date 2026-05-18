import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-black text-cream">
      <div className="mx-auto max-w-7xl px-[5%] py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="headline text-2xl">Info For You</span>
              <span className="serif text-lg text-gold">Auto</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              Independent car-buying podcast and shopper tools. Built for buyers, not dealerships.
            </p>
          </div>

          <div>
            <h4 className="headline text-sm tracking-widest text-gold">Show</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/podcast" className="hover:text-red">Episodes</Link></li>
              <li><Link href="/podcast" className="hover:text-red">Guests</Link></li>
              <li><Link href="/podcast" className="hover:text-red">Subscribe</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="headline text-sm tracking-widest text-gold">Shoppers</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/car-finder" className="hover:text-red">Car Finder</Link></li>
              <li><Link href="/dealers" className="hover:text-red">Certified Dealers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="headline text-sm tracking-widest text-gold">Dealers & Sponsors</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/packages" className="hover:text-red">Packages</Link></li>
              <li><Link href="/packages" className="hover:text-red">Sponsorship</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Info For You Auto. All rights reserved.</p>
          <p className="serif italic">Editorial decisions are independent of sponsor and dealer relationships.</p>
        </div>
      </div>
    </footer>
  );
}
