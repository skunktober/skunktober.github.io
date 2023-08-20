let profilePictureLink = ""; // Initialize the variable to store the profile picture link

function updateProfilePicture() {
  const profilePictureLinkElement = document.getElementById("profilePictureLink");
  
  // Check if the profilePictureLinkElement exists
  if (!profilePictureLinkElement) {
    return; // Exit the function if the element doesn't exist
  }

  const newProfilePictureLink = profilePictureLinkElement.value;

  // Update the image source only if the user provided a valid URL
  if (isValidImageUrl(newProfilePictureLink)) {
    profilePictureLink = newProfilePictureLink;
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.src = profilePictureLink;

    // Save the profile picture link to localStorage
    localStorage.setItem("profilePictureLink", profilePictureLink);
  } else {
    // Display an error message or handle invalid URLs as needed
    alert("Invalid image URL. Please enter a valid image link.");
  }
}

// Function to check if a URL is a valid image URL (same as before)
function isValidImageUrl(url) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

// Load the saved profile picture link and set it if available
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("profilePictureLink")) {
    profilePictureLink = localStorage.getItem("profilePictureLink");
  }

  if (profilePictureLink) {
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.src = profilePictureLink;
    
    const profilePictureLinkElement = document.getElementById("profilePictureLink");
    if (profilePictureLinkElement) {
      profilePictureLinkElement.value = profilePictureLink;
    }
  }
});
