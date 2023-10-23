if (window.location.protocol === "file:") {
  const currentScript = document.currentScript;
  const scripts = document.querySelectorAll("script:not([src*='" + currentScript.src + "'])");
  scripts.forEach((script) => script.remove());

  document.body.innerHTML = "";

  const blankScreen = document.createElement("div");
  blankScreen.style.marginTop = "275px";
  blankScreen.style.backgroundColor = "#232323";
  blankScreen.style.width = "100vw";
  blankScreen.style.height = "100vh";
  blankScreen.style.overflow = "hidden";
  blankScreen.style.position = "fixed";
  blankScreen.style.top = "0";
  blankScreen.style.left = "0";
  blankScreen.style.paddingRight = "17px";

  const logoImg = document.createElement("img");
  logoImg.src = "../RC2/images/RC2.png";
  logoImg.alt = "RC2 Logo";
  logoImg.style.display = "block";
  logoImg.style.margin = "0 auto";
  logoImg.style.paddingTop = "50px";
  logoImg.style.maxWidth = "75px";
  blankScreen.appendChild(logoImg);

  const headerText = document.createElement("h1");
  headerText.textContent = "You can't run RC2 locally.";
  headerText.style.color = "#fff";
  headerText.style.fontFamily = "Inter, sans-serif";
  headerText.style.fontSize = "36px";
  headerText.style.textAlign = "center";
  blankScreen.appendChild(headerText);

  const explanationText1 = document.createElement("p");
  explanationText1.textContent =
    "RC2's functions and elements are not compatible with local versions.";
  explanationText1.style.color = "#fff";
  explanationText1.style.fontFamily = "Inter, sans-serif";
  explanationText1.style.fontSize = "18px";
  explanationText1.style.textAlign = "center";
  blankScreen.appendChild(explanationText1);

  const explanationText2 = document.createElement("p");
  explanationText2.textContent =
    "Please consider running RC2 through a local server, or using the official version ";
  explanationText2.style.color = "#fff";
  explanationText2.style.fontFamily = "Inter, sans-serif";
  explanationText2.style.fontSize = "18px";
  explanationText2.style.textAlign = "center";
  blankScreen.appendChild(explanationText2);

  const liveVersionLink = document.createElement("a");
  liveVersionLink.textContent = "here.";
  liveVersionLink.href = "https://plecak.lol/RC2/index.html";
  liveVersionLink.style.color = "#fff";
  liveVersionLink.style.textDecoration = "underline";
  explanationText2.appendChild(liveVersionLink);

  const explanationText3 = document.createElement("p");
  explanationText3.textContent =
    "If you think you're incorrectly seeing this message, please create an issue report ";
  explanationText3.style.color = "#fff";
  explanationText3.style.fontFamily = "Inter, sans-serif";
  explanationText3.style.fontSize = "18px";
  explanationText3.style.textAlign = "center";
  blankScreen.appendChild(explanationText3);

  const liveVersionLink2 = document.createElement("a");
  liveVersionLink2.textContent = "here.";
  liveVersionLink2.href = "https://github.com/plecakserce/RC2/issues/new";
  liveVersionLink2.style.color = "#fff";
  liveVersionLink2.style.textDecoration = "underline";
  explanationText3.appendChild(liveVersionLink2);

  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "#232323";

  document.body.appendChild(blankScreen);
}
