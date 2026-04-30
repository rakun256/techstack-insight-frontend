import apiClient, { cleanParams } from "./apiClient";

export async function getJobs(filters = {}) {
  const params = cleanParams({
    roleFamily: filters.roleFamily,
    country: filters.country,
    remote: filters.remote,
    hybrid: filters.hybrid,
    companyId: filters.companyId,
    skillId: filters.skillId,
    skillName: filters.skillName,
    source: filters.source,
    postedAtFrom: filters.postedAtFrom,
    postedAtTo: filters.postedAtTo,
    titleQuery: filters.titleQuery,
    page: filters.page ?? 0,
    size: filters.size ?? 20,
  });

  return apiClient.get("/api/jobs", { params });
}

export async function getJobById(id) {
  if (!id) {
    throw new Error("Job id is required");
  }

  return apiClient.get(`/api/jobs/${id}`);
}

export async function createJob(jobData) {
  if (!jobData) {
    throw new Error("Job data is required");
  }

  return apiClient.post("/api/jobs", jobData);
}