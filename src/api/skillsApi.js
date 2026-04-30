import apiClient from "./apiClient";

export async function getSkills() {
  return apiClient.get("/api/skills");
}

export async function getSkillById(id) {
  if (!id) {
    throw new Error("Skill id is required");
  }

  return apiClient.get(`/api/skills/${id}`);
}

export async function createSkill(skill) {
  if (!skill) {
    throw new Error("Skill is required");
  }

  const payload =
    typeof skill === "string"
      ? { name: skill.trim() }
      : { name: skill.name?.trim() };

  if (!payload.name) {
    throw new Error("Skill name is required");
  }

  return apiClient.post("/api/skills", payload);
}