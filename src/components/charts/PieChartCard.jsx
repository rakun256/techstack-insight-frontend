import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import EmptyState from "../ui/EmptyState";

const DEFAULT_COLORS = ["#114444", "#5dd39e", "#bbeedd", "#167070", "#8b5cf6"];

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  return (
    <div className="rounded-xl border border-[#cdeee4] bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-slate-950">{item?.fullName || item?.name}</p>
      <p className="mt-1 text-slate-500">Job count: {item?.count}</p>
    </div>
  );
}

export default function PieChartCard({
  title,
  description,
  data = [],
  colors = DEFAULT_COLORS,
}) {
  const hasData = Array.isArray(data) && data.length > 0;
  const total = hasData
    ? data.reduce((sum, item) => sum + Number(item?.count ?? 0), 0)
    : 0;

  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {hasData ? (
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px] md:items-center">
          <div className="relative h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="86%"
                  paddingAngle={2}
                  stroke="#ffffff"
                  strokeWidth={2}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-950">
                {total}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Jobs
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="truncate text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>
                <span className="shrink-0 text-sm text-slate-500">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState message="No work mode data is available for this period." />
      )}
    </section>
  );
}
