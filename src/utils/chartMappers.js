export function aggregateByKey(items, key, valueKey = "jobCount") {
  if (!Array.isArray(items)) {
    return [];
  }

  const totals = items.reduce((acc, item) => {
    const name = item?.[key];

    if (!name) {
      return acc;
    }

    const count = Number(item?.[valueKey] ?? 0);
    acc[name] = (acc[name] || 0) + count;

    return acc;
  }, {});

  return Object.entries(totals)
    .map(([name, count]) => ({ name, fullName: name, count }))
    .sort((a, b) => b.count - a.count);
}

export function truncateLabel(value, maxLength = 18) {
  const label = String(value ?? "");

  if (label.length <= maxLength) {
    return label;
  }

  return `${label.slice(0, Math.max(maxLength - 3, 0))}...`;
}

export function aggregateByName(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  const totals = data.reduce((acc, item) => {
    const name = item?.name;

    if (!name) {
      return acc;
    }

    const count = Number(item?.count ?? 0);

    if (!acc[name]) {
      acc[name] = {
        name,
        fullName: item?.fullName || name,
        count: 0,
      };
    }

    acc[name].count += count;

    return acc;
  }, {});

  return Object.values(totals).sort((a, b) => b.count - a.count);
}

export function takeTopNWithOther(data, n) {
  const sortedData = aggregateByName(data);

  if (!Number.isInteger(n) || n <= 0 || sortedData.length <= n) {
    return sortedData;
  }

  const topItems = sortedData.slice(0, n);
  const otherCount = sortedData
    .slice(n)
    .reduce((total, item) => total + Number(item?.count ?? 0), 0);

  if (otherCount <= 0) {
    return topItems;
  }

  return [...topItems, { name: "Other", fullName: "Other", count: otherCount }];
}

export function formatWorkMode(value) {
  const workModes = {
    ONSITE_OR_UNSPECIFIED: "Onsite / Unspecified",
    REMOTE: "Remote",
    HYBRID: "Hybrid",
  };

  return workModes[value] || value || "Unknown";
}

export function mapTopSkills(items) {
  return aggregateByKey(items, "skillName");
}

export function mapLocationTrends(items) {
  return aggregateByKey(items, "location");
}

export function mapRoleFamilyTrends(items) {
  return aggregateByKey(items, "roleFamily");
}

export function mapWorkModeTrends(items) {
  return aggregateByKey(items, "workMode").map((item) => {
    const name = formatWorkMode(item.name);

    return {
      ...item,
      name,
      fullName: name,
    };
  });
}

export function mapTrendingSkills(items) {
  return aggregateByKey(items, "skillName");
}
