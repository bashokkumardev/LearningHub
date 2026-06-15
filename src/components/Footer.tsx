import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                LH
              </span>
              <span className="text-lg font-bold">Learning Hub</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted">
              Your one-stop platform for tech courses, professional resume services, and the latest job opportunities in IT.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link href="/courses" className="hover:text-foreground">All Courses</Link></li>
              <li><Link href="/resume-services" className="hover:text-foreground">Resume Services</Link></li>
              <li><Link href="/jobs" className="hover:text-foreground">Latest Jobs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>support@learninghub.com</li>
              <li>+91 98765 43210</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Learning Hub. All rights reserved.
          </p>
          <p className="text-xs text-muted">Payments secured by Razorpay</p>
        </div>
      </div>
    </footer>
  );
}
