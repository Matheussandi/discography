export function formatDuration(value: string) {
    const [minutes, seconds] = value.split(":");
    const formattedMinutes = minutes.padStart(1, "0");
    const formattedSeconds = (seconds || "00").padEnd(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }