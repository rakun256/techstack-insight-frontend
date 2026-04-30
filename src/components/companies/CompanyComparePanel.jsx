import CompanySelector from "./CompanySelector";
import CompanySnapshotCard from "./CompanySnapshotCard";
import ErrorState from "../ui/ErrorState";

export default function CompanyComparePanel({
  companies,
  companyA,
  companyB,
  onCompanyAChange,
  onCompanyBChange,
  onCompare,
  loading,
  error,
  validation,
  result,
}) {
  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-950">
          Compare Companies
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Compare two companies by skills, role demand, and work mode patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
        <CompanySelector
          label="Company A"
          value={companyA}
          companies={companies}
          onChange={onCompanyAChange}
        />
        <CompanySelector
          label="Company B"
          value={companyB}
          companies={companies}
          onChange={onCompanyBChange}
        />
        <button
          type="button"
          onClick={onCompare}
          disabled={loading || !companyA || !companyB}
          className="rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {validation && (
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
          {validation}
        </p>
      )}

      {error && (
        <div className="mt-4">
          <ErrorState message={error} />
        </div>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CompanySnapshotCard company={result.companyA} />
          <CompanySnapshotCard company={result.companyB} />
        </div>
      )}
    </section>
  );
}
