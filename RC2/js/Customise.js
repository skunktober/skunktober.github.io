document.addEventListener("DOMContentLoaded", function () {
    const bannerColor = localStorage.getItem('banner');
 
    if(bannerColor) {
        document.getElementById('banner').style.backgroundColor = bannerColor;
    }

});

function updateColor(inputID, elementID) {
    let color = document.getElementById(inputID).value;
    color = color.startsWith('#') ? color : '#' + color;

    if (color.length === 7) {
        document.getElementById(elementID).style.backgroundColor = color;
        localStorage.setItem(elementID, color);
    } else {
        alert("Invalid hex color");
    }
}
  
function updateBannerColor() {
    updateColor('bannerColor', 'banner');
}
