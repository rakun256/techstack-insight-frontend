import { useEffect, useMemo, useState } from "react";
import { createSkill, getSkills, getTopSkills } from "../api";
import AddSkillForm from "../components/skills/AddSkillForm";
import SkillSearch from "../components/skills/SkillSearch";
import SkillTable from "../components/skills/SkillTable";
import TopSkillsPanel from "../components/skills/TopSkillsPanel";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import { normalizeSearchText } from "../utils/formatters";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  async function fetchSkillsData() {
    const [skillsResponse, topSkillsResponse] = await Promise.all([
      getSkills(),
      getTopSkills(10),
    ]);

    setSkills(Array.isArray(skillsResponse) ? skillsResponse : []);
    setTopSkills(Array.isArray(topSkillsResponse) ? topSkillsResponse : []);
  }

  useEffect(() => {
    let isMounted = true;

    async function loadSkills() {
      try {
        setLoading(true);
        setError("");

        const [skillsResponse, topSkillsResponse] = await Promise.all([
          getSkills(),
          getTopSkills(10),
        ]);

        if (isMounted) {
          setSkills(Array.isArray(skillsResponse) ? skillsResponse : []);
          setTopSkills(Array.isArray(topSkillsResponse) ? topSkillsResponse : []);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || "Skills could not be loaded.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSkills = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);

    if (!normalizedQuery) {
      return skills;
    }

    return skills.filter((skill) => {
      return normalizeSearchText(skill.name).includes(normalizedQuery);
    });
  }, [searchQuery, skills]);

  const topSkill = topSkills[0];

  async function handleCreateSkill() {
    const skillName = newSkillName.trim();

    if (!skillName) {
      return;
    }

    try {
      setCreating(true);
      setCreateError("");

      await createSkill(skillName);
      setNewSkillName("");
      await fetchSkillsData();
    } catch (apiError) {
      setCreateError(apiError?.message || "Skill could not be created.");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading skills..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Skills
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse canonical technology skills extracted from normalized job
          postings.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardStatCard
          label="Total Skills"
          value={skills.length}
          description="Canonical skills in the catalog"
        />
        <DashboardStatCard
          label="Top Skill"
          value={topSkill?.skillName || "None"}
          description="Most requested technology"
        />
        <DashboardStatCard
          label="Most Requested Count"
          value={topSkill?.jobCount || 0}
          description="Jobs mentioning the top skill"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <SkillSearch value={searchQuery} onChange={setSearchQuery} />
          <AddSkillForm
            value={newSkillName}
            onChange={setNewSkillName}
            onSubmit={handleCreateSkill}
            creating={creating}
            error={createError}
          />
          <SkillTable skills={filteredSkills} />
        </div>

        <TopSkillsPanel skills={topSkills} />
      </div>
    </div>
  );
}
