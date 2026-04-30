export default function DashboardStatCard({ label, value, description }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </article>
  );
}
