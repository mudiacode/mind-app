import { Link } from "react-router-dom";

function Navigation() {
  return (
    // Navigation bar with custom background color
    <nav className="bg-latte-crust p-4">
      {/* Unordered list for navigation items */}
      <ul className="flex justify-around">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="text-latte-lavender hover:text-latte-mauve transition-colors"
          >
            Home
          </Link>
        </li>
        {/* History link */}
        <li>
          <Link
            to="/history"
            className="text-latte-lavender hover:text-latte-mauve transition-colors"
          >
            History
          </Link>
        </li>
        {/* Settings link */}
        <li>
          <Link
            to="/settings"
            className="text-latte-lavender hover:text-latte-mauve transition-colors"
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
