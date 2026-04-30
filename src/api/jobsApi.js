import api from "./apiClient";

export const getJobs = (params) =>
  api.get("/api/jobs", { params });

export const getJobById = (id) =>
  api.get(`/api/jobs/${id}`);