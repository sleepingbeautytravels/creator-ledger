import { getCurrentMonthValue, getMonthRange, getTodayValue } from "@/lib/utils";

function toDateValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function getDateShortcuts() {
  const today = new Date();
  const currentMonth = getMonthRange(getCurrentMonthValue());
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonth = getMonthRange(
    `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`
  );
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  return [
    {
      label: "This month",
      slug: "this-month",
      from: currentMonth.start,
      to: currentMonth.end
    },
    {
      label: "Last month",
      slug: "last-month",
      from: lastMonth.start,
      to: lastMonth.end
    },
    {
      label: "Last 3 months",
      slug: "last-3-months",
      from: toDateValue(threeMonthsAgo),
      to: getTodayValue()
    },
    {
      label: "Year to date",
      slug: "year-to-date",
      from: toDateValue(yearStart),
      to: getTodayValue()
    },
    {
      label: "All time",
      slug: "all-time",
      from: "1900-01-01",
      to: getTodayValue()
    }
  ];
}
