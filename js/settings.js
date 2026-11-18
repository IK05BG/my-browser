const weatherWidget =
document.getElementById(
    "weatherWidget"
);

const settingsButton =
document.getElementById(
    "settingsButton"
);

const settingsPanel =
document.getElementById(
    "settingsPanel"
);

settingsButton.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();

        settingsPanel.classList.add(
            "open"
        );

        settingsButton.classList.add(
            "hidden"
        );

        weatherWidget.style.display =
            "none";
    }
);

document.addEventListener(
    "click",
    (event) => {

        if (
            !settingsPanel.contains(
                event.target
            )
        ) {

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);

settingsPanel.addEventListener(
    "transitionend",
    () => {

        if (
            !settingsPanel.classList.contains(
                "open"
            )
        ) {

        settingsButton.classList.remove(
            "hidden"
        );

        settingsButton.classList.add(
            "pop"
        );

        setTimeout(() => {

        weatherWidget.classList.remove(
            "pop"
        );

        weatherWidget.style.display =
            "flex";

        void weatherWidget.offsetWidth;

        weatherWidget.classList.add(
            "pop"
        );

            setTimeout(() => {

                weatherWidget.classList.remove(
                    "pop"
                );

            }, 350);

        }, 120);

        setTimeout(() => {

            settingsButton.classList.remove(
                "pop"
            );

        }, 350);

        }

    }
);