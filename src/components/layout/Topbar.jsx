export default function Topbar() {
  return (
    <header className="border-b border-[#cdeee4] bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-500">Multi-source job market analysis</p>
        <h2 className="text-lg font-bold text-slate-950">
          Technology demand dashboard
        </h2>
      </div>
        <span className="w-fit rounded-full border border-[#cdeee4] bg-[#e8fff4] px-3 py-1 text-xs font-semibold text-[#114444]">
          Live analytics
        </span>
      </div>
    </header>
  );
}
