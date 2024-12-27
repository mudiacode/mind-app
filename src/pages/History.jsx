import PropTypes from "prop-types";
import EntryList from "../components/EntryList";

function History({ pin }) {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-6 text-latte-mauve">
        Entry History
      </h1>
      <EntryList pin={pin} />
    </div>
  );
}

History.propTypes = {
  pin: PropTypes.string.isRequired,
};

export default History;
