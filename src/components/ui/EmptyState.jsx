export default function EmptyState({
  title = "No data available",
  message = "There is not enough data to show this section yet.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cdeee4] bg-[#f7fffb] p-6 text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
    </div>
  );
}
