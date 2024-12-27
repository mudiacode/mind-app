// Import necessary dependencies and components
import PropTypes from "prop-types";
import EmotionLogger from "../components/EmotionLogger";
import WeatherInfo from "../components/WeatherInfo";

function Home({ pin, username }) {
  return (
    <div>
      {/* Welcome message */}
      <h1 className="text-3xl text-center font-bold mb-6 text-latte-mauve">
        Welcome, {username}!
      </h1>

      {/* Weather information component */}
      <WeatherInfo />

      {/* Emotion logging component */}
      <EmotionLogger pin={pin} />
    </div>
  );
}

// PropTypes for type checking
Home.propTypes = {
  pin: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Home;
