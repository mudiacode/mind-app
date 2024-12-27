import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-latte-crust p-4">
      <ul className="flex justify-around">
        <li>
          <Link
            to="/"
            className="text-latte-lavender hover:text-latte-mauve transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className="text-latte-lavender hover:text-latte-mauve transition-colors"
          >
            History
          </Link>
        </li>
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
