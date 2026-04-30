export default function Pagination({
  page,
  totalPages,
  totalElements,
  first,
  last,
  onPrevious,
  onNext,
}) {
  const currentPage = totalPages > 0 ? page + 1 : 0;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#cdeee4]/70 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-900">
          Page {currentPage} of {totalPages}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {totalElements} total jobs
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={first}
          className="rounded-xl border border-[#cdeee4] bg-white px-4 py-2 text-sm font-medium text-[#114444] transition hover:bg-[#e8fff4] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={last}
          className="rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
