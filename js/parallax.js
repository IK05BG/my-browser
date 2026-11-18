console.log("parallax loaded");
const parallaxBackground =
document.getElementById(
    "background"
);

document.addEventListener(
    "mousemove",
    (event) => {

        console.log("mousemove");

        const mouseX =
        event.clientX;

        const mouseY =
        event.clientY;

        const centerX =
        window.innerWidth / 2;

        const centerY =
        window.innerHeight / 2;

        const moveX =
        (mouseX - centerX) / 12;

        const moveY =
        (mouseY - centerY) / 12;

        parallaxBackground.style.transform =
        `
        translate(
            ${-moveX}px,
            ${-moveY}px
        )
        scale(1.08)
        `;

    }
);