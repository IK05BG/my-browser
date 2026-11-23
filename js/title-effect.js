const title =
    document.getElementById(
        "browserTitle"
    );

const text =
    "Моят браузър";

title.innerHTML = "";

[...text].forEach(
    character => {

        const span =
            document.createElement(
                "span"
            );

        span.textContent =
            character === " "
                ? "\u00A0"
                : character;

        span.classList.add(
            "title-letter"
        );

        title.appendChild(
            span
        );

    }
);

const letters =
    document.querySelectorAll(
        ".title-letter"
    );

title.addEventListener(
    "mousemove",
    event => {

        letters.forEach(
            letter => {

                const rect =
                    letter.getBoundingClientRect();

                const center =
                    rect.left +
                    rect.width / 2;

                const distance =
                    Math.abs(
                        event.clientX -
                        center
                    );

                const maxDistance =
                    80;

                if (
                    distance <
                    maxDistance
                ) {

                    const offset =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) * 10;

                    letter.style.transform =
                        `translateY(${-offset}px)`;

                }
                else {

                    letter.style.transform =
                        "translateY(0px)";

                }

            }
        );

    }
);

title.addEventListener(
    "mouseleave",
    () => {

        letters.forEach(
            letter => {

                letter.style.transform =
                    "translateY(0px)";

            }
        );

    }
);