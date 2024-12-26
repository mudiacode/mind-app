import { useState } from "react";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import useLocalStorage from "../hooks/useLocalStorage";
import useEncryption from "../hooks/useEncryption";
import { getWeather } from "../utils/weather";
import PropTypes from "prop-types";

function EmotionLogger({ pin }) {
  const [emotion, setEmotion] = useState("");
  const [comment, setComment] = useState("");
  const [entries, setEntries] = useLocalStorage("entries", []);
  const { encrypt } = useEncryption(pin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const weather = await getWeather();
    const newEntry = {
      date: new Date().toISOString(),
      emotion,
      comment,
      weather,
    };
    const encryptedEntry = encrypt(JSON.stringify(newEntry));
    setEntries([encryptedEntry, ...entries]);
    setEmotion("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">How are you feeling?</h2>
      <div className="flex justify-around mb-4">
        <button
          type="button"
          onClick={() => setEmotion("happy")}
          className={`p-2 rounded-full ${emotion === "happy" ? "bg-yellow-200" : "bg-gray-200"}`}
        >
          <FaSmile className="h-10 w-10 text-yellow-500" />
        </button>
        <button
          type="button"
          onClick={() => setEmotion("neutral")}
          className={`p-2 rounded-full ${emotion === "neutral" ? "bg-gray-300" : "bg-gray-200"}`}
        >
          <FaMeh className="h-10 w-10 text-gray-500" />
        </button>
        <button
          type="button"
          onClick={() => setEmotion("sad")}
          className={`p-2 rounded-full ${emotion === "sad" ? "bg-blue-200" : "bg-gray-200"}`}
        >
          <FaFrown className="h-10 w-10 text-blue-500" />
        </button>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment (optional)"
        className="w-full p-2 mb-4 border rounded"
        rows="3"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Log Emotion
      </button>
    </form>
  );
}

EmotionLogger.propTypes = {
  pin: PropTypes.func.isRequired,
};

export default EmotionLogger;
