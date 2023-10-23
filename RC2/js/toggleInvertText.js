var divIds = ["content", "apps", "settings", "widgets"];

document.addEventListener('DOMContentLoaded', function(event) {
    var isChecked = localStorage.getItem('invertTextCheckbox') === "true";
    invertText(isChecked);
    
    var checkbox = document.getElementById('invertTextCheckbox');
    if (checkbox) {
        if (isChecked) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', function() {
            localStorage.setItem('invertTextCheckbox', this.checked);
            invertText(this.checked);
        });
    }
});

function invertText(isChecked) {
    var newColor = isChecked ? "#000000" : "#FFFFFF";
    for (var i=0; i<divIds.length; i++) {
        var div = document.getElementById(divIds[i]);
        if (div) {
            var elements = div.getElementsByTagName('*');
            for (var j=0; j<elements.length; j++) {
                if (elements[j].tagName.toLowerCase() === 'script') {
                    continue;   // Skip script tags
                }
                
                var isSaveButton = (' ' + elements[j].className + ' ').indexOf(' save-button ') > -1;
                var isRoundedButton = (' ' + elements[j].className + ' ').indexOf(' rounded-button ') > -1;
                if (isSaveButton || isRoundedButton) {
                    continue;
                }
                
                var style = window.getComputedStyle(elements[j], null);
                var color = style.getPropertyValue('color');
                var hexColor = rgb2hex(color);
                if(hexColor === '#FFFFFF' && isChecked || hexColor === '#000000' && !isChecked){
                    elements[j].style.color = newColor; 
                }
            }
        }
    }
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +"0123456789ABCDEF".charAt((rgb[1]-rgb[1]%16)/16)+
             "0123456789ABCDEF".charAt(rgb[1]%16)+
             "0123456789ABCDEF".charAt((rgb[2]-rgb[2]%16)/16)+
             "0123456789ABCDEF".charAt(rgb[2]%16)+
             "0123456789ABCDEF".charAt((rgb[3]-rgb[3]%16)/16)+
             "0123456789ABCDEF".charAt(rgb[3]%16);
}