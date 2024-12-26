import { format } from "date-fns";
import useLocalStorage from "../hooks/useLocalStorage";
import useEncryption from "../hooks/useEncryption";
import PropTypes from "prop-types";

function EntryList({ pin }) {
  const [entries] = useLocalStorage("entries", []);
  const { decrypt } = useEncryption(pin);

  const decryptedEntries = entries.map((entry) => JSON.parse(decrypt(entry)));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Entries</h2>
      {decryptedEntries.map((entry, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <p className="font-bold">{format(new Date(entry.date), "PPpp")}</p>
          <p>Emotion: {entry.emotion}</p>
          <p>Weather: {entry.weather}</p>
          {entry.comment && <p>Comment: {entry.comment}</p>}
        </div>
      ))}
    </div>
  );
}

EntryList.propTypes = {
  pin: PropTypes.func.isRequired,
};

export default EntryList;
