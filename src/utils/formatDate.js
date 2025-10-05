export default function formatLocalDate(dateInput, monthFormat = "2-digit", locale = "pt-BR") {
  if (!dateInput) return "";

  let d;

  if (dateInput instanceof Date) d = dateInput;

  else if (typeof dateInput === "string") {

    if (dateInput.includes("T")) {
      d = new Date(dateInput);
    } else if (dateInput.includes("-")) {

      const [year, month, day] = dateInput.split("-").map(Number);
      d = new Date(year, month - 1, day);
    } else {
      d = new Date(dateInput);
    }
  } else {
    d = new Date(dateInput);
  }

  if (isNaN(d.getTime())) return String(dateInput);

  const datePart = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: monthFormat,
    year: "numeric",
  }).format(d);


  const hours = d.getHours();
  const minutes = d.getMinutes();
  if (hours || minutes) {
    const timePart = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(d);
    return `${datePart} ${timePart}`;
  }

  return datePart;
}
