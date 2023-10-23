let profilePictureLink = "";

function updateProfilePicture() {
  const profilePictureLinkElement = document.getElementById("profilePictureLink");

  if (!profilePictureLinkElement) {
    return;
  }

  const newProfilePictureLink = profilePictureLinkElement.value;

  if (isValidImageUrl(newProfilePictureLink)) {
    profilePictureLink = newProfilePictureLink;
    const profilePicture = document.getElementById("profilePicture");
    profilePicture.src = profilePictureLink;

    localStorage.setItem("profilePictureLink", profilePictureLink);
  } else {
    alert("Invalid image URL. Please enter a valid image link.");
  }
}

function isValidImageUrl(url) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

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
