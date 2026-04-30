import EmptyState from "../ui/EmptyState";

export default function TopSkillsPanel({ skills = [] }) {
  const maxCount = skills.reduce((max, skill) => {
    return Math.max(max, Number(skill?.jobCount ?? 0));
  }, 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-900">
          Most Requested Skills
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Top skills by current job demand.
        </p>
      </div>

      {skills.length > 0 ? (
        <div className="space-y-4">
          {skills.map((skill) => {
            const count = Number(skill.jobCount ?? 0);
            const width = maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%";

            return (
              <div key={skill.skillName}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium text-slate-800">
                    {skill.skillName}
                  </span>
                  <span className="shrink-0 text-sm text-slate-500">
                    {count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState message="No top skill data is available yet." />
      )}
    </section>
  );
}
