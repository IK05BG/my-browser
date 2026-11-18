let db;

const request = indexedDB.open(
    "NachaloDB",
    2
);

request.onupgradeneeded = (event) => {

    db = event.target.result;

    if (
        !db.objectStoreNames.contains(
            "wallpapers"
        )
    ) {

        db.createObjectStore(
            "wallpapers",
            {
                keyPath: "id"
            }
        );

    }

};

request.onsuccess = (event) => {

    db = event.target.result;

    loadWallpapers();

};

request.onerror = (error) => {

    console.error(error);

};

function getWallpaperStore(mode) {

    return db
        .transaction(
            ["wallpapers"],
            mode
        )
        .objectStore(
            "wallpapers"
        );

}

function generateId() {

    return Date.now();

}

function saveWallpaper(
    id,
    image
) {

    const store =
        getWallpaperStore(
            "readwrite"
        );

    store.put({

        id: id,

        image: image,

        active: false,

        lastUsed: Date.now()

    });

}

function getAllWallpapers(callback) {

    const store =
        getWallpaperStore(
            "readonly"
        );

    const request =
        store.getAll();

    request.onsuccess = () => {

        callback(
            request.result
        );

    };

}

function deleteWallpaper(id) {

    const store =
        getWallpaperStore(
            "readwrite"
        );

    store.delete(id);

}

function loadWallpapers() {

    getAllWallpapers(
        (wallpapers) => {

            const activeWallpaper =
                getActiveWallpaper();

            wallpapers.sort(
                (a, b) => {

                    if (
                        String(a.id) ===
                        activeWallpaper
                    ) {
            return -1;
                    }

                    if (
                        String(b.id) ===
                        activeWallpaper
                    ) {
                        return 1;
                    }

                    return (
                        b.lastUsed -
                        a.lastUsed
                    );

                }
            );

            wallpapers.forEach(
                (wallpaper) => {

                    if (
                        !wallpaper.image
                    ) {

                        return;

                    }

                    renderThumbnail(
                        wallpaper.id,
                        wallpaper.image
                    );

                }
            );

        }
    );

}

function setActiveWallpaper(id) {

    localStorage.setItem(
        "activeWallpaper",
        id
    );

}

function getActiveWallpaper() {

    return localStorage.getItem(
        "activeWallpaper"
    );

}

function updateWallpaperUsage(id) {

    const store =
        getWallpaperStore(
            "readwrite"
        );

    const request =
        store.get(id);

    request.onsuccess = () => {

        const wallpaper =
            request.result;

        if (!wallpaper) {

            return;

        }

        wallpaper.lastUsed =
            Date.now();

        store.put(
            wallpaper
        );

    };

}