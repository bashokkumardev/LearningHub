import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import JobCard from "@/components/JobCard";
import { courses, jobs } from "@/lib/data";

export default function HomePage() {
  const featuredCourses = courses.slice(0, 4);
  const latestJobs = jobs.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-accent">
              🎓 Learn • Build • Get Hired
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Master Tech Skills with{" "}
              <span className="gradient-text">Learning Hub</span>
            </h1>
            <p className="mt-6 text-lg text-muted sm:text-xl">
              Premium courses in Java, SQL, MongoDB, Spring, Microservices & AWS.
              Professional resume services and curated job listings — all in one place.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="w-full rounded-xl bg-primary px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover sm:w-auto"
              >
                Explore Courses
              </Link>
              <Link
                href="/resume-services"
                className="w-full rounded-xl border border-card-border px-8 py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-white/5 sm:w-auto"
              >
                Resume Services
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "8+", label: "Courses" },
              { value: "12K+", label: "Students" },
              { value: "500+", label: "Resumes Built" },
              { value: "200+", label: "Job Listings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="border-t border-card-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Popular Courses</h2>
              <p className="mt-2 text-muted">Industry-relevant programs taught by experts</p>
            </div>
            <Link href="/courses" className="hidden text-sm font-medium text-primary hover:text-accent sm:block">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Resume Services CTA */}
      <section className="border-t border-card-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <h2 className="text-3xl font-bold">Professional Resume Services</h2>
                <p className="mt-4 text-muted">
                  Get ATS-optimized resumes delivered in PDF and Word formats.
                  Stand out to recruiters with professionally crafted documents.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> PDF & Word format delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> ATS keyword optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent">✓</span> Packages from ₹69
                  </li>
                </ul>
                <Link
                  href="/resume-services"
                  className="mt-8 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  View Resume Packages
                </Link>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="text-center">
                  <span className="text-7xl">📄</span>
                  <p className="mt-4 text-lg font-semibold">PDF & Word Delivery</p>
                  <p className="text-sm text-muted">Starting at ₹69</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="border-t border-card-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Latest Jobs</h2>
              <p className="mt-2 text-muted">Fresh opportunities from top IT companies</p>
            </div>
            <Link href="/jobs" className="hidden text-sm font-medium text-primary hover:text-accent sm:block">
              View all jobs →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {latestJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
