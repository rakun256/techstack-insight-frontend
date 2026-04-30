import DashboardStatCard from "../dashboard/DashboardStatCard";
import { getTopItem } from "../../utils/companyMappers";

export default function CompanySummaryCards({
  topSkills = [],
  roleDistribution = [],
  workModeDistribution = [],
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DashboardStatCard
        label="Top Skill"
        value={getTopItem(topSkills) || "None"}
        description="Most requested skill"
      />
      <DashboardStatCard
        label="Total Role Families"
        value={roleDistribution.length}
        description="Role categories with demand"
      />
      <DashboardStatCard
        label="Work Modes Count"
        value={workModeDistribution.length}
        description="Work modes represented"
      />
    </section>
  );
}
