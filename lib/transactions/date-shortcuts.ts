import { getCurrentMonthValue, getMonthRange, getTodayValue } from "@/lib/utils";

function toDateValue(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function getDateShortcuts() {
  const today = new Date();
  const currentMonth = getMonthRange(getCurrentMonthValue());
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  return [
    {
      label: "This month",
      from: currentMonth.start,
      to: currentMonth.end
    },
    {
      label: "Last 3 months",
      from: toDateValue(threeMonthsAgo),
      to: getTodayValue()
    },
    {
      label: "Year to date",
      from: toDateValue(yearStart),
      to: getTodayValue()
    },
    {
      label: "All time",
      from: "1900-01-01",
      to: getTodayValue()
    }
  ];
}
