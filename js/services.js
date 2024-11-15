const baseUrl = "https://api.openweathermap.org/data/2.5";
const API_KEY = "ce8609e9f4c131dd3b77d634de3af5bb";

export const splitForecastListByDate = function (list) {
  const obj = {};
  list.forEach((weatherObj) => {
    const date = weatherObj.dt_txt.split(" ")[0];
    if (obj[date]) {
      obj[date].push(weatherObj);
    } else {
      obj[date] = [weatherObj];
    }
  });
  return obj;
};

const getGeoLocation = async function () {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (error) => reject(error)
      );
    });
  } else {
    throw new Error("Geolocation is not supported by this browser.");
  }
};

const getCurrentWeatherByGeolocation = async function () {
  try {
    const location = await getGeoLocation();
    console.log("Geolocation retrieved:", location); // Debug log
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    console.log("Latitude and Longitude:", latitude, longitude); // Debug log
    const response = await fetch(
      `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getCurrentWeatherByCity = async function (city) {
  try {
    const response = await fetch(
      `${baseUrl}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentWeather = function (params) {
  const storedCity = sessionStorage.getItem("city");
  if (params === undefined && storedCity === null) {
    return getCurrentWeatherByGeolocation();
  } else if (params === undefined && storedCity !== null) {
    return getCurrentWeatherByCity(storedCity);
  } else if (params.city) {
    return getCurrentWeatherByCity(params.city);
  }
};

export const getForecastWeather = async function (city) {
  try {
    const response = await fetch(
      `${baseUrl}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
