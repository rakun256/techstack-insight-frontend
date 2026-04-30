export function compactText(value, fallback = "Not specified") {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return String(value);
}

export function cleanDescriptionText(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function formatDate(date) {
  if (!date) {
    return "Not specified";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

export function formatRoleLabel(value) {
  return compactText(value)
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatSourceLabel(value) {
  return compactText(value).toLowerCase().replace(/\b\w/g, (char) => {
    return char.toUpperCase();
  });
}

export function getWorkModeLabel(job = {}) {
  if (job.remote) {
    return "Remote";
  }

  if (job.hybrid) {
    return "Hybrid";
  }

  return "Onsite / Unspecified";
}
