import api from "./apiClient";

export const getTopSkills = (limit = 10) =>
  api.get("/api/analytics/top-skills", { params: { limit } });

export const getTrendingSkills = (days = 30) =>
  api.get("/api/analytics/trending-skills", { params: { days } });

export const getLocationTrends = () =>
  api.get("/api/analytics/location-trends");

export const getRoleFamilyTrends = (days = 30) =>
  api.get("/api/analytics/role-family-trends", { params: { days } });

export const getWorkModeTrends = (days = 30) =>
  api.get("/api/analytics/work-mode-trends", { params: { days } });