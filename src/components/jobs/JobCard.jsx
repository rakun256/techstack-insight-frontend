import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import {
  compactText,
  formatDate,
  formatRoleLabel,
  formatSourceLabel,
  getWorkModeLabel,
} from "../../utils/formatters";

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function JobCard({ job }) {
  const location = job.locationNormalized || job.location;
  const detailsPath = `/jobs/${job.id}`;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <Link to={detailsPath} className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-900 transition hover:text-slate-700">
            {compactText(job.title, "Untitled job")}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {compactText(job.companyName, "Unknown company")}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {[compactText(location), compactText(job.country)]
              .filter((value) => value !== "Not specified")
              .join(", ") || "Location not specified"}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Badge tone="blue">{formatSourceLabel(job.source)}</Badge>
          <Badge tone="purple">{formatRoleLabel(job.roleFamily)}</Badge>
          <Badge tone={job.remote ? "green" : job.hybrid ? "amber" : "slate"}>
            {getWorkModeLabel(job)}
          </Badge>
          <Badge tone={job.softwareRelevant ? "green" : "slate"}>
            {job.softwareRelevant ? "Software relevant" : "Not verified"}
          </Badge>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-slate-500">
          <p>
            <span className="font-medium text-slate-700">Subfamily:</span>{" "}
            {formatRoleLabel(job.roleSubfamily)}
          </p>
          <p>
            <span className="font-medium text-slate-700">Posted:</span>{" "}
            {formatDate(job.postedAt)}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            to={detailsPath}
            className="rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            View Details
          </Link>
          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Apply
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
