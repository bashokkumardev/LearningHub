import Link from "next/link";
import type { Course } from "@/lib/types";
import { formatPrice } from "@/lib/data";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group glass-card flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className={`bg-gradient-to-br ${course.color} p-6`}>
        <span className="text-4xl">{course.icon}</span>
        <span className="mt-3 inline-block rounded-full bg-black/20 px-3 py-1 text-xs font-medium text-white">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {course.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted line-clamp-2">{course.description}</p>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <span>{course.duration}</span>
          <span>•</span>
          <span>{course.level}</span>
          <span>•</span>
          <span>★ {course.rating}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4">
          <span className="text-xl font-bold text-foreground">{formatPrice(course.price)}</span>
          <span className="text-sm font-medium text-primary group-hover:text-accent">View Course →</span>
        </div>
      </div>
    </Link>
  );
}
