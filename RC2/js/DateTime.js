// Function to get user's IP address using a public IP geolocation API
async function getIPAddress() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get IP address:', error);
    return null;
  }
}

// Function to get user's timezone based on their IP address using World Time API
async function getTimezoneFromIP(ipAddress) {
try {
  const response = await fetch(`https://worldtimeapi.org/api/ip/${ipAddress}.json`);
  const data = await response.json();
  return data; // Returning full data instead of data.data.timezone
} catch (error) {
  console.error('Failed to get timezone from IP:', error);
  return null; // Fallback to null value if there's an error
}
}

let unixtime = null; // Variable to store the user's unixtime

// Function to set the user's timezone when the page loads
async function setUserTimezone() {
const ipAddress = await getIPAddress();
if (ipAddress) {
  const data = await getTimezoneFromIP(ipAddress);
  if (data && data.unixtime) {
    unixtime = data.unixtime * 1000; // convert to milliseconds
  }
  // Call the updateDateTimeWithTimezone function to update the clock
  updateDateTimeWithTimezone();
}
}

// Function to update the clock with the user's timezone
function updateDateTimeWithTimezone() {
const dateElement = document.getElementById("dateDisplay");
const timeElement = document.getElementById("timeDisplay");
const timezoneElement = document.getElementById("timezoneDisplay");

const now = unixtime ? new Date(unixtime) : new Date();
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
  
dateElement.textContent = currentTime;
timeElement.textContent = localTime;
timezoneElement.textContent = unixtime ? `UTC${now.getTimezoneOffset() / -60}` : 'UTC';

if (unixtime) {
  // Increase unixtime by one second for every real-time second that passes
  unixtime += 1000;
}
}

// Call the setUserTimezone function when the page loads
document.addEventListener('DOMContentLoaded', setUserTimezone);

// Update the clock every second
setInterval(updateDateTimeWithTimezone, 1000);