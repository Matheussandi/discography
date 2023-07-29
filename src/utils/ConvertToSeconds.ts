export function convertToSeconds(durationFormatted: string): number {
  const [minutes, seconds] = durationFormatted.split(":").map(Number);

  return minutes * 60 + seconds;
}