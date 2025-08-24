export default function formatLocalDate(date, monthFormat = "2-digit", locale = "pt-BR") {
  if (!date) return "";

  const [year, month, day] = date.split("-").map(Number);

  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: monthFormat,
    year: "numeric",
  }).format(localDate);
}
