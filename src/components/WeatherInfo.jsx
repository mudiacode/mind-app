import { useState, useEffect } from "react";
import { getWeather, getWeatherInfo } from "../utils/weather";

function WeatherInfo() {
  // State to store weather data and any potential errors
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use browser's geolocation API to get user's current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch weather data using the obtained coordinates
        const weatherData = await getWeather(latitude, longitude);
        if (weatherData) {
          setWeather(weatherData);
        } else {
          setError("Failed to fetch weather data");
        }
      },
      (err) => {
        // Handle geolocation errors
        setError("Failed to get location");
        console.error(err);
      },
    );
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Display error message if there's an error
  if (error) return <div className="text-latte-red">{error}</div>;
  // Display loading message while fetching weather data
  if (!weather)
    return <div className="text-latte-subtext0">Loading weather...</div>;

  // Get weather name and icon based on the weather code
  const { name, icon } = getWeatherInfo(weather.weatherCode);

  // Render weather information
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
