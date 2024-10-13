// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Cookies from "js-cookie";

// const Navbar = ({ loginState }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("token"); // Ensure token name is correct
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [loginState]); // Trigger useEffect when loginState changes

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

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
//               <Link to="/dashboard" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-th-large mr-2"></i> Dashboard
//               </Link>
//               <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-user-circle mr-2"></i> Profile
//               </Link>
//               <button 
//                 onClick={() => {
//                   const confirm=window.confirm("do you want to logout?")
//                   if(confirm){
//                     Cookies.remove("token"); // Remove the token on logout
//                     setIsAuthenticated(false); // Update the state
//                   }
//                 }} 
//                 className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300"
//               >
//                 <i className="fas fa-sign-out-alt mr-2"></i> Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
//                 <i className="fas fa-sign-in-alt mr-2"></i> Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300"
//               >
//                 <i className="fas fa-sign-out-alt mr-2"></i> Sign Up
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-white focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
//         <Link to="/" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
//           <i className="fas fa-home mr-2"></i> Home
//         </Link>
//         {isAuthenticated ? (
//           <>
//             <Link to="/dashboard" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
//               <i className="fas fa-th-large mr-2"></i> Dashboard
//             </Link>
//             <Link to="/profile" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
//               <i className="fas fa-user-circle mr-2"></i> Profile
//             </Link>
//             <button 
//               onClick={() => {
//                 Cookies.remove("token");
//                 setIsAuthenticated(false);
//               }} 
//               className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300"
//             >
//               <i className="fas fa-sign-out-alt mr-2"></i> Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="block text-white text-lg font-medium py-2 hover:text-indigo-200 transition duration-300">
//               <i className="fas fa-sign-in-alt mr-2"></i> Login
//             </Link>
//             <Link
//               to="/signup"
//               className="block bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300 mt-2"
//             >
//               <i className="fas fa-sign-out-alt mr-2"></i> Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = ({ loginState, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);  // User is authenticated if token exists
    } else {
      setIsAuthenticated(false); // Otherwise, set authentication to false
    }
  }, [loginState]); // Re-run this effect when loginState changes

  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to logout?');
    if (confirmLogout) {
      Cookies.remove('token');
      setIsAuthenticated(false);
      onLogout();  // Call the parent logout handler
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-lg">
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
              <Link to="/dashboard" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-th-large mr-2"></i> Dashboard
              </Link>
              <Link to="/profile" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-user-circle mr-2"></i> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white text-lg font-medium hover:text-indigo-200 transition duration-300">
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold shadow hover:bg-indigo-100 transition duration-300"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
