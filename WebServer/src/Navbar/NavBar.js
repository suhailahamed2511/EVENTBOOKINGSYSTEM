import React from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import EventLogo from "../Event.png";
import "./Navbar.css";

function NavBar() {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };


  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={EventLogo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl text-orange-500 font-semibold whitespace-nowrap dark:text-white">
            Event Booking System
          </span>
        </a>
        <div className="div_desktop">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Event List
              </Link>
            </li>
            <li>
              <Link
                to="/book"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Book Event
              </Link>
            </li>
          </ul>
        </div>

        <div className="div_mobile">
          <div
            className={`div_mobile nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Event List
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/book"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Book Event
                </NavLink>
              </li>


            </ul>
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-orange-400"></div>
        <div className="flex-grow border-t border-orange-400"></div>
      </div>
    </nav>
  );
}

export default NavBar;
