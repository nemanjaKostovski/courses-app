export default function formatCreationDate() {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const year = currentDate.getFullYear();

  // Add leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Concatenate the formatted date
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}
