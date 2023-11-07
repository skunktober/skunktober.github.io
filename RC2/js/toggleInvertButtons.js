document.addEventListener("DOMContentLoaded", function() {
    let invertColorCheckbox = document.getElementById("invertColorCheckbox");
    if(invertColorCheckbox){
        invertColorCheckbox.addEventListener("change", function(e){
            let buttons = document.querySelectorAll(".sidebar-btn, .save-button");
            let textInputs = document.querySelectorAll('input[type="text"]');
            buttons.forEach(function(btn){
                if(e.target.checked) {
                    btn.classList.add("sidebar-btn-inverted");
                    if(btn.classList.contains("save-button")) {
                       btn.style.backgroundColor = '#000000';
                       btn.style.color = '#f3fffa';
                    }
                    localStorage.setItem("invertColor", "true");
                } else {
                    btn.classList.remove("sidebar-btn-inverted");
                    if(btn.classList.contains("save-button")) {
                       btn.style.backgroundColor = '';
                       btn.style.color = '';
                    }
                    localStorage.setItem("invertColor", "false");
                }
            });

            textInputs.forEach(function(input){
                if(e.target.checked) {
                    input.style.borderColor = '#000000';
                } else {
                    input.style.borderColor = '';
                }
            });
        });
    };
  });
  
window.onload = function() {
    let buttons = document.querySelectorAll(".sidebar-btn, .save-button");
    let textInputs = document.querySelectorAll('input[type="text"]');
    let checkboxState = localStorage.getItem("invertColor");

    if(checkboxState === "true") {
        buttons.forEach(btn => {
           btn.classList.add("sidebar-btn-inverted");
           if(btn.classList.contains("save-button")) {
              btn.style.backgroundColor = '#000000';
              btn.style.color = '#f3fffa';
           }
        });
        
        textInputs.forEach(input => {
           input.style.borderColor = '#000000';
        });
    } else {
        buttons.forEach(btn => {
           btn.classList.remove("sidebar-btn-inverted");
           if(btn.classList.contains("save-button")) {
              btn.style.backgroundColor = '';
              btn.style.color = '';
           }
        });
        
        textInputs.forEach(input => {
           input.style.borderColor = '';
        });
    }

    let checkbox = document.getElementById("invertColorCheckbox");
    if(checkbox){
        checkbox.checked = (checkboxState === "true");
    }
}