document.addEventListener('DOMContentLoaded', function () {
  const storedName = loadName();
  if (storedName) {
    updateNameOnPage(storedName);
  }

  const nameInput = document.getElementById('name-input');
  nameInput.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      // Enter key
      setName();
    }
  });

  const nameSubmit = document.getElementById('name-submit');
  if (nameSubmit) {
    nameSubmit.addEventListener('click', function (event) {
      event.preventDefault();
      setName();
    });
  }
});

function updateNameOnPage(name) {
  const nameElement = document.getElementById('custom-name');
  const profileDetailsElements = document.querySelectorAll('.profile-details h1');

  if (nameElement) {
    nameElement.textContent = name;
  }

  profileDetailsElements.forEach(function (element) {
    element.textContent = name;
  });
}

function saveName(name) {
  localStorage.setItem('customName', name);
  document.cookie = `customName=${name};path=/;max-age=31536000`; // 1 year
}

function loadName() {
  const localName = localStorage.getItem('customName');
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  return localName || cookieValue || null;
}

function setName() {
  const nameInput = document.getElementById('name-input');
  const customName = nameInput.value;
  if (customName) {
    saveName(customName);
    updateNameOnPage(customName);
    console.log('Name submitted:', customName);
  }
}
