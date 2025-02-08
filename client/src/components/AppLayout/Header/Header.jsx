import { useAuthentication } from "../../../store/Authentication";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
  const { isLoggedIn, authorizedUser } = useAuthentication();
  const [hamburger, setHamburger] = useState(false);

  const handleHamburger = () => {
    setHamburger((prev) => !prev);
  };

  return (
    <header>
      <div className="logo ">
        <p>QUEST</p>
      </div>
      <nav className={hamburger ? "ham-nav" : "nav"}>
        <ul className={hamburger ? "index" : "index none"}>
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

          {authorizedUser.isAdmin && (
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
          )}

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
      <div className="ham-menu">
        {hamburger ? (
          <RxCross1 onClick={handleHamburger} size={35} />
        ) : (
          <AiOutlineMenu onClick={handleHamburger} size={35} />
        )}
      </div>
    </header>
  );
};

export default Header;
