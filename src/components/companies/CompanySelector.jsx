export default function CompanySelector({
  label = "Select company",
  value,
  companies = [],
  onChange,
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#cdeee4] bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#114444] focus:ring-2 focus:ring-[#114444]/20"
      >
        <option value="">Choose a company</option>
        {companies.map((company) => (
          <option key={company.companyId} value={company.companyId}>
            {company.companyName}
          </option>
        ))}
      </select>
    </label>
  );
}
