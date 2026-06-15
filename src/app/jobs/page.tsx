"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";
import { jobs } from "@/lib/data";

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Remote"] as const;

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === "All" || job.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">Latest Jobs</h1>
        <p className="mt-3 text-lg text-muted">
          Curated IT job openings from top companies. Updated daily.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, company, or skill..."
          className="flex-1 rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
        />
        <div className="flex flex-wrap gap-2">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                typeFilter === type
                  ? "bg-primary text-white"
                  : "border border-card-border text-muted hover:bg-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing {filtered.length} of {jobs.length} jobs
      </p>

      <div className="mt-6 grid gap-6">
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-muted">No jobs match your search.</p>
          <button
            onClick={() => { setSearch(""); setTypeFilter("All"); }}
            className="mt-4 text-sm font-medium text-primary hover:text-accent"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
