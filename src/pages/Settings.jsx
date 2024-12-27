import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import { setLastActiveTimestamp, setAuthStatus } from "../utils/auth";

function Settings({ pin, setPin, setUsername }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");
  const [entries] = useLocalStorage("entries", []);

  useEffect(() => {
    setLastActiveTimestamp();
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === pin) {
      setIsAuthenticated(true);
      setEnteredPin("");
      setError("");
    } else {
      setError("Incorrect PIN");
    }
  };

  const handleChangeUsername = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setNewUsername("");
      setError("Username changed successfully");
      setLastActiveTimestamp();
    } else {
      setError("Username cannot be empty");
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setError("PIN must be 4 digits");
    } else if (newPin !== confirmPin) {
      setError("PINs do not match");
    } else {
      setPin(newPin);
      setNewPin("");
      setConfirmPin("");
      setError("PIN changed successfully");
      setAuthStatus(false); // Require re-authentication after PIN change
      setLastActiveTimestamp();
    }
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(entries));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "mind_app_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setLastActiveTimestamp();
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 bg-latte-base text-latte-text">
        <h1 className="text-3xl text-center font-bold mb-6 text-latte-mauve">
          Settings
        </h1>
        <form onSubmit={handlePinSubmit} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-latte-lavender">
            Enter PIN to Access Settings
          </h2>
          <input
            type="password"
            placeholder="Enter your PIN"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-latte-surface0 text-latte-text"
            maxLength="4"
          />
          <button
            type="submit"
            className="w-full bg-latte-mauve text-latte-base p-2 rounded hover:bg-latte-pink transition-colors"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-latte-red mb-4">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-latte-base text-latte-text">
      <h1 className="text-3xl text-center font-bold mb-6 text-latte-mauve">
        Settings
      </h1>

      <form onSubmit={handleChangeUsername} className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-latte-lavender">
          Change Username
        </h2>
        <input
          type="text"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-latte-surface0 text-latte-text"
        />
        <button
          type="submit"
          className="w-full bg-latte-mauve text-latte-base p-2 rounded hover:bg-latte-pink transition-colors"
        >
          Change Username
        </button>
      </form>

      <form onSubmit={handleChangePin} className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-latte-lavender">
          Change PIN
        </h2>
        <input
          type="password"
          placeholder="Enter new 4-digit PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-latte-surface0 text-latte-text"
          maxLength="4"
        />
        <input
          type="password"
          placeholder="Confirm new PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-latte-surface0 text-latte-text"
          maxLength="4"
        />
        <button
          type="submit"
          className="w-full bg-latte-mauve text-latte-base p-2 rounded hover:bg-latte-pink transition-colors"
        >
          Change PIN
        </button>
      </form>

      {error && <p className="text-latte-red mb-4">{error}</p>}

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-latte-lavender">
          Export Data
        </h2>
        <button
          onClick={handleExportData}
          className="w-full bg-latte-green text-latte-base p-2 rounded hover:bg-latte-teal transition-colors"
        >
          Export Data
        </button>
      </div>
    </div>
  );
}

Settings.propTypes = {
  pin: PropTypes.string.isRequired,
  setPin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default Settings;
