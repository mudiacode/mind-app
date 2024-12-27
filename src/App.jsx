// Import necessary dependencies and components
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";
import PinSetup from "./components/PinSetup";
import Navigation from "./components/Navigation";
import PinEntry from "./components/PinEntry";
import useLocalStorage from "./hooks/useLocalStorage";
import {
  setLastActiveTimestamp,
  isSessionExpired,
  setAuthStatus,
  getAuthStatus,
} from "./utils/auth";

function App() {
  // State for PIN, username, and authentication
  const [pin, setPin] = useLocalStorage("pin", "");
  const [username, setUsername] = useLocalStorage("username", "");
  const [isPinSet, setIsPinSet] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

  // Effect to check if PIN is set and update last active timestamp
  useEffect(() => {
    setIsPinSet(!!pin && !!username);

    const handleActivity = () => {
      setLastActiveTimestamp();
    };

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Clean up event listeners
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [pin, username]);

  // Effect to check session expiration
  useEffect(() => {
    const checkSession = () => {
      if (isSessionExpired()) {
        setIsAuthenticated(false);
        setAuthStatus(false);
      }
    };

    // Check session every minute
    const intervalId = setInterval(checkSession, 60000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []);

  // Render PinSetup if PIN is not set
  if (!isPinSet) {
    return <PinSetup setPin={setPin} setUsername={setUsername} />;
  }

  // Render PinEntry if not authenticated
  if (!isAuthenticated) {
    return <PinEntry pin={pin} setIsAuthenticated={setIsAuthenticated} />;
  }

  // Main app structure
  return (
    <Router>
      <div className="min-h-screen bg-latte-base text-latte-text">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home pin={pin} username={username} />} />
            <Route path="/history" element={<History pin={pin} />} />
            <Route
              path="/settings"
              element={
                <Settings
                  pin={pin}
                  setPin={setPin}
                  username={username}
                  setUsername={setUsername}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
