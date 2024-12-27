import { useState } from "react";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import useEncryption from "../hooks/useEncryption";
import { getWeather, getWeatherInfo } from "../utils/weather";

import PropTypes from "prop-types";

function EmotionLogger({ pin }) {
  const [emotion, setEmotion] = useState("");
  const [comment, setComment] = useState("");
  const [entries, setEntries] = useLocalStorage("entries", []);
  const { encrypt } = useEncryption(pin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeather(latitude, longitude);
      const { name, icon } = getWeatherInfo(weatherData.weatherCode);

      const newEntry = {
        date: new Date().toISOString(),
        emotion,
        comment,
        weather: `${name} ${icon}, ${Math.round(weatherData.temperature)}°C`,
      };
      const encryptedEntry = encrypt(JSON.stringify(newEntry));
      setEntries([encryptedEntry, ...entries]);
      setEmotion("");
      setComment("");
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-latte-mantle p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-latte-lavender">
        How are you feeling?
      </h2>
      <div className="flex justify-around mb-4">
        <button
          type="button"
          onClick={() => setEmotion("happy")}
          className={`p-2 rounded-full ${emotion === "happy" ? "bg-latte-yellow" : "bg-latte-surface0"}`}
        >
          <FaSmile className="h-10 w-10 text-latte-text" />
        </button>
        <button
          type="button"
          onClick={() => setEmotion("neutral")}
          className={`p-2 rounded-full ${emotion === "neutral" ? "bg-latte-blue" : "bg-latte-surface0"}`}
        >
          <FaMeh className="h-10 w-10 text-latte-text" />
        </button>
        <button
          type="button"
          onClick={() => setEmotion("sad")}
          className={`p-2 rounded-full ${emotion === "sad" ? "bg-latte-mauve" : "bg-latte-surface0"}`}
        >
          <FaFrown className="h-10 w-10 text-latte-text" />
        </button>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment (optional)"
        className="w-full p-2 mb-4 border rounded bg-latte-surface0 text-latte-text"
        rows="3"
      />
      <button
        type="submit"
        className="w-full bg-latte-mauve text-latte-base p-2 rounded hover:bg-latte-pink transition-colors"
      >
        Log Emotion
      </button>
    </form>
  );
}

EmotionLogger.propTypes = {
  pin: PropTypes.string.isRequired,
};

export default EmotionLogger;
