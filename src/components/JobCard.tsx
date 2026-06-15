import type { Job } from "@/lib/types";
import { formatDate } from "@/lib/data";

interface JobCardProps {
  job: Job;
}

const typeColors: Record<Job["type"], string> = {
  "Full-time": "bg-green-500/20 text-green-400",
  "Part-time": "bg-yellow-500/20 text-yellow-400",
  Contract: "bg-orange-500/20 text-orange-400",
  Remote: "bg-cyan-500/20 text-cyan-400",
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="glass-card rounded-2xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[job.type]}`}>
              {job.type}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-accent">{job.company}</p>
          <p className="mt-1 text-sm text-muted">{job.location}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-lg font-bold text-foreground">{job.salary}</p>
          <p className="text-xs text-muted">{job.experience} exp.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-muted"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-card-border pt-4">
        <span className="text-xs text-muted">Posted {formatDate(job.postedAt)}</span>
        <a
          href={job.applyUrl}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Apply Now
        </a>
      </div>
    </article>
  );
}
