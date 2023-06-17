function addLeadingZeros(n: number) {
  return n.toString().padStart(2, '0');
}

export function formatDate(year: number, month: number, week: number) {
  return `${year}-${addLeadingZeros(month + 1)}-${addLeadingZeros(week)}`;
}

export function formatWeek(year: number, week: number) {
  return `${year}-${addLeadingZeros(week)}`;
}
