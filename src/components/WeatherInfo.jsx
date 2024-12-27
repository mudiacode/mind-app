import { useState, useEffect } from "react";
import { getWeather, getWeatherInfo } from "../utils/weather";

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

  if (error) return <div className="text-latte-red">{error}</div>;
  if (!weather)
    return <div className="text-latte-subtext0">Loading weather...</div>;

  const { name, icon } = getWeatherInfo(weather.weatherCode);

  return (
    <div className="bg-latte-mantle p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-4xl mr-2">{icon}</span>
        <span className="text-lg text-latte-text">{name}</span>
      </div>
      <div className="text-2xl font-bold text-latte-mauve">
        {Math.round(weather.temperature)}°C
      </div>
    </div>
  );
}

export default WeatherInfo;
