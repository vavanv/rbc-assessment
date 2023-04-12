export function isValid24HourFormat(time: string): boolean {
  time = time.trim();
  var regex = /^(0?[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
  return regex.test(time);
}

export function isValid12HourFormat(time: string): boolean {
  time = time.trim();
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
  return regex.test(time);
}

export function convertTo24HourFormat(time12Hour: string): string {
  const match = time12Hour.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (match === null) {
    throw new Error(`Invalid time format`);
  }
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  // Adjusting hours for 12:00 PM and 12:00 AM
  if (hours === 12) {
    hours = period === "PM" ? 12 : 0;
  } else {
    hours += period === "PM" ? 12 : 0;
  }

  // Converting hours and minutes to string in 24-hour format
  const hours24Hour = hours.toString().padStart(2, "0");
  const minutes24Hour = minutes.toString().padStart(2, "0");

  return `${hours24Hour}${minutes24Hour}`;
}
