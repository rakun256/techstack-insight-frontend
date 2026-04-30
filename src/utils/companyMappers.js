function titleCase(value) {
  return String(value || "Unknown")
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const WORK_MODES = ["REMOTE", "HYBRID", "ONSITE_OR_UNSPECIFIED"];

export function extractCompaniesFromJobs(jobs) {
  if (!Array.isArray(jobs)) {
    return [];
  }

  const companies = jobs.reduce((acc, job) => {
    if (!job?.companyId) {
      return acc;
    }

    if (!acc[job.companyId]) {
      acc[job.companyId] = {
        companyId: job.companyId,
        companyName: job.companyName || "Unknown company",
      };
    }

    return acc;
  }, {});

  return Object.values(companies).sort((a, b) => {
    return a.companyName.localeCompare(b.companyName);
  });
}

export function formatCompanyId(value) {
  if (!value) {
    return "No ID";
  }

  const id = String(value);

  if (id.length <= 12) {
    return id;
  }

  return `${id.slice(0, 8)}...${id.slice(-4)}`;
}

export function formatWorkMode(value) {
  const labels = {
    ONSITE_OR_UNSPECIFIED: "Onsite / Unspecified",
    REMOTE: "Remote",
    HYBRID: "Hybrid",
  };

  return labels[value] || titleCase(value);
}

export function formatRoleLabel(value) {
  const labels = {
    BACKEND: "Backend",
    FRONTEND: "Frontend",
    FULLSTACK: "Fullstack",
    MACHINE_LEARNING: "Machine Learning",
    SOFTWARE_ENGINEERING: "Software Engineering",
    DEVOPS_PLATFORM: "DevOps Platform",
  };

  return labels[value] || titleCase(value);
}

export function mapCompanyTopSkills(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => ({
      name: item.skillName || "Unknown",
      fullName: item.skillName || "Unknown",
      count: Number(item.jobCount ?? 0),
    }))
    .sort((a, b) => b.count - a.count);
}

export function mapCompanyRoleDistribution(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      const name = formatRoleLabel(item.roleFamily);

      return {
        name,
        fullName: name,
        count: Number(item.jobCount ?? 0),
      };
    })
    .sort((a, b) => b.count - a.count);
}

export function mapCompanyWorkModeDistribution(data) {
  const countsByMode = Array.isArray(data)
    ? data.reduce((acc, item) => {
        const key = item?.workMode || "ONSITE_OR_UNSPECIFIED";
        acc[key] = (acc[key] || 0) + Number(item?.jobCount ?? 0);
        return acc;
      }, {})
    : {};

  return WORK_MODES.map((workMode) => {
    const name = formatWorkMode(workMode);

    return {
      name,
      fullName: name,
      count: countsByMode[workMode] || 0,
    };
  });
}

export function getTopItem(data, nameKey = "name", countKey = "count") {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return [...data].sort((a, b) => {
    return Number(b?.[countKey] ?? 0) - Number(a?.[countKey] ?? 0);
  })[0]?.[nameKey];
}
