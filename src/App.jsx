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
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [pin, setPin] = useLocalStorage("pin", "");
  const [isPinSet, setIsPinSet] = useState(false);

  useEffect(() => {
    setIsPinSet(!!pin);
  }, [pin]);

  if (!isPinSet) {
    return <PinSetup setPin={setPin} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home pin={pin} />} />
            <Route path="/history" element={<History pin={pin} />} />
            <Route
              path="/settings"
              element={<Settings pin={pin} setPin={setPin} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
