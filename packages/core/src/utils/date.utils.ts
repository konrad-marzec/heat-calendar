function addLeadingZeros(n: number) {
  return n.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}-${addLeadingZeros(date.getMonth() + 1)}-${addLeadingZeros(date.getDate())}`;
}
