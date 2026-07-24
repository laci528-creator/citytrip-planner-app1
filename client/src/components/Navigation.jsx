import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;