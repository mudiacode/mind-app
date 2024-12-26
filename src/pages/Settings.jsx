import { useState } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

function Settings({ setPin, setUsername }) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");
  const [entries] = useLocalStorage("entries", []);

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
    }
  };

  const handleChangeUsername = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setNewUsername("");
      setError("Username changed successfully");
    } else {
      setError("Username cannot be empty");
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
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleChangeUsername} className="mb-8">
        <h2 className="text-xl font-bold mb-4">Change Username</h2>
        <input
          type="text"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Change Username
        </button>
      </form>
      <form onSubmit={handleChangePin} className="mb-8">
        <h2 className="text-xl font-bold mb-4">Change PIN</h2>
        <input
          type="password"
          placeholder="Enter new 4-digit PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        <input
          type="password"
          placeholder="Confirm new PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Change PIN
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <h2 className="text-xl font-bold mb-4">Export Data</h2>
        <button
          onClick={handleExportData}
          className="w-full bg-green-500 text-white p-2 rounded"
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
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
};

export default Settings;
