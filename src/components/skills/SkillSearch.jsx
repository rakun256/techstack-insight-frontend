export default function SkillSearch({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">
          Search skills
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by skill name"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </label>
    </section>
  );
}
