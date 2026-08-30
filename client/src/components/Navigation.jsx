import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;