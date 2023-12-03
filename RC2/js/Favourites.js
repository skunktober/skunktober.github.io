const form = document.getElementById('favourites-form');
const favouritesList = document.getElementById('favourites-list');
// Try to load favourites from localStorage or default to an empty array if none found
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

function saveFavouritesToLocalStorage() {
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

function renderFavourites() {
  favouritesList.innerHTML = ''; // Clear the list
  favourites.forEach((favourite, index) => {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = favourite.url;
      a.textContent = favourite.label;
      a.target = '_blank';

      let removeBtn = document.createElement('button');
      removeBtn.textContent = 'x';
      removeBtn.className = 'delete-btn';
      removeBtn.onclick = () => {
          removeFavourite(index);
      };

      li.appendChild(a);
      li.appendChild(removeBtn);
      favouritesList.appendChild(li);
  });
}

function addFavourite(label, url) {
  if (favourites.length >= 4) {
      alert('You can only add up to 4 favourites.');
      return;
  }
  favourites.push({ label, url });
  saveFavouritesToLocalStorage();
  renderFavourites();
}

function removeFavourite(index) {
  favourites.splice(index, 1);
  saveFavouritesToLocalStorage();
  renderFavourites();
}

form.onsubmit = (e) => {
  e.preventDefault();
  const labelInput = document.getElementById('label');
  const urlInput = document.getElementById('url');
  
  const label = labelInput.value.trim();
  let url = urlInput.value.trim();
  const domainPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i;

  if (!domainPattern.test(url)) {
      alert("Please enter a valid URL including a domain (e.g. example.com).");
      urlInput.focus();
      return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
  }

  addFavourite(label, url);
  form.reset();
};

renderFavourites(); // Initial rendering