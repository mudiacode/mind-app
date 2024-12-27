import axios from "axios";

// Function to fetch weather data from Open-Meteo API
export async function getWeather(latitude, longitude) {
  try {
    // Construct the API URL with provided latitude and longitude
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    // Make a GET request to the API
    const response = await axios.get(url);
    // Extract current weather data from the response
    const { current_weather } = response.data;

    // Return an object with temperature and weather code
    return {
      temperature: current_weather.temperature,
      weatherCode: current_weather.weathercode,
    };
  } catch (error) {
    // Log any errors that occur during the API request
    console.error("Error fetching weather data:", error);
    // Return null if there's an error
    return null;
  }
}

// Function to get weather information based on weather code
export function getWeatherInfo(weatherCode) {
  // Object mapping weather codes to their corresponding names and icons
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

  // Return the weather info for the given code, or "Unknown" if not found
  return weatherInfo[weatherCode] || { name: "Unknown", icon: "❓" };
}
