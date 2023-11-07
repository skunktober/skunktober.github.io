function handleButtonClick(button) {
    button.classList.add('btn-click-animation');

    setTimeout(function () {
        button.classList.remove('btn-click-animation');
    }, 200);
}
