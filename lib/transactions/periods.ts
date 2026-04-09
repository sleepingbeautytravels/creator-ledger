export function getPreviousPeriodRange(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const durationDays = Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1;
  const previousEnd = new Date(startDate);
  previousEnd.setDate(previousEnd.getDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - durationDays + 1);

  return {
    start: previousStart.toISOString().slice(0, 10),
    end: previousEnd.toISOString().slice(0, 10)
  };
}

export function formatRangeHeading(start: string, end: string, range?: string) {
  if (range === "year-to-date") {
    return "Year to date";
  }

  if (range === "all-time") {
    return "All time";
  }

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth && startDate.getDate() === 1) {
    return new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric" }).format(startDate);
  }

  const startLabel = new Intl.DateTimeFormat("en-AU", { month: "short" }).format(startDate);
  const endLabel = new Intl.DateTimeFormat("en-AU", { month: "short", year: "numeric" }).format(endDate);

  return `${startLabel}-${endLabel}`;
}
