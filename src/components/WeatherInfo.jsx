import { useState, useEffect } from "react";
import { getWeather } from "../utils/weather";

function WeatherInfo() {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      const currentWeather = await getWeather();
      setWeather(currentWeather);
    }
    fetchWeather();
  }, []);

  return (
    <div className="text-sm text-gray-600 mt-2">Current weather: {weather}</div>
  );
}

export default WeatherInfo;
