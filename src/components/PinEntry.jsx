import { useState } from "react";
import PropTypes from "prop-types";
import { setAuthStatus, setLastActiveTimestamp } from "../utils/auth";

function PinEntry({ pin, setIsAuthenticated }) {
  const [enteredPin, setEnteredPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === pin) {
      setIsAuthenticated(true);
      setAuthStatus(true);
      setLastActiveTimestamp();
      setEnteredPin("");
    } else {
      setError("Incorrect PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Enter PIN to Access App</h2>
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          placeholder="Enter your PIN"
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

PinEntry.propTypes = {
  pin: PropTypes.string.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default PinEntry;
