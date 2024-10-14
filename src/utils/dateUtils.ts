export const formatDate = (backendDate: string): string => {
  // Parse the backend date string into a Date object
  const date = new Date(backendDate);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Extract and format the time in 12-hour format with AM/PM
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12-hour format
  };
  const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

  // Extract and format the day and date
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full day name (e.g., Wednesday)
    day: "2-digit", // Day of the month (e.g., 02)
    month: "2-digit", // Month (e.g., 10)
    year: "numeric", // Full year (e.g., 2024)
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
    date
  );

  return `${time}, ${formattedDate}`;
};
