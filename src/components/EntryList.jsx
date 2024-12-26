import { format } from "date-fns";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import useEncryption from "../hooks/useEncryption";

function EntryList({ pin }) {
  const [entries] = useLocalStorage("entries", []);
  const { decrypt } = useEncryption(pin);

  const decryptedEntries = entries
    .map((entry) => {
      try {
        return JSON.parse(decrypt(entry));
      } catch (error) {
        console.error("Failed to decrypt entry:", error);
        return null;
      }
    })
    .filter(Boolean);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Entries</h2>
      {decryptedEntries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        decryptedEntries.map((entry, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p className="font-bold">{format(new Date(entry.date), "PPpp")}</p>
            <p>Emotion: {entry.emotion}</p>
            <p>Weather: {entry.weather}</p>
            {entry.comment && <p>Comment: {entry.comment}</p>}
          </div>
        ))
      )}
    </div>
  );
}

EntryList.propTypes = {
  pin: PropTypes.string.isRequired,
};

export default EntryList;
