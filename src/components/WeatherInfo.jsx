import { useState, useEffect } from "react";
import { getWeather, getWeatherDescription } from "../utils/weather";

function WeatherInfo() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeather(latitude, longitude);
        if (weatherData) {
          setWeather(weatherData);
        } else {
          setError("Failed to fetch weather data");
        }
      },
      (err) => {
        setError("Failed to get location");
        console.error(err);
      },
    );
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-2">Current Weather</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {getWeatherDescription(weather.weatherCode)}</p>
      <p>Wind Speed: {weather.windSpeed} km/h</p>
      <p>Precipitation: {weather.precipitation} mm</p>
    </div>
  );
}

export default WeatherInfo;
