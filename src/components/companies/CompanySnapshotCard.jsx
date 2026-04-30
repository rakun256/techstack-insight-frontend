import EmptyState from "../ui/EmptyState";
import {
  formatRoleLabel,
  formatWorkMode,
} from "../../utils/companyMappers";

function normalizeItems(items = [], nameKey, formatter) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      name: formatter ? formatter(item?.[nameKey]) : item?.[nameKey] || "Unknown",
      count: Number(item?.jobCount ?? 0),
    }))
    .sort((a, b) => b.count - a.count);
}

function CompactList({ title, items = [] }) {
  const maxCount = items.reduce((max, item) => Math.max(max, item.count), 0);

  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      {items.length > 0 ? (
        <div className="mt-3 space-y-3">
          {items.map((item) => {
            const width = maxCount > 0 ? `${(item.count / maxCount) * 100}%` : "0%";

            return (
              <div key={`${title}-${item.name}`}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-slate-700">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-sm text-slate-500">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-900" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-3">
          <EmptyState message="No data available." />
        </div>
      )}
    </div>
  );
}

export default function CompanySnapshotCard({ company }) {
  const topSkills = normalizeItems(company?.topSkills, "skillName");
  const roleDistribution = normalizeItems(
    company?.roleDistribution,
    "roleFamily",
    formatRoleLabel
  );
  const workModeDistribution = normalizeItems(
    company?.workModeDistribution,
    "workMode",
    formatWorkMode
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm text-slate-500">{company?.companyId}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">
          {company?.companyName || "Unknown company"}
        </h3>
      </div>

      <div className="space-y-6">
        <CompactList title="Top skills" items={topSkills} />
        <CompactList title="Role distribution" items={roleDistribution} />
        <CompactList title="Work mode distribution" items={workModeDistribution} />
      </div>
    </article>
  );
}
