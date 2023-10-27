function redirectToLink(link, newTab = true) {
  setTimeout(function() {
    if(newTab) {
      window.open(link);
    } else {
      window.location.href = link;
    }
  }, 300);
}

function handleLaunchButtonClick(link) {
  redirectToLink(link, true);
}

function attachButtonListeners() {
  document.getElementById("indexBtn").addEventListener("click", function() {
    redirectToLink("index.html", false);
  });

  document.getElementById("appsBtn").addEventListener("click", function() {
    redirectToLink("apps.html", false);
  });

  document.getElementById("widgetsBtn").addEventListener("click", function() {
    redirectToLink("widgets.html", false);
  });

  document.getElementById("settingsBtn").addEventListener("click", function() {
    redirectToLink("settings.html", false);
  });

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
    "https://www.c2kschools.net/standard/SSO.aspx?provider=0&cat=&title=Creative Cloud Express&wid=13321&target=https%3a%2f%2fims-na1.adobelogin.com%2fims%2fauthorize%2fv1%3fresponse_type%3dtoken%26scope%3dopenid%26locale%3den_US%26client_id%3dMarvelWeb3%26redirect_uri%3dhttps%253A%252F%252Fexpress.adobe.com%252Fsp%26puser%3d%40c2ken.net",
    "https://github.com",
    "https://gitlab.com",
    "https://attaxia.github.io/MSOutlookit/",
    "https://cobalt.tools",
    "https://noclip.website",
    "https/wikipedia.org",
    "https://wikivoyage.org",
    "https://sites.google.com",
    "https://tgcofficial.github.io",
    "https://plecak.lol/RC2/apps.html",
    "https://plecak.lol/RC2/apps.html",
    "https://plecak.lol/RC2/apps.html",
    "https://plecak.lol/RC2/apps.html",
    "https://plecak.lol/RC2/apps.html",
    "https://plecak.lol/RC2/apps.html"
  ];

  for (let i = 0; i < launchButtons.length; i++) {
    launchButtons[i].addEventListener("click", function() {
      handleLaunchButtonClick(launchButtonLinks[i]);
    });
    // add title attribute for tooltip
    launchButtons[i].setAttribute("title", launchButtonLinks[i]);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  attachButtonListeners();
});
