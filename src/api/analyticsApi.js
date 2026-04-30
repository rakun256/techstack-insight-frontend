import apiClient, { cleanParams } from "./apiClient";

export async function getTopSkills(limit = 10) {
  const params = cleanParams({ limit });

  return apiClient.get("/api/analytics/top-skills", { params });
}

export async function getTrendingSkills(days = 30) {
  const params = cleanParams({ days });

  return apiClient.get("/api/analytics/trending-skills", { params });
}

export async function getRoleSkillDistribution() {
  return apiClient.get("/api/analytics/role-skill-distribution");
}

export async function getRoleFamilyTrends(days = 30) {
  const params = cleanParams({ days });

  return apiClient.get("/api/analytics/role-family-trends", { params });
}

export async function getLocationTrends() {
  return apiClient.get("/api/analytics/location-trends");
}

export async function getWorkModeTrends(days = 30) {
  const params = cleanParams({ days });

  return apiClient.get("/api/analytics/work-mode-trends", { params });
}

export async function getCountrySkillTrends(country, days = 30) {
  if (!country) {
    throw new Error("Country is required");
  }

  const params = cleanParams({
    country,
    days,
  });

  return apiClient.get("/api/analytics/country-skill-trends", { params });
}

export async function getCompanyTopSkills(companyId, limit = 10) {
  if (!companyId) {
    throw new Error("Company id is required");
  }

  const params = cleanParams({
    companyId,
    limit,
  });

  return apiClient.get("/api/analytics/company-top-skills", { params });
}

export async function getCompanyRoleDistribution(companyId) {
  if (!companyId) {
    throw new Error("Company id is required");
  }

  const params = cleanParams({ companyId });

  return apiClient.get("/api/analytics/company-role-distribution", { params });
}

export async function getCompanyWorkModeDistribution(companyId) {
  if (!companyId) {
    throw new Error("Company id is required");
  }

  const params = cleanParams({ companyId });

  return apiClient.get("/api/analytics/company-work-mode-distribution", {
    params,
  });
}

export async function compareCompanies(companyA, companyB) {
  if (!companyA || !companyB) {
    throw new Error("Both companyA and companyB are required");
  }

  const params = cleanParams({
    companyA,
    companyB,
  });

  return apiClient.get("/api/analytics/compare-companies", { params });
}

export async function getDashboardAnalytics(options = {}) {
  const days = options.days ?? 30;
  const topSkillsLimit = options.topSkillsLimit ?? 10;

  const [
    topSkills,
    trendingSkills,
    roleSkillDistribution,
    roleFamilyTrends,
    locationTrends,
    workModeTrends,
  ] = await Promise.all([
    getTopSkills(topSkillsLimit),
    getTrendingSkills(days),
    getRoleSkillDistribution(),
    getRoleFamilyTrends(days),
    getLocationTrends(),
    getWorkModeTrends(days),
  ]);

  return {
    topSkills,
    trendingSkills,
    roleSkillDistribution,
    roleFamilyTrends,
    locationTrends,
    workModeTrends,
  };
}