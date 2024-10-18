import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext'; // Import the useAuth hook
import { ThemeContext } from '../pages/ThemeContext'; // Import ThemeContext

const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Get the auth state
  const { theme, toggleTheme } = useContext(ThemeContext); // Get theme and toggle function

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu on click
  };

  return (
    <nav className={`p-4 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-extrabold tracking-widest flex items-center space-x-2">
          <i className="fas fa-th-large"></i>
          <span>Blogify</span>
        </h1>
        <button
            onClick={toggleTheme}
            className="text-white text-center text-2xl block md:hidden font-medium hover:text-indigo-200 transition duration-300 focus:outline-none"
          >
            {theme === 'dark' ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        {/* Hamburger menu button for small screens */}
        <button 
          className="md:hidden text-white text-3xl focus:outline-none" 
          onClick={handleMenuToggle}
        >
          <i className="fas fa-bars"></i> {/* Hamburger icon */}
        </button>

        {/* Sliding mobile menu */}
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } fixed top-0 right-0 w-3/4 h-screen bg-gradient-to-r from-purple-600 to-indigo-600 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-start justify-start p-6 space-y-6 z-50`}
        >
          {/* Close button */}
          <button
            className="self-end text-white text-3xl focus:outline-none"
            onClick={handleMenuToggle}
          >
            <i className="fas fa-times"></i> {/* Cross icon */}
          </button>

          {/* Links */}
          <Link
            to="/"
            className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-home mr-2"></i> Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/feed"
                className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-rss mr-2"></i> Feed
              </Link>
              <Link
                to="/dashboard"
                className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-th-large mr-2"></i> Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-circle mr-2"></i> Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/feed"
                className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-rss mr-2"></i> Feed
              </Link>
              <Link
                to="/login"
                className="text-white text-xl font-semibold hover:text-indigo-300 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-6 py-3 rounded-full text-xl font-bold shadow hover:bg-indigo-100 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-user-plus mr-2"></i> Sign Up
              </Link>
            </>
          )}

          {/* Theme Toggle Button */}
          
        </div>

        {/* Normal menu for larger screens */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
            <i className="fas fa-home mr-2"></i> Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/feed" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-rss mr-2"></i> Feed
              </Link>
              <Link to="/dashboard" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-th-large mr-2"></i> Dashboard
              </Link>
              <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-user-circle mr-2"></i> Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/feed" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-rss mr-2"></i> Feed
              </Link>
              <Link to="/login" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <Link to="/signup" className="bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300">
                <i className="fas fa-user-plus mr-2"></i> Sign Up
              </Link>
            </>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300 focus:outline-none"
          >
            {theme === 'dark' ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
