export function compactText(value, fallback = "Not specified") {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return String(value);
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
