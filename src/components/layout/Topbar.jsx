import { Menu } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="border-b border-[#cdeee4] bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#cdeee4] bg-white text-[#114444] shadow-sm transition hover:bg-[#e8fff4] md:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <p className="text-sm text-slate-500">
              Multi-source job market analysis
            </p>
            <h2 className="text-lg font-bold text-slate-950">
              Technology demand dashboard
            </h2>
          </div>
        </div>

        <span className="w-fit rounded-full border border-[#cdeee4] bg-[#e8fff4] px-3 py-1 text-xs font-semibold text-[#114444]">
          Live analytics
        </span>
      </div>
    </header>
  );
}
