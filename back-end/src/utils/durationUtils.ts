export function formatDuration(date: Date): string {
  console.log(date.getTime());
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function parseDuration(durationStr: string): Date {
  const [hours, minutes, seconds] = durationStr.split(":").map(Number);
  const date = new Date(0);
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(seconds);
  return date;
}
