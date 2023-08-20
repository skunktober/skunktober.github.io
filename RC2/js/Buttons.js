// JS file: Buttons.js

// Function to handle the button click event and redirect to the specified link after a delay
function redirectToLink(link) {
  setTimeout(function() {
    window.location.href = link;
  }, 300); // 500 milliseconds = 0.5 seconds delay
}

// Function to handle the launch button click event and redirect to the specified link after a delay
function handleLaunchButtonClick(link) {
  redirectToLink(link);
}

// Function to attach click event listeners to the buttons
function attachButtonListeners() {
  document.getElementById("indexBtn").addEventListener("click", function() {
    redirectToLink("index.html");
  });

  document.getElementById("appsBtn").addEventListener("click", function() {
    redirectToLink("apps.html");
  });

  document.getElementById("widgetsBtn").addEventListener("click", function() {
    redirectToLink("widgets.html");
  });

  document.getElementById("settingsBtn").addEventListener("click", function() {
    redirectToLink("settings.html");
  });

  // Attach click event listener to the launch buttons with different links
  const launchButtons = document.getElementsByClassName("rounded-button");
  const launchButtonLinks = [
    "https://login.microsoftonline.com/login.srf",
    "https://chat.openai.com",
    "https://as86-appstore85.c2kschools.net/AppStore",
    "https://myfiles.c2kschools.net/HTCOMNET/default.aspx?Mobile=standard",
    "https://calendar.google.com/calendar/u/0/r?pli=1",
    "https://drive.google.com",
    "https://bard.google.com",
    "https://lx.c2kschools.net/",
    // Add more links for other buttons as needed
  ];

  for (let i = 0; i < launchButtons.length; i++) {
    launchButtons[i].addEventListener("click", function() {
      handleLaunchButtonClick(launchButtonLinks[i]);
    });
  }
}

// Call the function to attach click event listeners to the buttons when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  attachButtonListeners();
});
