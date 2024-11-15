import { getForecastWeather, splitForecastListByDate } from "./js/services.js";
import { renderForecastWeather } from "./js/render.js";

window.addEventListener("load", async () => {
  const city = sessionStorage.getItem("city");

  const forecastData = await getForecastWeather(city);
  const forecastList = splitForecastListByDate(forecastData.list);
  forecastData.list = forecastList;

  renderForecastWeather(forecastData);
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  const performSearch = async function () {
    const value = searchInput.value;
    if (value && value !== "") {
      const forecastData = await getForecastWeather(value);
      if (forecastData.cod === "404") {
        alert(forecastData.message);
      } else {
        sessionStorage.setItem("city", forecastData.city.name);
        const forecastList = splitForecastListByDate(forecastData.list);
        forecastData.list = forecastList;
        renderForecastWeather(forecastData);
      }
    }
  };

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
});
