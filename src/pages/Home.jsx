import EmotionLogger from "../components/EmotionLogger";
import WeatherInfo from "../components/WeatherInfo";
import PropTypes from "prop-types";

function Home({ pin }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mind App</h1>
      <WeatherInfo />
      <EmotionLogger pin={pin} />
    </div>
  );
}

Home.propTypes = {
  pin: PropTypes.func.isRequired,
};

export default Home;
