let backgroundLink = ""; // Initialize the variable to store the background link

function updateBackground() {
  const backgroundLinkElement = document.getElementById("backgroundImageLink");

  // Check if the backgroundLinkElement exists
  if (!backgroundLinkElement) {
    return; // Exit the function if the element doesn't exist
  }
  
  const newBackgroundLink = backgroundLinkElement.value;

  // Update the background image source only if the user provided a valid URL
  if (isValidImageUrl(newBackgroundLink)) {
    backgroundLink = newBackgroundLink;
    document.body.style.backgroundImage = 'url(' + backgroundLink + ')';

    // Save the background link to localStorage
    localStorage.setItem("backgroundLink", backgroundLink);
  } else {
    // Display an error message or handle invalid URLs as needed
    alert("Invalid image URL. Please enter a valid link to an image.");
  }
}

// Function to check if a URL is a valid image URL (same as before)
function isValidImageUrl(url) {
   const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
   return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}


// Load the saved background link and set it if available
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("backgroundLink")) {
    backgroundLink = localStorage.getItem("backgroundLink");
  }

  if (backgroundLink) {
    document.body.style.backgroundImage = 'url(' + backgroundLink + ')';
    
    const backgroundLinkElement = document.getElementById("backgroundImageLink");
    if (backgroundLinkElement) {
      backgroundLinkElement.value = backgroundLink;
    }
  }
});