import EntryList from "../components/EntryList";
import PropTypes from "prop-types";

function History({ pin }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Entry History</h1>
      <EntryList pin={pin} />
    </div>
  );
}

History.propTypes = {
  pin: PropTypes.func.isRequired,
};

export default History;
