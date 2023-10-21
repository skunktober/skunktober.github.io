// Check if the site is being run under "file://" protocol
if (window.location.protocol === "file:") {
    // Unload all scripts except for the current script
    const currentScript = document.currentScript;
    const scripts = document.querySelectorAll("script:not([src*='" + currentScript.src + "'])");
    scripts.forEach((script) => script.remove());
  
    // Unload all elements from the body
    document.body.innerHTML = "";
  
    // Load a blank grey screen
    const blankScreen = document.createElement("div");
    blankScreen.style.marginTop = "275px";
    blankScreen.style.backgroundColor = "#232323";
    blankScreen.style.width = "100vw";
    blankScreen.style.height = "100vh";
    blankScreen.style.overflow = "hidden"; // Disable scrolling
    blankScreen.style.position = "fixed"; // Fix the element position
    blankScreen.style.top = "0"; // Position it at the top
    blankScreen.style.left = "0"; // Position it at the left
    blankScreen.style.paddingRight = "17px"; // Account for scrollbar width
  
    // Add the small version of the logo
    const logoImg = document.createElement("img");
    logoImg.src = "../RC2/images/RC2.png"; // Adjust the path based on your directory structure
    logoImg.alt = "RC2 Logo";
    logoImg.style.display = "block";
    logoImg.style.margin = "0 auto";
    logoImg.style.paddingTop = "50px";
    logoImg.style.maxWidth = "75px"; // Adjust the size as needed
    blankScreen.appendChild(logoImg);
  
    // Add the header text
    const headerText = document.createElement("h1");
    headerText.textContent = "You can't run RC2 locally.";
    headerText.style.color = "#fff";
    headerText.style.fontFamily = "Inter, sans-serif";
    headerText.style.fontSize = "36px";
    headerText.style.textAlign = "center";
    blankScreen.appendChild(headerText);
  
    // Add the first explanation text
    const explanationText1 = document.createElement("p");
    explanationText1.textContent =
      "RC2's functions and elements are not compatible with local versions.";
    explanationText1.style.color = "#fff";
    explanationText1.style.fontFamily = "Inter, sans-serif";
    explanationText1.style.fontSize = "18px";
    explanationText1.style.textAlign = "center";
    blankScreen.appendChild(explanationText1);
  
    // Add the second explanation text
    const explanationText2 = document.createElement("p");
    explanationText2.textContent =
      "Please consider running RC2 through a local server, or using the official version ";
    explanationText2.style.color = "#fff";
    explanationText2.style.fontFamily = "Inter, sans-serif";
    explanationText2.style.fontSize = "18px";
    explanationText2.style.textAlign = "center";
    blankScreen.appendChild(explanationText2);
  
    // Add the link to the live version
    const liveVersionLink = document.createElement("a");
    liveVersionLink.textContent = "here.";
    liveVersionLink.href = "https://plecak.lol/RC2/index.html";
    liveVersionLink.style.color = "#fff";
    liveVersionLink.style.textDecoration = "underline";
    explanationText2.appendChild(liveVersionLink);

    // Add the second explanation text
    const explanationText3 = document.createElement("p");
    explanationText3.textContent =
      "If you think you're incorrectly seeing this message, please create an issue report ";
    explanationText3.style.color = "#fff";
    explanationText3.style.fontFamily = "Inter, sans-serif";
    explanationText3.style.fontSize = "18px";
    explanationText3.style.textAlign = "center";
    blankScreen.appendChild(explanationText3);

    // Add the link to the live version
    const liveVersionLink2 = document.createElement("a");
    liveVersionLink2.textContent = "here.";
    liveVersionLink2.href = "https://github.com/plecakserce/RC2/issues/new";
    liveVersionLink2.style.color = "#fff";
    liveVersionLink2.style.textDecoration = "underline";
    explanationText3.appendChild(liveVersionLink2);
  
    // Set the background image to none to ensure it's not visible
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#232323";
  
    document.body.appendChild(blankScreen);
  }
  