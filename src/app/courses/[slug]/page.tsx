import { notFound } from "next/navigation";
import Link from "next/link";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { courses, formatPrice, getCourseBySlug } from "@/lib/data";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/courses" className="text-sm text-muted hover:text-foreground">
        ← Back to Courses
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className={`inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br ${course.color} px-6 py-4`}>
            <span className="text-5xl">{course.icon}</span>
            <div>
              <span className="text-sm font-medium text-white/80">{course.category}</span>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">{course.title}</h1>
            </div>
          </div>

          <p className="mt-6 text-lg text-muted">{course.longDescription}</p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-muted">⏱ {course.duration}</span>
            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-muted">📊 {course.level}</span>
            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-muted">★ {course.rating} rating</span>
            <span className="rounded-lg bg-white/5 px-3 py-1.5 text-muted">👥 {course.students.toLocaleString()} students</span>
          </div>

          <h2 className="mt-10 text-xl font-semibold">What you&apos;ll learn</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {course.modules.map((module) => (
              <li key={module} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-0.5 text-accent">✓</span>
                {module}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card sticky top-24 rounded-2xl p-6">
            <p className="text-sm text-muted">Course Price</p>
            <p className="mt-1 text-3xl font-bold">{formatPrice(course.price)}</p>
            <p className="mt-1 text-xs text-muted">One-time payment • Lifetime access</p>

            <div className="mt-6 space-y-3 text-sm text-muted">
              <p className="flex items-center gap-2"><span className="text-accent">✓</span> Lifetime course access</p>
              <p className="flex items-center gap-2"><span className="text-accent">✓</span> Certificate of completion</p>
              <p className="flex items-center gap-2"><span className="text-accent">✓</span> Hands-on projects</p>
              <p className="flex items-center gap-2"><span className="text-accent">✓</span> Community support</p>
            </div>

            <div className="mt-6">
              <RazorpayCheckout
                amount={course.price}
                productName={course.title}
                productDescription={`Enrollment: ${course.title}`}
                buttonLabel={`Enroll for ${formatPrice(course.price)}`}
              />
            </div>

            <p className="mt-4 text-center text-xs text-muted">
              Secure payment via Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
