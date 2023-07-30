// fade-in.js
$(document).ready(function() {
    // Wait for the page to load
    setTimeout(function() {
      // Fade in the centered-text div
      $('.centered-text').animate({ opacity: 1 }, 2000); // 1000ms = 1 second
      $('.content').animate({ opacity: 1 }, 2000); // 1000ms = 1 second
      $('.projects').animate({ opacity: 1 }, 2000); // 1000ms = 1 second
    }, 500); // 500ms = 0.5 seconds
  });
  