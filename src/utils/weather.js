export async function getWeather() {
  const weathers = ["Clear sky, 15°C", "Cloudy, 20°C", "Rainy, 10°C"];
  return weathers[Math.floor(Math.random() * weathers.length)];
}
