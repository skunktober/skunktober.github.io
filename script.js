function showContent(contentId) {
  var contents = document.getElementsByClassName("content");
  var fadeOutCount = 0;
  for (var i = 0; i < contents.length; i++) {
    if (contents[i].id !== contentId) {
      fadeOutCount++;
      fadeOut(contents[i], function() {
        fadeOutCount--;
        if (fadeOutCount === 0) {
          fadeIn(document.getElementById(contentId));
        }
      });
    }
  }
}

function fadeIn(element) {
  var op = 0;  // initial opacity
  element.style.display = "block";
  element.style.opacity = op;
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    } else {
      op += 0.1;
      element.style.opacity = op;
    }
  }, 50);
}

function fadeOut(element, callback) {
  var op = 1;  // initial opacity
  element.style.opacity = op;
  var timer = setInterval(function () {
    if (op <= 0) {
      clearInterval(timer);
      element.style.display = "none";
      if (typeof callback === "function") {
        callback();
      }
    } else {
      op -= 0.1;
      element.style.opacity = op;
    }
  }, 50);
}
