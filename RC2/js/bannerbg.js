let bannerLink = ""; // Initialize the variable to store the banner link

// function to update banner
function updateBannerImage() {
  const bannerLinkElement = document.getElementById("bannerImage");

  if (!bannerLinkElement) { return; } // Exit if the element doesn't exist
  
  const newBannerLink = bannerLinkElement.value;

  if (isValidImageUrl(newBannerLink)) {
    bannerLink = newBannerLink;
    document.getElementById("banner").style.backgroundImage = 'url(' + bannerLink + ')';
    localStorage.setItem("bannerLink", bannerLink);
  } else {
    alert("Invalid image URL. Please enter a valid link to an image.");
  }
}

// Function to check if a URL is a valid image
function isValidImageUrl(url) {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

// Load the saved banner link and set it if available
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("bannerLink")) {
      bannerLink = localStorage.getItem("bannerLink");
    }

    if (bannerLink) {
      document.getElementById("banner").style.backgroundImage = 'url(' + bannerLink + ')';
      const bannerLinkElement = document.getElementById("bannerImage");
      
      if (bannerLinkElement) {
        bannerLinkElement.value = bannerLink;
      }
    }
});