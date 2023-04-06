// Add this code to the new randomString.js file
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function updateRandomString() {
  document.getElementById('random-string').innerHTML = generateRandomString();
}

setInterval(updateRandomString, 100);
