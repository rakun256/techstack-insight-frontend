import { Link } from "react-router-dom";
import EmptyState from "../ui/EmptyState";
import { compactText, formatDateTime } from "../../utils/formatters";

export default function SkillTable({ skills = [] }) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return (
      <EmptyState
        title="No skills found"
        message="Try a different search term or add a new skill."
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-base font-semibold text-slate-900">
          Skill Catalog
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Canonical technology skills extracted from job postings.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-slate-600">
                Skill name
              </th>
              <th className="px-5 py-3 text-left font-semibold text-slate-600">
                Created at
              </th>
              <th className="px-5 py-3 text-left font-semibold text-slate-600">
                Updated at
              </th>
              <th className="px-5 py-3 text-right font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {compactText(skill.name, "Unnamed skill")}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {formatDateTime(skill.createdAt)}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {formatDateTime(skill.updatedAt)}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/jobs?skillName=${encodeURIComponent(skill.name)}`}
                    className="inline-flex rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    View Jobs
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
