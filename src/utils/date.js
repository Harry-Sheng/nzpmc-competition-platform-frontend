// Helper function to convert UTC to local time
export const formatToNZTime = (utcDate) => {
  if (!utcDate) return "N/A"
  const options = {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return new Intl.DateTimeFormat("en-NZ", options).format(new Date(utcDate))
}
