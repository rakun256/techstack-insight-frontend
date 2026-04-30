import { NavLink } from "react-router-dom";
import { BarChart3, Briefcase, Building2, Code2, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/companies", label: "Companies", icon: Building2 },
];

function SidebarBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#114444] text-sm font-bold tracking-tight text-[#bbeedd] shadow-sm">
        TI
      </div>
      <div>
        <h1 className="text-lg font-bold text-slate-950">TechStack Insight</h1>
        <p className="mt-1 text-xs text-slate-500">Job market analytics</p>
      </div>
    </div>
  );
}

function SidebarNav({ onNavigate }) {
  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-[#114444] text-[#bbeedd] shadow-sm"
                  : "text-slate-600 hover:bg-[#e8fff4] hover:text-[#114444]",
              ].join(" ")
            }
          >
            <Icon size={18} />
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ isMobileOpen = false, onClose }) {
  return (
    <>
      <aside className="hidden w-64 border-r border-[#cdeee4] bg-white/95 p-4 md:block">
        <div className="mb-8">
          <SidebarBrand />
        </div>
        <SidebarNav />
      </aside>

      {isMobileOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40"
          />

          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[#cdeee4] bg-white p-4 shadow-xl">
            <div className="mb-8 flex items-start justify-between gap-3">
              <SidebarBrand />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#cdeee4] bg-white text-[#114444] transition hover:bg-[#e8fff4]"
              >
                <X size={20} />
              </button>
            </div>

            <SidebarNav onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
