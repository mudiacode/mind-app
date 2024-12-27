import { useEffect } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import useEncryption from "../hooks/useEncryption";

function EntryList({ pin }) {
  // Use custom hook to store entries in local storage
  const [entries, setEntries] = useLocalStorage("entries", []);
  // Use custom encryption hook to decrypt entries
  const { decrypt } = useEncryption(pin);

  useEffect(() => {
    // Clean up corrupted entries on component mount and when entries change
    const cleanedEntries = entries.filter((entry) => {
      try {
        // Attempt to decrypt and parse each entry
        const decrypted = decrypt(entry);
        JSON.parse(decrypted);
        return true;
      } catch (error) {
        console.error("Removing corrupted entry:", error);
        return false;
      }
    });

    // Update entries if any corrupted entries were removed
    if (cleanedEntries.length !== entries.length) {
      setEntries(cleanedEntries);
    }
  }, [entries, decrypt, setEntries]);

  // Decrypt all entries and filter out any that fail to decrypt
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
    <div className="bg-latte-mantle p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-latte-lavender">
        Your Entries
      </h2>
      {decryptedEntries.length === 0 ? (
        // Display message if no entries exist
        <p className="text-latte-subtext0">No entries yet.</p>
      ) : (
        // Map through and display all decrypted entries
        decryptedEntries.map((entry, index) => (
          <div
            key={index}
            className="mb-4 p-4 border rounded bg-latte-surface0"
          >
            <p className="font-bold text-latte-mauve">
              {format(new Date(entry.date), "PPpp")}
            </p>
            <p className="text-latte-text">Emotion: {entry.emotion}</p>
            <p className="text-latte-text">Weather: {entry.weather}</p>
            {entry.comment && (
              <p className="text-latte-subtext1">Comment: {entry.comment}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// PropTypes for type checking
EntryList.propTypes = {
  pin: PropTypes.string.isRequired,
};

export default EntryList;
