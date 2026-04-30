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
    blue: "border-[#cdeee4] bg-[#e8fff4] text-[#114444]",
    green: "border-[#cdeee4] bg-[#e8fff4] text-[#114444]",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    purple: "border-[#cdeee4] bg-white text-[#114444]",
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
    <article className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm transition hover:border-[#114444]/30 hover:shadow-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <Link to={detailsPath} className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-950 transition hover:text-[#114444]">
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
            className="rounded-xl border border-[#cdeee4] px-4 py-2 text-center text-sm font-medium text-[#114444] transition hover:bg-[#e8fff4]"
          >
            View Details
          </Link>
          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636]"
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
