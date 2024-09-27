import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide">
          OZONE Milk Zone
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-base md:text-lg font-medium">
          <li>
            <Link
              to="/"
              className="text-white hover:text-indigo-300 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-indigo-300 transition duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-indigo-300 transition duration-300 ease-in-out"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white border border-white py-1 px-4 rounded-full hover:bg-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <ul className="flex flex-col space-y-4 text-base md:text-lg font-medium">
          <li>
            <Link
              to="/"
              className="text-white block py-2 px-4 hover:bg-indigo-700 rounded transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white block py-2 px-4 hover:bg-indigo-700 rounded transition duration-300 ease-in-out"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white block py-2 px-4 hover:bg-indigo-700 rounded transition duration-300 ease-in-out"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="text-white border border-white py-2 px-4 rounded-full hover:bg-indigo-500 hover:border-indigo-500 transition duration-300 ease-in-out text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
