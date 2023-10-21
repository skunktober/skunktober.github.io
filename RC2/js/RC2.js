// JavaScript function to handle button click animation
function handleButtonClick(button) {
    button.classList.add('btn-click-animation');

    // Remove the animation class after the animation is complete
    setTimeout(function () {
        button.classList.remove('btn-click-animation');
    }, 200); // 200ms is the duration of the animation defined in CSS
}
