export const renderCurrentWeather = function (data) {
  const title = document.querySelector(".heading-secondary");
  title.innerText = data.name;
  const temperature = document.querySelector(".temperature");
  temperature.innerHTML = `<span>Temperature:</span> ${Math.trunc(
    Number(data.main.temp)
  )} &#8451;`;
  const feelsLikeTemp = document.querySelector(".temperature-feels-like");
  feelsLikeTemp.innerHTML = `<span>Feels like:</span> <span>${data.main.feels_like} &#8451;</span>`;
  const minTemp = document.querySelector(".temperature-min");
  minTemp.innerHTML = `<span>Minimum:</span> <span>${data.main.temp_min} &#8451;</span>`;
  const maxTemp = document.querySelector(".temperature-max");
  maxTemp.innerHTML = `<span>Maximum:</span> <span>${data.main.temp_max} &#8451;</span>`;
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = `<span>Humidity:</span> <span>${data.main.humidity} %</span>`;

  const pressure = document.querySelector(".pressure");
  pressure.innerHTML = `<span>Pressure:</span> <span>${data.main.pressure} hPa</sapn>`;

  const icon = document.querySelector(".weather-icon");
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const description = document.querySelector(".weather-description");
  description.innerText =
    data.weather[0].description.charAt(0).toUpperCase() +
    data.weather[0].description.slice(1);
};

const buildCard = function (time, icon, description, temperature) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "forecast-card";
  const hour = document.createElement("p");
  hour.innerText = time;
  const iconElement = document.createElement("img");
  iconElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = description;
  const temp = document.createElement("p");
  temp.innerHTML = `${Math.floor(Number(temperature))} &#8451;`;
  cardContainer.append(hour, iconElement, descriptionElement, temp);
  return cardContainer;
};

export const renderForecastWeather = function (data) {
  console.log(data);
  const forecastList = document.querySelector(".forecast-list");
  forecastList.innerHTML = "";
  const title = document.querySelector(".title");
  title.innerText = data.city.name;

  const dates = Object.keys(data.list);
  console.log(dates);
  dates.forEach((date) => {
    const container = document.createElement("div");
    container.className = "forecast-row-container";
    const dateElement = document.createElement("h4");
    dateElement.innerText = date;
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-container";

    data.list[date].forEach((weatherObj) => {
      console.log(weatherObj);
      const time = weatherObj.dt_txt.split(" ")[1];
      const card = buildCard(
        time,
        weatherObj.weather[0].icon,
        weatherObj.weather[0].description.charAt(0).toUpperCase() +
          weatherObj.weather[0].description.slice(1),
        weatherObj.main.temp
      );
      cardsContainer.appendChild(card);
    });

    container.append(dateElement, cardsContainer);
    forecastList.append(container);
  });
};
