const ROLE_FAMILIES = [
  "BACKEND",
  "FRONTEND",
  "FULLSTACK",
  "MOBILE",
  "DATA",
  "DEVOPS_PLATFORM",
  "SECURITY",
  "MACHINE_LEARNING",
  "SOFTWARE_ENGINEERING",
  "INFRASTRUCTURE",
];

const SOURCES = ["GREENHOUSE", "LEVER"];

function Field({ label, children }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#cdeee4] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#114444] focus:ring-2 focus:ring-[#114444]/20";

export default function JobFilters({
  filters,
  onChange,
  onApply,
  onClear,
  loading,
}) {
  function updateFilter(name, value) {
    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-950">Filters</h2>
        <p className="mt-1 text-sm text-slate-500">
          Narrow results by role, skill, source, country, and work mode.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Title">
          <input
            className={inputClass}
            value={filters.titleQuery}
            onChange={(event) => updateFilter("titleQuery", event.target.value)}
            placeholder="Backend Developer"
          />
        </Field>

        <Field label="Skill">
          <input
            className={inputClass}
            value={filters.skillName}
            onChange={(event) => updateFilter("skillName", event.target.value)}
            placeholder="Java"
          />
        </Field>

        <Field label="Role family">
          <select
            className={inputClass}
            value={filters.roleFamily}
            onChange={(event) => updateFilter("roleFamily", event.target.value)}
          >
            <option value="">All roles</option>
            {ROLE_FAMILIES.map((roleFamily) => (
              <option key={roleFamily} value={roleFamily}>
                {roleFamily}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Country">
          <input
            className={inputClass}
            value={filters.country}
            onChange={(event) => updateFilter("country", event.target.value)}
            placeholder="Turkey"
          />
        </Field>

        <Field label="Source">
          <select
            className={inputClass}
            value={filters.source}
            onChange={(event) => updateFilter("source", event.target.value)}
          >
            <option value="">All sources</option>
            {SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Remote">
          <select
            className={inputClass}
            value={filters.remote}
            onChange={(event) => updateFilter("remote", event.target.value)}
          >
            <option value="">Any</option>
            <option value="true">Remote only</option>
            <option value="false">Not remote</option>
          </select>
        </Field>

        <Field label="Hybrid">
          <select
            className={inputClass}
            value={filters.hybrid}
            onChange={(event) => updateFilter("hybrid", event.target.value)}
          >
            <option value="">Any</option>
            <option value="true">Hybrid only</option>
            <option value="false">Not hybrid</option>
          </select>
        </Field>

        <Field label="Posted from">
          <input
            className={inputClass}
            type="date"
            value={filters.postedAtFrom}
            onChange={(event) => updateFilter("postedAtFrom", event.target.value)}
          />
        </Field>

        <Field label="Posted to">
          <input
            className={inputClass}
            type="date"
            value={filters.postedAtTo}
            onChange={(event) => updateFilter("postedAtTo", event.target.value)}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClear}
          disabled={loading}
          className="rounded-xl border border-[#cdeee4] bg-white px-4 py-2 text-sm font-medium text-[#114444] transition hover:bg-[#e8fff4] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Clear Filters
        </button>
        <button
          type="button"
          onClick={onApply}
          disabled={loading}
          className="rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Apply Filters
        </button>
      </div>
    </section>
  );
}
