import { NavLink } from "react-router-dom";
import { BarChart3, Briefcase, Building2, Code2 } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: BarChart3 },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/skills", label: "Skills", icon: Code2 },
  { to: "/companies", label: "Companies", icon: Building2 },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-900">TechStack Insight</h1>
        <p className="mt-1 text-xs text-slate-500">
          Job market analytics
        </p>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}