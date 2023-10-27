let backgroundLink = "";

function updateBackground() {
  const backgroundLinkElement = document.getElementById("backgroundImageLink");

  if (!backgroundLinkElement) {
    return;
  }

  const newBackgroundLink = backgroundLinkElement.value;

  if (isValidImageUrl(newBackgroundLink)) {
    backgroundLink = newBackgroundLink;
    document.body.style.backgroundImage = 'url(' + backgroundLink + ')';

    localStorage.setItem("backgroundLink", backgroundLink);
  } else {
    alert("Invalid image URL. Please enter a valid link to an image.");
  }
}

function isValidImageUrl(url) {
   const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
   return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

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
