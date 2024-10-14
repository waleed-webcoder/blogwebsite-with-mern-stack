// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../pages/AuthContext'; // Import the useAuth hook
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate=useNavigate();
//   const { isAuthenticated, logout } = useAuth(); // Get the auth state and logout function


//   return (
//     <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-white text-3xl font-extrabold tracking-widest flex items-center space-x-2">
//           <i className="fas fa-th-large"></i>
//           <span>Blogify</span>
//         </h1>
//         <div className="hidden md:flex items-center space-x-6">
//           <Link to="/" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//             <i className="fas fa-home mr-2"></i> Home
//           </Link>
//           {isAuthenticated ? (
//             <>
//               <Link to="/feed" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-rss mr-2"></i> Feed
//               </Link>
//               <Link to="/dashboard" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-th-large mr-2"></i> Dashboard
//               </Link>
//               <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-user-circle mr-2"></i> Profile
//               </Link>
              
//             </>
//           ) : (
//             <>
//               <Link to="/feed" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-rss mr-2"></i> Feed
//               </Link>
//               <Link to="/login" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-sign-in-alt mr-2"></i> Login
//               </Link>
//               <Link to="/signup" className="bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300">
//                 <i className="fas fa-user-plus mr-2"></i> Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext'; // Import the useAuth hook
import { ThemeContext } from '../pages/ThemeContext'; // Import ThemeContext

const Navbar = () => {
  const { isAuthenticated } = useAuth(); // Get the auth state
  const { theme, toggleTheme } = useContext(ThemeContext); // Get theme and toggle function

  return (
    <nav className={`p-4 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-500 to-indigo-600'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-3xl font-extrabold tracking-widest flex items-center space-x-2">
          <i className="fas fa-th-large"></i>
          <span>Blogify</span>
        </h1>
        <div className="hidden md:flex items-center space-x-6">
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
              <i className="fas fa-sun"></i> // Sun icon for light mode
            ) : (
              <i className="fas fa-moon"></i> // Moon icon for dark mode
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

