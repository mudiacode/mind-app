import axios from "axios";

export async function getWeather(latitude, longitude) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await axios.get(url);
    const { current_weather } = response.data;

    return {
      temperature: current_weather.temperature,
      weatherCode: current_weather.weathercode,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export function getWeatherInfo(weatherCode) {
  const weatherInfo = {
    0: { name: "Clear sky", icon: "☀️" },
    1: { name: "Mainly clear", icon: "🌤️" },
    2: { name: "Partly cloudy", icon: "⛅" },
    3: { name: "Overcast", icon: "☁️" },
    45: { name: "Fog", icon: "🌫️" },
    48: { name: "Depositing rime fog", icon: "🌫️" },
    51: { name: "Light drizzle", icon: "🌦️" },
    53: { name: "Moderate drizzle", icon: "🌦️" },
    55: { name: "Dense drizzle", icon: "🌧️" },
    61: { name: "Slight rain", icon: "🌦️" },
    63: { name: "Moderate rain", icon: "🌧️" },
    65: { name: "Heavy rain", icon: "🌧️" },
    71: { name: "Slight snow fall", icon: "🌨️" },
    73: { name: "Moderate snow fall", icon: "🌨️" },
    75: { name: "Heavy snow fall", icon: "❄️" },
    95: { name: "Thunderstorm", icon: "⛈️" },
  };

  return weatherInfo[weatherCode] || { name: "Unknown", icon: "❓" };
}
