import PropTypes from "prop-types";
import EmotionLogger from "../components/EmotionLogger";
import WeatherInfo from "../components/WeatherInfo";

function Home({ pin, username }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {username}!</h1>
      <WeatherInfo />
      <EmotionLogger pin={pin} />
    </div>
  );
}

Home.propTypes = {
  pin: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Home;
