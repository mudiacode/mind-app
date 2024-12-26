import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/history" className="text-white hover:text-gray-200">
            History
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-white hover:text-gray-200">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
