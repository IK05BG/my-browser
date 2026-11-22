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

            const img =
                new Image();

            img.onload = () => {

                const isPng =
                    file.type ===
                    "image/png";

                const sizeMB =
                    file.size /
                    (1024 * 1024);

                let quality =
                    1.0;

                if (isPng) {

                    quality = 0.95;

                }

                if (sizeMB > 5) {

                    quality = 0.90;

                }

                if (sizeMB > 10) {

                    quality = 0.85;

                }

                const canvas =
                    document.createElement(
                        "canvas"
                    );

                canvas.width =
                    img.width;

                canvas.height =
                    img.height;

                const ctx =
                    canvas.getContext(
                        "2d"
                    );

                ctx.drawImage(
                    img,
                    0,
                    0
                );

                const image =
                    canvas.toDataURL(
                        "image/jpeg",
                        quality
                    );

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

            img.src =
                e.target.result;

        };

        reader.readAsDataURL(
            file
        );

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
