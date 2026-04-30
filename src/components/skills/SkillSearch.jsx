export default function SkillSearch({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">
          Search skills
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by skill name"
          className="w-full rounded-xl border border-[#cdeee4] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#114444] focus:ring-2 focus:ring-[#114444]/20"
        />
      </label>
    </section>
  );
}
