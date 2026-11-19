async function loadWeatherFromCoords(
    latitude,
    longitude
) {

    const weatherResponse =
        await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day`
        );

    const weatherData =
        await weatherResponse.json();

    const temp =
        Math.round(
            weatherData.current.temperature_2m
        );

    const code =
        weatherData.current.weather_code;

    const isDay =
        weatherData.current.is_day === 1;

    let icon = "⛅";

    if (code === 0) {

        icon =
            isDay
                ? "☀️"
                : "🌙";

    }
    else if (
        code >= 1 &&
        code <= 3
    ) {

        icon =
            isDay
                ? "🌤️"
                : "☁️";

    }
    else if (
        code >= 45 &&
        code <= 48
    ) {

        icon = "ᯓ";

    }
    else if (
        code >= 51 &&
        code <= 67
    ) {

        icon = "🌧️";

    }
    else if (
        code >= 71 &&
        code <= 77
    ) {

        icon = "❄️";

    }
    else if (
        code >= 80 &&
        code <= 99
    ) {

        icon = "⛈️";

    }

    document
        .getElementById(
            "weatherIcon"
        ).textContent =
        icon;

    document
        .getElementById(
            "weatherText"
        ).textContent =
        `${temp}°C`;
}

async function loadWeather() {

    const savedLatitude =
        localStorage.getItem(
            "latitude"
        );

    const savedLongitude =
        localStorage.getItem(
            "longitude"
        );

    if (
        savedLatitude &&
        savedLongitude
    ) {

        try {

            await loadWeatherFromCoords(
                savedLatitude,
                savedLongitude
            );

        }
        catch {

        }

    }

    if (!navigator.geolocation) {

        if (
            !savedLatitude ||
            !savedLongitude
        ) {

            document
                .getElementById(
                    "weatherText"
                ).textContent =
                "Без локация";

        }

        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            try {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                localStorage.setItem(
                    "latitude",
                    latitude
                );

                localStorage.setItem(
                    "longitude",
                    longitude
                );

                await loadWeatherFromCoords(
                    latitude,
                    longitude
                );

            }
            catch (error) {

                console.error(
                    error
                );

                if (
                    !savedLatitude ||
                    !savedLongitude
                ) {

                    document
                        .getElementById(
                            "weatherText"
                        ).textContent =
                        "Няма връзка";

                }

            }

        },

        () => {

            if (
                !savedLatitude ||
                !savedLongitude
            ) {

                document
                    .getElementById(
                        "weatherText"
                    ).textContent =
                    "Локацията е отказана";

            }

        }

    );

}

loadWeather();

setInterval(
    loadWeather,
    1800000
);

document
    .getElementById(
        "weatherWidget"
    )
    .addEventListener(
        "click",
        async () => {

            document
                .getElementById(
                    "weatherText"
                ).textContent =
                "...";

            await loadWeather();

        }
    );
