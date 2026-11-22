const parallaxBackground =
document.getElementById(
    "background"
);

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
        event.clientX;

        mouseY =
        event.clientY;

    }
);

function updateParallax() {

    const centerX =
        window.innerWidth / 2;

    const centerY =
        window.innerHeight / 2;

    const moveX =
        (mouseX - centerX) / 12;

    const moveY =
        (mouseY - centerY) / 12;

    parallaxBackground.style.transform =
        `translate(
            ${-moveX}px,
            ${-moveY}px
        ) scale(1.08)`;

    requestAnimationFrame(
        updateParallax
    );

}

updateParallax();
