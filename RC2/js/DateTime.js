function updateDateTimeWithTimezone() {
  const now = new Date();
  const dateElement = document.getElementById("dateDisplay");
  const timeElement = document.getElementById("timeDisplay");
  const timezoneElement = document.getElementById("timezoneDisplay");

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[now.getDay()];
  const dayNumber = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const currentTime = `${day}, ${dayNumber} ${month} ${year}`;
  const localTime = `${hours}:${minutes}:${seconds}`;

  // Calculate the timezone offset
  const offset = -now.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
  const timezone = `UTC${offset >= 0 ? '+' : '-'}${offsetHours}:${offsetMinutes}`;

  dateElement.textContent = currentTime;
  timeElement.textContent = localTime;
  timezoneElement.textContent = timezone;
}

document.addEventListener('DOMContentLoaded', updateDateTimeWithTimezone);

setInterval(updateDateTimeWithTimezone, 1000);