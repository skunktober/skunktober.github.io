// Adjusted Saving to localStorage
document.addEventListener("DOMContentLoaded", function() {
  let invertColorCheckbox = document.getElementById("invertColorCheckbox");
  if(invertColorCheckbox){
      invertColorCheckbox.addEventListener("change", function(e){
          let buttons = document.querySelectorAll(".sidebar-btn"); 
          buttons.forEach(function(btn){
              if(e.target.checked) {
                  btn.classList.add("sidebar-btn-inverted");
                  localStorage.setItem("invertColor", "true");
              } else {
                  btn.classList.remove("sidebar-btn-inverted");
                  localStorage.setItem("invertColor", "false");
              }
          });
      });
  };
});

//Adjusted Retrieving from localStorage
window.onload = function() {
  let buttons = document.querySelectorAll(".sidebar-btn");
  let checkboxState = localStorage.getItem("invertColor");
  
  if(checkboxState === "true") {
      buttons.forEach(btn => btn.classList.add("sidebar-btn-inverted"));
  } else {
      buttons.forEach(btn => btn.classList.remove("sidebar-btn-inverted"));
  }

  let checkbox = document.getElementById("invertColorCheckbox");
  if(checkbox){
      checkbox.checked = (checkboxState === "true");
  }
}