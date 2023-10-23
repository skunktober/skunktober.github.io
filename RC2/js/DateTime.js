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

async function getTimezoneFromIP(ipAddress) {
try {
  const response = await fetch(`https://worldtimeapi.org/api/ip/${ipAddress}.json`);
  const data = await response.json();
  return data; 
} catch (error) {
  console.error('Failed to get timezone from IP:', error);
  return null; 
}
}

let unixtime = null; 


async function setUserTimezone() {
const ipAddress = await getIPAddress();
if (ipAddress) {
  const data = await getTimezoneFromIP(ipAddress);
  if (data && data.unixtime) {
    unixtime = data.unixtime * 1000; 
  }
  updateDateTimeWithTimezone();
}
}

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
  unixtime += 1000;
}
}

document.addEventListener('DOMContentLoaded', setUserTimezone);

setInterval(updateDateTimeWithTimezone, 1000);