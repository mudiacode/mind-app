import { useState } from "react";
import PropTypes from "prop-types";
import { setAuthStatus, setLastActiveTimestamp } from "../utils/auth";

function PinEntry({ pin, setIsAuthenticated }) {
  // State for entered PIN and error message
  const [enteredPin, setEnteredPin] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === pin) {
      // If PIN is correct, set authentication status and update timestamp
      setIsAuthenticated(true);
      setAuthStatus(true);
      setLastActiveTimestamp();
      setEnteredPin("");
    } else {
      // If PIN is incorrect, show error message
      setError("Incorrect PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-latte-mantle">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-center font-bold mb-4">Enter PIN</h2>
        {/* PIN input field */}
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          placeholder="Enter your PIN"
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        {/* Error message display */}
        {error && <p className="text-latte-red mb-4">{error}</p>}
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-latte-mauve text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// PropTypes for type checking
PinEntry.propTypes = {
  pin: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default PinEntry;
