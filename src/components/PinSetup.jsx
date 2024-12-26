import { useState } from "react";

function PinSetup({ setPin }) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setError("PIN must be 4 digits");
    } else if (newPin !== confirmPin) {
      setError("PINs do not match");
    } else {
      setPin(newPin);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Set up PIN</h2>
        <input
          type="password"
          placeholder="Enter 4-digit PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        <input
          type="password"
          placeholder="Confirm PIN"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          maxLength="4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Set PIN
        </button>
      </form>
    </div>
  );
}

export default PinSetup;
