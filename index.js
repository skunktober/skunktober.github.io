// Ensure this script is placed at the end of your body tag or wrapped in a DOMContentLoaded event listener

window.addEventListener('DOMContentLoaded', (event) => {
    // Correctly fade in the home section when the page loads
    setActive('#home', 'dynamic-content'); 
    requestAnimationFrame(floatLogo); // Start the floating logo animation
});

const logo = document.getElementById('floating-logo');
let moveAngle = 0;
let posX = 20;
let posY = 20;

const amplitude = 0.3;
const frequency = 0.05;

function floatLogo() {
    posX += Math.cos(moveAngle) * amplitude;
    posY += Math.sin(moveAngle) * amplitude;
    moveAngle += frequency;

    logo.style.left = posX + 'px';
    logo.style.top = posY + 'px';

    requestAnimationFrame(floatLogo);
}

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const currentlyActive = document.querySelector('.projects.active, .content.active, .dynamic-content.active');
        const targetElement = document.querySelector(targetId);

        if (!targetElement.classList.contains('active')) {
            if (currentlyActive) {
                fadeOut(currentlyActive.id, () => {
                    currentlyActive.classList.remove('active');
                    // Ensure dynamic-content starts at correct opacity before fade in.
                    if (targetElement.classList.contains('dynamic-content')) {
                        targetElement.style.opacity = '0';
                    }
                    // After fade out, set the new active element and fade it in.
                    targetElement.classList.add('active');
                    fadeIn(targetId);
                });
            } else {
                targetElement.classList.add('active');
                fadeIn(targetId);
            }
        }
    });
});

function setActive(id) {
    const targetElement = document.querySelector(id);

    if (!targetElement.classList.contains('active')) {
        targetElement.classList.add('active');
        fadeIn(id);
    }
}

function fadeIn(id) {
    const element = document.querySelector(id);
    let targetOpacity = element.classList.contains('dynamic-content') ? 0.1 : 1;
    element.style.opacity = '0';
    
    let opacity = 0;
    const rate = (targetOpacity / 10); // Standardized rate based on achieving target in equal time
    const interval = setInterval(() => {
        if (opacity < targetOpacity) {
            opacity += rate; 
            element.style.opacity = opacity.toString();
        } else {
            clearInterval(interval);
            element.style.opacity = targetOpacity.toString(); // Ensure we hit the target opacity accurately
        }
    }, 20); // Adjusted for a more consistent experience
}

function fadeOut(id, callback) {
    const element = document.querySelector(`#${id}`);
    let isDynamicContent = element.classList.contains('dynamic-content');
    let targetOpacity = 0; // Target is always becoming invisible during fade out
    let opacity = parseFloat(window.getComputedStyle(element).getPropertyValue('opacity'));
    const rate = isDynamicContent ? 0.005 : 0.05; // Slower rate for dynamic content due to smaller opacity change

    const interval = setInterval(() => {
        if (opacity > targetOpacity) {
            opacity -= rate;
            element.style.opacity = opacity.toString();
        } else {
            clearInterval(interval);
            element.style.opacity = targetOpacity.toString();
            element.classList.remove('active');
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 20); // Adjusted for a more consistent experience
}

function fadeOut(id, callback) {
    const element = document.querySelector(`#${id}`);
    // Identifying if the element is dynamic content.
    let isDynamicContent = element.classList.contains('dynamic-content');
    let targetOpacity = isDynamicContent ? 0.1 : 0; // Target opacity is 0.1 if dynamic-content, else 0.
    let opacity = parseFloat(window.getComputedStyle(element).getPropertyValue('opacity'));

    const interval = setInterval(() => {
        if (opacity > targetOpacity) {
            opacity -= 0.05; // Adjust decrement rate as needed for smoother transition
            element.style.opacity = opacity.toString();
        } else {
            clearInterval(interval);
            if (isDynamicContent) {
                // For dynamic-content, temporarily set to 0.1 during the outgoing transition.
                element.style.opacity = '0.1';
                if (typeof callback === 'function') {
                    callback();
                    // Post callback, fade to 0 to ensure it doesn't stay visible if not active.
                    setTimeout(() => { element.style.opacity = '0'; }, 20);
                }
            } else {
                // For non-dynamic content, immediately proceed with hiding it.
                element.style.opacity = '0';
                element.classList.remove('active');
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }
    }, 10);
}

function updateInfo(e) {
    // Retrieve the user agent string
    var userAgent = navigator.userAgent;

    // Get the viewport dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    // Check if the event parameter is provided (for mousemove updates)
    if (e) {
        // Update the content with user agent, viewport dimensions, and mouse position
        document.getElementById('home').textContent = `${userAgent} ${viewportWidth}px ${viewportHeight}px Mouse Pos: X: ${e.clientX} Y: ${e.clientY}`;
    } else {
        // Initial content update without mouse position
        document.getElementById('home').textContent = `${userAgent} ${viewportWidth}px ${viewportHeight}px`;
    }
}

// Initial update
updateInfo();

// Update info with mouse movement
document.addEventListener('mousemove', updateInfo);

requestAnimationFrame(floatLogo); // Start animation

