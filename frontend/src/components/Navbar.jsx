import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-3xl font-extrabold tracking-widest flex items-center space-x-2">
          <i className="fas fa-th-large"></i> {/* FontAwesome icon */}
          <span>Blogify</span>
        </h1>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
            <i className="fas fa-home mr-2"></i> {/* FontAwesome icon */}
            Home
          </Link>
          <Link to="/dashboard" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
            <i className="fas fa-th-large mr-2"></i> {/* FontAwesome icon */}
            Dashboard
          </Link>
          <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
            <i className="fas fa-user-circle mr-2"></i> {/* FontAwesome icon */}
            Profile
          </Link>
          <Link to="/login" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
            <i className="fas fa-sign-in-alt mr-2"></i> {/* FontAwesome icon */}
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> {/* FontAwesome icon */}
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <Link to="/" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
          <i className="fas fa-home mr-2"></i> {/* FontAwesome icon */}
          Home
        </Link>
        <Link to="/dashboard" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
          <i className="fas fa-th-large mr-2"></i> {/* FontAwesome icon */}
          Dashboard
        </Link>
        <Link to="/profile" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
          <i className="fas fa-user-circle mr-2"></i> {/* FontAwesome icon */}
          Profile
        </Link>
        <Link to="/login" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
          <i className="fas fa-sign-in-alt mr-2"></i> {/* FontAwesome icon */}
          Login
        </Link>
        <Link
          to="/signup"
          className="block bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300 mt-2"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> {/* FontAwesome icon */}
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
