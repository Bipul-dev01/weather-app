// // Get the API Key from here: https://openweathermap.org/api

const API_KEY = "b7b1da05bbfb4e5efca7e42449055e98";

const queryWeather = async (city) => {
  try {
    showLoading();
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
};

document.querySelector("#searchBtn").addEventListener("click", () => {
  const city = document.querySelector("#cityInput").value.trim();
  if (city) {
    queryWeather(city);
  }
});

function showLoading() {
  document.querySelector("#loading").innerHTML = "⏳ Loading...";
}

function hideLoading() {
  document.querySelector("#loading").innerHTML = "";
}
function displayWeather(data) {
  document.querySelector("#result").innerHTML = `
    <div class="weather-card">
      <h2>${data.name}</h2>
      <div class="weather-info">
        <div class="weather-details">
          <p>🌡️ <strong>Temp:</strong> ${data.main.temp.toFixed(2)}°C</p>
          <p>☁️ <strong>Condition:</strong> ${data.weather[0].description}</p>
        </div>
        <div class="weather-icon">
          <img src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@4x.png" alt="Weather icon">
        </div>
      </div>
    </div>
  `;
}

function showError(message) {
  document.querySelector(
    "#result"
  ).innerHTML = `<p style="color:red;">❌ ${message}</p>`;
}
