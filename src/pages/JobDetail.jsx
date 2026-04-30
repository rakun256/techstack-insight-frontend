import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../api";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import {
  cleanDescriptionText,
  compactText,
  formatDate,
  formatRoleLabel,
  formatSourceLabel,
  getWorkModeLabel,
} from "../utils/formatters";

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

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJob() {
      try {
        setLoading(true);
        setError("");

        const response = await getJobById(id);

        if (isMounted) {
          setJob(response);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || "Job detail could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <LoadingState
        variant="detail"
        title="Opening the job intelligence card"
        message="Loading role metadata, source details, and the original posting description."
      />
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!job) {
    return (
      <EmptyState
        title="Job not found"
        message="The selected job could not be found."
      />
    );
  }

  const location = job.locationNormalized || job.location;
  const description = cleanDescriptionText(job.description);

  return (
    <div className="space-y-6">
      <Link
        to="/jobs"
        className="inline-flex text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        ← Back to Jobs
      </Link>

      <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              {compactText(job.title, "Untitled job")}
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600">
              {compactText(job.companyName, "Unknown company")}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {[compactText(location), compactText(job.country)]
                .filter((value) => value !== "Not specified")
                .join(" / ") || "Location not specified"}
            </p>
          </div>

          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636]"
            >
              Apply Now
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge tone="blue">{formatSourceLabel(job.source)}</Badge>
          <Badge tone="purple">{formatRoleLabel(job.roleFamily)}</Badge>
          <Badge tone="slate">{formatRoleLabel(job.roleSubfamily)}</Badge>
          <Badge tone={job.remote ? "green" : job.hybrid ? "amber" : "slate"}>
            {getWorkModeLabel(job)}
          </Badge>
          <Badge tone={job.softwareRelevant ? "green" : "slate"}>
            {job.softwareRelevant ? "Software relevant" : "Not verified"}
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <DetailItem label="Posted" value={formatDate(job.postedAt)} />
          <DetailItem label="Normalized title" value={compactText(job.normalizedTitle)} />
        </div>
      </section>

      <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-950">
            Source Metadata
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Technical identifiers from the original source integration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#cdeee4] bg-[#f7fffb] p-4">
            <DetailItem label="External ID" value={compactText(job.externalId)} />
          </div>
          <div className="rounded-xl border border-[#cdeee4] bg-[#f7fffb] p-4">
            <DetailItem label="Company ID" value={compactText(job.companyId)} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-950">
            Description
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Original job description from the source posting.
          </p>
        </div>

        {description ? (
          <div className="whitespace-pre-line text-sm leading-7 text-slate-700">
            {description}
          </div>
        ) : (
          <EmptyState message="No description is available for this job." />
        )}
      </section>
    </div>
  );
}
