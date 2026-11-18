const wallpaperInput =
document.getElementById("wallpaperInput");

const wallpaperGallery =
document.getElementById("wallpaperGallery");

const background =
document.getElementById("background");

const resetWallpaperButton =
document.getElementById(
    "resetWallpaperButton"
);

wallpaperInput.addEventListener(
    "change",
    (event) => {

        const file =
        event.target.files[0];

        if (!file) {
            return;
        }

        const reader =
        new FileReader();

        reader.onload = (e) => {

            console.log("reader.onload");
            const image =
            e.target.result;

            const wallpaperId =
            Date.now();

            saveWallpaper(
                wallpaperId,
                image
            );

            document
                .querySelectorAll(
                    ".wallpaper-card"
                )
                .forEach(card => {

                    card.classList.remove(
                        "active"
                    );

                });

            background.style.backgroundImage =
            `url(${image})`;

            setActiveWallpaper(
                wallpaperId
            );

            renderThumbnail(
                wallpaperId,
                image
            );

        };

        reader.readAsDataURL(file);

    }
);

function renderThumbnail(
    id,
    image
) {

    console.log("thumbnail created");
    const card =
    document.createElement("div");

    card.className =
    "wallpaper-card";
    const activeWallpaper =
    getActiveWallpaper();

    if (
        activeWallpaper &&
        String(id) === activeWallpaper
    ) {

        card.classList.add(
            "active"
        );

    }

    if (
        String(id) ===
        getActiveWallpaper()
    ) {

        card.classList.add(
            "active"
        );

        background.style.backgroundImage =
        `url(${image})`;

    }

    card.innerHTML = `
        <img src="${image}">

        <button class="wallpaper-delete">
            ×
        </button>
    `;

    const deleteButton =
    card.querySelector(
        ".wallpaper-delete"
    );

    deleteButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const activeWallpaper =
            getActiveWallpaper();

            if (
                String(id) ===
                activeWallpaper
            ) {

                background.style.backgroundImage =
                "";

                localStorage.removeItem(
                    "activeWallpaper"
                );

            }

            deleteWallpaper(id);

            card.remove();

        }
    );

    card.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".wallpaper-card"
                )
                .forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

            card.classList.add(
                "active"
            );

            background.style.backgroundImage =
            `url(${image})`;

            setActiveWallpaper(id);
            updateWallpaperUsage(id);
            wallpaperGallery.prepend(
                card
            );

        }
    );

    wallpaperGallery.appendChild(
        card
    );

}

resetWallpaperButton.addEventListener(
    "click",
    () => {

        background.style.backgroundImage =
        "";

        localStorage.removeItem(
            "activeWallpaper"
        );

        document
            .querySelectorAll(
                ".wallpaper-card"
            )
            .forEach(card => {

                card.classList.remove(
                    "active"
                );

            });

    }
);