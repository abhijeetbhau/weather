const apiKey = "d0d5cc807f0c7614031ac5536c686463";

// Enter key
function handleKey(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}

// City weather
async function getWeather() {
    const city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
        showWeather(data);
    } else {
        document.getElementById("result").innerHTML = "❌ City not found";
    }
}

// Location weather
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        showWeather(data);
    });
}

// Show weather
function showWeather(data) {
    document.getElementById("result").innerHTML =
        `🌡️ ${data.name}: ${data.main.temp}°C`;

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.body.className = data.weather[0].main.toLowerCase();
}
