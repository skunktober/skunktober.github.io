document.addEventListener('DOMContentLoaded', function () {
  const storedRole = loadRole();
  if (storedRole) {
    updateRoleOnPage(storedRole);
  }

  const roleInput = document.getElementById('role-input');
  roleInput.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      // Enter key
      setRole();
    }
  });

  const roleSubmit = document.getElementById('role-submit');
  if (roleSubmit) {
    roleSubmit.addEventListener('click', function (event) {
      event.preventDefault();
      setRole();
    });
  }
});

function updateRoleOnPage(role) {
  const roleElement = document.getElementById('custom-role');
  const profileDetailsElements = document.querySelectorAll('.profile-details h2, .role');

  if (roleElement) {
    roleElement.textContent = role;
  }

  profileDetailsElements.forEach(function (element) {
    element.textContent = role;
  });
}

function saveRole(role) {
  localStorage.setItem('customRole', role);
  document.cookie = `customRole=${role};path=/;max-age=31536000`; // 1 year
}

function loadRole() {
  const localRole = localStorage.getItem('customRole');
  const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)customRole\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  return localRole || cookieValue || null;
}

function setRole() {
  const roleInput = document.getElementById('role-input');
  const customRole = roleInput.value;
  if (customRole) {
    saveRole(customRole);
    updateRoleOnPage(customRole);
    console.log('Role submitted:', customRole);
  }
}
