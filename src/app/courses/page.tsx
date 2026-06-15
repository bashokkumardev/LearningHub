"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">All Courses</h1>
        <p className="mt-3 text-lg text-muted">
          Master in-demand technologies with hands-on projects and lifetime access.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "border border-card-border text-muted hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted">No courses found in this category.</p>
      )}
    </div>
  );
}
