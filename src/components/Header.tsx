import Link from "next/link";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/resume-services", label: "Resume Services" },
  { href: "/jobs", label: "Latest Jobs" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-lg font-bold text-white">
            LH
          </span>
          <span className="text-xl font-bold tracking-tight">
            Learning <span className="gradient-text">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:inline-block"
          >
            Browse Courses
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-card-border text-muted [&::-webkit-details-marker]:hidden">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 w-48 rounded-xl border border-card-border bg-card p-2 shadow-xl">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
