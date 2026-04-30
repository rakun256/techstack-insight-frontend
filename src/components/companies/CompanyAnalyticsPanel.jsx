import BarChartCard from "../charts/BarChartCard";
import EmptyState from "../ui/EmptyState";
import LoadingState from "../ui/LoadingState";
import ErrorState from "../ui/ErrorState";
import CompanySummaryCards from "./CompanySummaryCards";

function WorkModeCards({ data = [] }) {
  if (data.length === 0) {
    return <EmptyState message="No work mode data is available for this company." />;
  }

  return (
    <section className="rounded-2xl border border-[#cdeee4]/70 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-950">
          Company Work Mode Distribution
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Job demand grouped by work mode.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-[#cdeee4] bg-[#f7fffb] p-4"
          >
            <p className="text-sm font-medium text-slate-600">{item.name}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {item.count}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CompanyAnalyticsPanel({
  selectedCompanyId,
  analytics,
  loading,
  error,
}) {
  if (!selectedCompanyId) {
    return (
      <EmptyState
        title="Select a company"
        message="Choose a company to view technology demand and role analytics."
      />
    );
  }

  if (loading) {
    return (
      <LoadingState
        compact
        variant="companies"
        title="Analyzing company demand patterns"
        message="Comparing skills, role families, and work mode signals for this company."
      />
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <CompanySummaryCards
        topSkills={analytics.topSkills}
        roleDistribution={analytics.roleDistribution}
        workModeDistribution={analytics.workModeDistribution}
      />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard
          title="Company Top Skills"
          description="Most requested technologies for this company."
          data={analytics.topSkills}
          barColor="#114444"
        />
        <BarChartCard
          title="Company Role Distribution"
          description="Demand grouped by role family."
          data={analytics.roleDistribution}
          barColor="#6b4bd8"
          layout="horizontal"
        />
      </section>

      <WorkModeCards data={analytics.workModeDistribution} />
    </div>
  );
}
