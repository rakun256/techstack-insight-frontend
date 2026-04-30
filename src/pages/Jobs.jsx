import { useEffect, useMemo, useState } from "react";
import { getJobs } from "../api";
import JobFilters from "../components/jobs/JobFilters";
import JobList from "../components/jobs/JobList";
import Pagination from "../components/jobs/Pagination";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  titleQuery: "",
  skillName: "",
  roleFamily: "",
  country: "",
  source: "",
  remote: "",
  hybrid: "",
  postedAtFrom: "",
  postedAtTo: "",
};

function normalizeFilters(filters) {
  return Object.fromEntries(
    Object.entries(filters).map(([key, value]) => {
      if (value === "true") {
        return [key, true];
      }

      if (value === "false") {
        return [key, false];
      }

      return [key, value?.trim?.() ?? value];
    })
  );
}

export default function Jobs() {
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(0);
  const [jobsPage, setJobsPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requestFilters = useMemo(() => {
    return {
      ...normalizeFilters(appliedFilters),
      page,
      size: PAGE_SIZE,
    };
  }, [appliedFilters, page]);

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await getJobs(requestFilters);

        if (isMounted) {
          setJobsPage(response);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || "Jobs could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [requestFilters]);

  function handleApplyFilters() {
    setAppliedFilters(draftFilters);
    setPage(0);
  }

  function handleClearFilters() {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(0);
  }

  const jobs = jobsPage?.content || [];
  const totalPages = jobsPage?.totalPages || 0;
  const totalElements = jobsPage?.totalElements || 0;
  const first = jobsPage?.first ?? page === 0;
  const last = jobsPage?.last ?? totalPages <= 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Jobs
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Explore normalized software job postings and filter by role, skill,
          source, country, and work mode.
        </p>
      </div>

      <JobFilters
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        loading={loading}
      />

      {error ? (
        <ErrorState message={error} />
      ) : (
        <>
          {loading ? (
            <LoadingState message="Loading jobs..." />
          ) : (
            <JobList jobs={jobs} />
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            first={first || loading}
            last={last || loading}
            onPrevious={() => setPage((currentPage) => Math.max(currentPage - 1, 0))}
            onNext={() =>
              setPage((currentPage) =>
                totalPages > 0
                  ? Math.min(currentPage + 1, totalPages - 1)
                  : currentPage
              )
            }
          />
        </>
      )}
    </div>
  );
}
