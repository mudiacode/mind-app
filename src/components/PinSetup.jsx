import { useState } from "react";
import PropTypes from "prop-types";

function PinSetup({ setPin, setUsername }) {
  // State for new PIN, confirmation PIN, username, and error message
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate PIN: must be 4 digits
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setError("PIN must be 4 digits");
      // Ensure PINs match
    } else if (newPin !== confirmPin) {
      setError("PINs do not match");
      // Ensure username is not empty
    } else if (!name.trim()) {
      setError("Please enter a username");
      // If all validations pass, set the PIN and username
    } else {
      setPin(newPin);
      setUsername(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
        {/* Username input */}
        <input
          type="text"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {/* New PIN input */}
        <input
          type="password"
          placeholder="Enter 4-digit PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        {/* Confirm PIN input */}
        <input
          type="password"
          placeholder="Confirm PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        {/* Error message display */}
        {error && <p className="text-latte-red mb-4">{error}</p>}
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-latte-blue text-white p-2 rounded"
        >
          Set Up Account
        </button>
      </form>
    </div>
  );
}

// PropTypes for type checking
PinSetup.propTypes = {
  setPin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default PinSetup;
