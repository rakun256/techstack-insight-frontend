import EmptyState from "../ui/EmptyState";
import JobCard from "./JobCard";

export default function JobList({ jobs = [] }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        message="Try changing the filters or clearing them to see more results."
      />
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
