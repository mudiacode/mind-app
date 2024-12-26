import EmotionLogger from "../components/EmotionLogger";
import PropTypes from "prop-types";

function Home({ pin }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mind App</h1>
      <EmotionLogger pin={pin} />
    </div>
  );
}

Home.propTypes = {
  pin: PropTypes.func.isRequired,
};

export default Home;
