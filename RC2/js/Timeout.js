function handleClickAndRedirect(element) {
    handleButtonClick(element);
    setTimeout(function() {
      window.location.href = 'index.html';
    }, 300);
}