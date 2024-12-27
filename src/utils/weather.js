import axios from "axios";

export async function getWeather(latitude, longitude) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,weathercode`;
    const response = await axios.get(url);
    const { current_weather, hourly } = response.data;

    // Get the current hour's index
    const currentHourIndex = hourly.time.findIndex(
      (time) => new Date(time).getHours() === new Date().getHours(),
    );

    return {
      temperature: current_weather.temperature,
      weatherCode: current_weather.weathercode,
      windSpeed: current_weather.windspeed,
      precipitation: hourly.precipitation[currentHourIndex],
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export function getWeatherDescription(weatherCode) {
  // WMO Weather interpretation codes (WW)
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    95: "Thunderstorm",
    // Add more codes as needed
  };

  return weatherCodes[weatherCode] || "Unknown";
}
