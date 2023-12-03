var divIds = ["content", "apps", "settings", "widget-container"];

document.addEventListener('DOMContentLoaded', function (event) {
    var checkbox = document.getElementById('invertTextCheckbox');

    if (checkbox) {
        var isChecked = localStorage.getItem('invertTextCheckbox') === 'true';
        checkbox.checked = isChecked;

        checkbox.addEventListener('change', function () {
            localStorage.setItem('invertTextCheckbox', this.checked);
            if (this.checked) {
                invertText();
            } else {
                revertTextStyles();
            }
        });

        if (isChecked) {
            invertText();
        }
    } else { // Check for setting without the checkbox and invert text if necessary
        var isChecked = localStorage.getItem('invertTextCheckbox') === 'true';
        if (isChecked) {
            invertText();
        }
    }
});

function invertText() {
    var newColor = "#000000";
    var targetColors = ['#FFFFFF', '#F3FFFA'];

    updateTextStyles(targetColors, newColor);
}

function revertTextStyles() {
    var targetColors = ['#000000'];
    updateTextStyles(targetColors, '');
}

function updateTextStyles(targetColors, newColor) {
    for (var i = 0; i < divIds.length; i++) {
        var div = document.getElementById(divIds[i]);
        if (div) {
            var elements = div.getElementsByTagName('*');
            for (var j = 0; j < elements.length; j++) {
                if (elements[j].tagName.toLowerCase() === 'script' || elements[j].tagName.toLowerCase() === 'br') {
                    continue;   // Skip script and br tags
                }

                var isSaveButton = (' ' + elements[j].className + ' ').indexOf(' save-button ') > -1;
                var isRoundedButton = (' ' + elements[j].className + ' ').indexOf(' rounded-button ') > -1;
                if (isSaveButton || isRoundedButton) {
                    continue;   // Skip button
                }

                var style = window.getComputedStyle(elements[j], null);
                var color = style.getPropertyValue('color');
                var hexColor = rgb2hex(color);

                if (targetColors.includes(hexColor)) {
                    if (newColor !== '') {
                        elements[j].style.color = newColor;
                        elements[j].dataset.inverted = 'true'; // Add data attribute flag
                    } else if (elements[j].dataset.inverted === 'true') {
                        elements[j].style.color = '';
                        delete elements[j].dataset.inverted; // Remove data attribute flag
                    }
                }
            }
        }
    }
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + "0123456789ABCDEF".charAt((rgb[1] - rgb[1] % 16) / 16) +
        "0123456789ABCDEF".charAt(rgb[1] % 16) +
        "0123456789ABCDEF".charAt((rgb[2] - rgb[2] % 16) / 16) +
        "0123456789ABCDEF".charAt(rgb[2] % 16) +
        "0123456789ABCDEF".charAt((rgb[3] - rgb[3] % 16) / 16) +
        "0123456789ABCDEF".charAt(rgb[3] % 16);
}