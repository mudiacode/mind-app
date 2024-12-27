// Import necessary dependencies and components
import PropTypes from "prop-types";
import EntryList from "../components/EntryList";

function History({ pin }) {
  return (
    <div>
      {/* Page title */}
      <h1 className="text-3xl text-center font-bold mb-6 text-latte-mauve">
        Entry History
      </h1>

      {/* List of entries */}
      <EntryList pin={pin} />
    </div>
  );
}

// PropTypes for type checking
History.propTypes = {
  pin: PropTypes.string.isRequired,
};

export default History;
