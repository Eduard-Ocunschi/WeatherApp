# Weather App 🌤️

This is a weather application built using the **OpenWeatherMap API**. The app provides real-time weather updates and forecasts based on your **geolocation** or a city of your choice. The background of the app dynamically changes to reflect the current weather conditions, enhancing the user experience with a visually immersive forecast.

## Features

- **Geolocation-Based Weather**: Automatically fetch the current weather based on your device's location.
- **City Search**: Search for the weather in any city across the globe.
- **5-Day Forecast**: View detailed forecasts, updated every 3 hours, for up to 5 days.
- **Dynamic Background**: The background changes according to the current weather conditions, such as sunny, rainy, misty, snowy, or cloudy, to match the atmosphere.
- **Persistent Location**: The app saves your selected location in **local storage**, so you can access the forecast page directly without re-searching.
- **Responsive Design**: Built with **vanilla JavaScript**, **CSS/SASS**, and some **Bootstrap** for styling.

## How It Works

1. **To get started, first install the dependencies**:
   ```bash
   npm install
   ```
2. The app uses the OpenWeatherMap API to fetch weather data via a secure **API token**. (Is a free API so you can be locked out since the calls are limited/day)
3. The SASS files are compiled using the following npm command:  
   ```bash
   npm run compile:sass
   ```

## Tech Stack

- **JavaScript**: Handles logic and API integration.
- **CSS/SASS**: Custom styles with SASS for modularity.
- **Bootstrap**
- **Local Storage**
