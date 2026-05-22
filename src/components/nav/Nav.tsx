import Link from 'next/link';

const links = [
  { href: '/podcast', label: 'Podcast' },
  { href: '/car-finder', label: 'Car Finder' },
  { href: '/dealers', label: 'Dealers' },
  { href: '/packages', label: 'Packages' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-[5%] py-4">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="headline text-2xl text-black">AutoInfo</span>
          <span className="headline text-2xl text-red">4U</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/80 transition-colors hover:text-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/car-finder" className="btn btn-primary text-xs">
          Start Car Finder
        </Link>
      </div>
    </header>
  );
}
