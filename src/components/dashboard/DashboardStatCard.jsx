export default function DashboardStatCard({ label, value, description }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#cdeee4]/70 bg-gradient-to-br from-white to-[#f1fff8] p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-4 h-1 w-12 rounded-full bg-[#bbeedd]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8fff4] text-sm font-bold text-[#114444]">
          TI
        </div>
      </div>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </article>
  );
}
