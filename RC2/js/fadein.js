// fade-in.js
$(document).ready(function() {
    // Wait for the page to load
    setTimeout(function() {
        var currentPage = window.location.pathname.split('/').pop(); // Get the current page file name
        var targetDiv;
  
        // Check the current page and set the target div accordingly
        if (currentPage === 'index.html') {
            targetDiv = '#content';
        } else if (currentPage === 'apps.html') {
            targetDiv = '#apps';
        } else if (currentPage === 'widgets.html') {
              targetDiv = '#widgets';
        } else if (currentPage === 'settings.html') {
            targetDiv = '#settings';
        } else {
            // if no html link, target the content div
            targetDiv = '#content';
        }
  
        // Fade in the target div
        $(targetDiv).animate({ opacity: 1 }, 2000); // 1000ms = 1 second
    }, 500); // 500ms = 0.5 seconds
  });