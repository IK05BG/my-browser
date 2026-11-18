const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

function isUrl(text) {

    const value = text.trim();

    return (
        value.includes(".") &&
        !value.includes(" ")
    );

}

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
        return;
    }

    if (isUrl(query)) {

        let url = query;

        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {
            url = "https://" + url;
        }

        window.location.href = url;

        return;
    }

    const bingUrl =
        "https://www.bing.com/search?q=" +
        encodeURIComponent(query);

    window.location.href = bingUrl;

});