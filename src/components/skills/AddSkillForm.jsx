export default function AddSkillForm({
  value,
  onChange,
  onSubmit,
  creating,
  error,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-950">
          Add Skill
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a canonical technology skill to the catalog.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Add a new skill, e.g. Spring Boot"
            className="min-w-0 flex-1 rounded-xl border border-[#cdeee4] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#114444] focus:ring-2 focus:ring-[#114444]/20"
          />
          <button
            type="submit"
            disabled={creating || !value.trim()}
            className="rounded-xl bg-[#114444] px-4 py-2 text-sm font-medium text-[#bbeedd] shadow-sm transition hover:bg-[#0d3636] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {creating ? "Adding..." : "Add Skill"}
          </button>
        </div>

        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
