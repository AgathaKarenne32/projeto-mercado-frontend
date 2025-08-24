export default function formatLocalDate(date, locale = "pt-BR") {
  if (!date) return "";

  const [year, month, day] = date.split("-").map(Number);

  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(localDate);
}
