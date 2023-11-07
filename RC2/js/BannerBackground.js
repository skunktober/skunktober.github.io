let bannerLink = "";

function updateBannerImage() {
  const bannerLinkElement = document.getElementById("bannerImage");

  if (!bannerLinkElement) { return; }
  
  const newBannerLink = bannerLinkElement.value;

  if (isValidImageUrl(newBannerLink)) {
    bannerLink = newBannerLink;
    document.getElementById("banner").style.backgroundImage = 'url(' + bannerLink + ')';
    localStorage.setItem("bannerLink", bannerLink);
  } else {
    alert("Invalid image URL. Please enter a valid link to an image.");
  }
}

function isValidImageUrl(url) {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".apng", ".webp"];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

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
