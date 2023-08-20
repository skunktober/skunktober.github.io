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
  
  // Function to get user's timezone based on their IP address using a public IP geolocation API
  async function getTimezoneFromIP(ipAddress) {
    try {
      const response = await fetch(`https://timezoneapi.io/api/ip/${ipAddress}`);
      const data = await response.json();
      return data.data.timezone;
    } catch (error) {
      console.error('Failed to get timezone from IP:', error);
      return 'UTC'; // Fallback to UTC timezone if there's an error
    }
  }
  
  let userTimezone = null; // Variable to store the user's timezone
  
  // Function to set the user's timezone when the page loads
  async function setUserTimezone() {
    const ipAddress = await getIPAddress();
    if (ipAddress) {
      userTimezone = await getTimezoneFromIP(ipAddress);
      // Call the updateDateTimeWithTimezone function to update the clock
      updateDateTimeWithTimezone();
    }
  }
  
  // Function to update the clock with the user's timezone
  function updateDateTimeWithTimezone() {
    const dateElement = document.getElementById("dateDisplay");
    const timeElement = document.getElementById("timeDisplay");
    const timezoneElement = document.getElementById("timezoneDisplay");
  
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const dayNumber = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const currentTime = `${day}, ${dayNumber} ${month} ${year}`;
  
    if (userTimezone) {
      timezoneElement.textContent = userTimezone;
      const offset = (userTimezone === 'UTC' ? 0 : parseInt(userTimezone));
      now.setHours(now.getHours() + offset); // Adjust hours for timezone
    }
  
    const localHours = String(now.getHours()).padStart(2, "0");
    const localMinutes = String(now.getMinutes()).padStart(2, "0");
    const localSeconds = String(now.getSeconds()).padStart(2, "0");
    const localTime = `${localHours}:${localMinutes}:${localSeconds}`;
    
    dateElement.textContent = currentTime;
    timeElement.textContent = localTime;
  }
  
  // Call the setUserTimezone function when the page loads
  document.addEventListener('DOMContentLoaded', setUserTimezone);
  
  // Update the clock every second
  setInterval(updateDateTimeWithTimezone, 1000);
  