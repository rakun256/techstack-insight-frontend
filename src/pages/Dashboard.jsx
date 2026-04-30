import { useEffect, useMemo, useState } from "react";
import { getDashboardAnalytics } from "../api";
import BarChartCard from "../components/charts/BarChartCard";
import PieChartCard from "../components/charts/PieChartCard";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import {
  mapLocationTrends,
  mapRoleFamilyTrends,
  mapTopSkills,
  mapTrendingSkills,
  mapWorkModeTrends,
  takeTopNWithOther,
} from "../utils/chartMappers";

const DAY_FILTERS = [7, 30, 90];

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardAnalytics() {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboardAnalytics({
          days,
          topSkillsLimit: 10,
        });

        if (isMounted) {
          setAnalytics(response);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || "Dashboard analytics could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardAnalytics();

    return () => {
      isMounted = false;
    };
  }, [days]);

  const dashboardData = useMemo(() => {
    return {
      topSkills: mapTopSkills(analytics?.topSkills),
      locations: takeTopNWithOther(
        mapLocationTrends(analytics?.locationTrends),
        10
      ),
      roleFamilies: mapRoleFamilyTrends(analytics?.roleFamilyTrends),
      workModes: mapWorkModeTrends(analytics?.workModeTrends),
      trendingSkills: mapTrendingSkills(analytics?.trendingSkills).slice(0, 10),
    };
  }, [analytics]);

  if (loading) {
    return <LoadingState message="Loading dashboard analytics..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Analyze software job market trends from multiple sources.
          </p>
        </div>

        <div className="inline-flex w-fit rounded-2xl border border-[#cdeee4] bg-white p-1 shadow-sm">
          {DAY_FILTERS.map((option) => {
            const isActive = option === days;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setDays(option)}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[#114444] text-[#bbeedd] shadow-sm"
                    : "text-slate-600 hover:bg-[#e8fff4] hover:text-[#114444]",
                ].join(" ")}
              >
                {option} days
              </button>
            );
          })}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          label="Top Skills Count"
          value={dashboardData.topSkills.length}
          description="Unique skills in the top list"
        />
        <DashboardStatCard
          label="Locations Count"
          value={dashboardData.locations.length}
          description="Unique locations with job activity"
        />
        <DashboardStatCard
          label="Role Families Count"
          value={dashboardData.roleFamilies.length}
          description="Unique role families detected"
        />
        <DashboardStatCard
          label="Work Modes Count"
          value={dashboardData.workModes.length}
          description="Unique work modes represented"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard
          title="Most In-Demand Technologies"
          description="Most requested skills by job count."
          data={dashboardData.topSkills}
          barColor="#114444"
        />
        <BarChartCard
          title="Top Job Locations"
          description="Job distribution across locations."
          data={dashboardData.locations}
          barColor="#167070"
        />
        <BarChartCard
          title="Role Demand by Family"
          description={`Aggregated demand by role family over the last ${days} days.`}
          data={dashboardData.roleFamilies}
          barColor="#6b4bd8"
          layout="horizontal"
        />
        <PieChartCard
          title="Work Mode Distribution"
          description={`Aggregated demand by work mode over the last ${days} days.`}
          data={dashboardData.workModes}
        />
      </section>

      <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-950">
            Top Skills in Last {days} Days
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Aggregated skill demand over the selected period.
          </p>
        </div>

        {dashboardData.trendingSkills.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-[#cdeee4]">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-[#f1fff8]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">
                    Skill
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">
                    Job Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {dashboardData.trendingSkills.map((skill) => (
                  <tr key={skill.name}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {skill.name}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {skill.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No trending skill data is available for this period." />
        )}
      </section>
    </div>
  );
}
