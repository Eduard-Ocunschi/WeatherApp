import { getCurrentWeather } from "./js/services.js";
import { renderCurrentWeather } from "./js/render.js";

window.addEventListener("load", async () => {
  const currentWeatherData = await getCurrentWeather();
  const videoElement = document.querySelector(".video");
  const sourceElement = videoElement.querySelector(".video-src");

  console.log(currentWeatherData);

  sessionStorage.setItem("city", currentWeatherData.name);
  renderCurrentWeather(currentWeatherData);

  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  const performSearch = async function () {
    const value = searchInput.value;
    if (value && value !== "") {
      const weatherData = await getCurrentWeather({ city: value });
      if (weatherData.cod === "404") {
        alert(weatherData.message);
      } else {
        renderCurrentWeather(weatherData);
        sessionStorage.setItem("city", weatherData.name);
        changeBackground(weatherData);
      }
    }
  };

  // const changeBackground = (thisWeather) => {
  //   const iconCode = thisWeather.weather[0].icon;
  //   if (iconCode === "01d" || iconCode === "01n") {
  //     sourceElement.src = "img/clear-sky.mp4";
  //   } else {
  //     sourceElement.src = "img/cloudy.mp4";
  //   }
  //   videoElement.load();
  // };

  const changeBackground = (thisWeather) => {
    const iconCode = thisWeather.weather[0].icon;
    let videoSource = "";

    // Use a switch statement to handle different weather conditions
    switch (iconCode) {
      case "01d":
      case "01n":
        videoSource = "img/clear-sky.mp4";
        break;
      case "02d":
      case "02n":
        videoSource = "img/few-clouds.mp4";
        break;
      case "03d":
      case "03n":
        videoSource = "img/scattered-clouds.mp4";
        break;
      case "04d":
      case "04n":
        videoSource = "img/broken-clouds.mp4";
        break;
      case "09d":
      case "09n":
        videoSource = "img/shower-rain.mp4";
        break;
      case "10d":
      case "10n":
        videoSource = "img/rain.mp4";
        break;
      case "11d":
      case "11n":
        videoSource = "img/thunderstorm.mp4";
        break;
      case "13d":
      case "13n":
        videoSource = "img/snowing.mp4";
        break;
      case "50d":
      case "50n":
        videoSource = "img/mist.mp4";
        break;
      default:
        videoSource = ""; // Fallback for any undefined cases
    }

    // Change the video source dynamically
    sourceElement.src = videoSource;

    // Reload the video element to reflect the new source
    videoElement.load();
  };

  changeBackground(currentWeatherData);

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
});
