import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "../ui/EmptyState";
import { truncateLabel } from "../../utils/chartMappers";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;
  const labelText = item?.fullName || label;
  const count = payload[0]?.value;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-slate-900">{labelText}</p>
      <p className="mt-1 text-slate-500">Job count: {count}</p>
    </div>
  );
}

export default function BarChartCard({
  title,
  description,
  data = [],
  barColor = "#0f172a",
  layout = "vertical",
}) {
  const hasData = Array.isArray(data) && data.length > 0;
  const isHorizontal = layout === "horizontal";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      {hasData ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isHorizontal ? "vertical" : "horizontal"}
              margin={
                isHorizontal
                  ? { top: 8, right: 16, left: 40, bottom: 8 }
                  : { top: 8, right: 8, left: -16, bottom: 8 }
              }
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={isHorizontal}
                stroke="#e2e8f0"
              />

              {isHorizontal ? (
                <>
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => truncateLabel(value, 18)}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="count" fill={barColor} radius={[0, 8, 8, 0]} />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => truncateLabel(value, 14)}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="count" fill={barColor} radius={[8, 8, 0, 0]} />
                </>
              )}

              <Tooltip cursor={{ fill: "#f8fafc" }} content={<ChartTooltip />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState message="No chart data is available for this period." />
      )}
    </section>
  );
}
