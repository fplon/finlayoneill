export function formatDateRange(startDate: string, endDate?: string): string {
  const start = startDate;
  const end = endDate ? endDate : "Present";
  return `${start} to ${end}`;
}
