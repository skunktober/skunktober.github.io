document.addEventListener("DOMContentLoaded", function () {
    updateAllTitleBars();
});

function updateTitleBarColor() {
    const inputID = 'titleBarColor';
    let color = document.getElementById(inputID).value;
    
    // Format color to always start with #
    color = color.startsWith('#') ? color : '#' + color;

    // Validate color and update all title bars if valid
    if (color.length === 7 && /^[#][0-9A-Fa-f]{6}$/.test(color)) {
        const titleBars = document.getElementsByClassName('title-bar');

        for (let titleBar of titleBars) {
            titleBar.style.backgroundColor = color;
        }

        localStorage.setItem('titleBarColor', color);
    } else {
        alert("Invalid hex color");
    }
}

function updateAllTitleBars() {
    const savedColor = localStorage.getItem('titleBarColor');
    if(savedColor) {
        const titleBars = document.getElementsByClassName('title-bar');

        for (let titleBar of titleBars) {
            titleBar.style.backgroundColor = savedColor;
        }
    }
}