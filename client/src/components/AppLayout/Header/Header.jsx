import { useAuthentication } from "../../../store/Authentication";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, authorizedUser } = useAuthentication();

  return (
    <header>
      <div className="logo ">
        <p>QUEST</p>
      </div>
      <nav className="nav">
        <ul className="index">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "notactive")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "notactive")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/course"
              className={({ isActive }) => (isActive ? "active" : "notactive")}
            >
              Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "notactive")}
            >
              Contact
            </NavLink>
          </li>

          {
            authorizedUser.isAdmin && 
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "active" : "notactive"
                }
              >
                Admin
              </NavLink>
            </li>
          }

          {isLoggedIn ? (
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive ? "active" : "notactive"
                }
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "active" : "notactive"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "active" : "notactive"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
