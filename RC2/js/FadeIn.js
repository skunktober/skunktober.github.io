$(document).ready(function() {
    setTimeout(function() {
        var currentPage = window.location.pathname.split('/').pop();
        var targetDiv;
  
        if (currentPage === 'index.html') {
            targetDiv = '#content';
        } else if (currentPage === 'apps.html') {
            targetDiv = '#apps';
        } else if (currentPage === 'widgets.html') {
              targetDiv = '#widget-container';
        } else if (currentPage === 'settings.html') {
            targetDiv = '#settings';
        } else {
            targetDiv = '#content';
        }
  
        $(targetDiv).animate({ opacity: 1 }, 2000);
    }, 500); 
  });