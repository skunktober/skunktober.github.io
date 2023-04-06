document.addEventListener('DOMContentLoaded', function () {
    const pfpSelector = document.getElementById('pfp-selector');
    const profilePicture = document.getElementById('profile-picture');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookiesArray = decodedCookie.split(';');
        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }

    function updateProfilePicture(imgSrc) {
        profilePicture.src = imgSrc;
        localStorage.setItem("profilePicture", imgSrc);
        setCookie("profilePicture", imgSrc, 30); // Save the profile picture in a cookie for 30 days
    }

    function loadProfilePicture() {
        const savedProfilePicture = localStorage.getItem("profilePicture") || getCookie("profilePicture");
        if (savedProfilePicture && profilePicture) {
            profilePicture.src = savedProfilePicture;
        }
    }

    if (pfpSelector) {
        pfpSelector.addEventListener('click', function (event) {
            const target = event.target;
            if (target.classList.contains('custom-dropdown-option')) {
                const selectedOption = target.getAttribute('data-value');
                let imgSrc = "";

                switch (selectedOption) {
                    case "boy":
                        imgSrc = "images/profiles/boy.png";
                        break;
                    case "girl":
                        imgSrc = "images/profiles/girl.png";
                        break;
                    case "boy_winter":
                        imgSrc = "images/profiles/boy_winter.png";
                        break;
                    case "girl_winter":
                        imgSrc = "images/profiles/girl_winter.png";
                        break;
                    case "male":
                        imgSrc = "images/profiles/male.png";
                        break;
                    case "female":
                        imgSrc = "images/profiles/female.png";
                        break;
                    case "custom":
                        imgSrc = "images/profiles/custom.png";
                        break;
                    default:
                        imgSrc = "images/profiles/male.png";
                }

                updateProfilePicture(imgSrc);

                // Update the custom-dropdown-selected text
                pfpSelector.querySelector('.custom-dropdown-selected').innerText = target.innerText;
            }
        });
    }

    loadProfilePicture();
});

