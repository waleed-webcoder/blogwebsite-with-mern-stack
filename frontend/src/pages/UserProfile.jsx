import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from '../pages/ThemeContext'; // Import ThemeContext
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
const UserProfile = () => {
  const navigate=useNavigate();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userprofile", {
          withCredentials: true,
        });
        setUserData(response.data.data); // Adjust for backend response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No user data available</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6 flex justify-center`}>
      <div className={`max-w-4xl w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        {/* Profile Header */}
        <div className={`flex flex-col items-center justify-center p-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white`}>
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={`http://localhost:3000/${userData.pic}` || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <h1 className="text-3xl font-semibold mt-4">{userData.name}</h1>
          <p className="text-gray-200 mt-2">Blogger & Content Creator</p>
          <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-blue-300"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-blue-300"><FaLinkedin size={24} /></a>
              <a href="#" className="hover:text-blue-300"><FaFacebook size={24} /></a>
            </div>
        </div>

        {/* User's Posts */}
        <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'}`}>
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.posts.length > 0 ? (
              userData.posts.map((post, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                >
                  {/* Post Image */}
                  <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src={post.imageurl ? `http://localhost:3000/${post.imageurl}` : "https://via.placeholder.com/600x400"}
                      alt={post.title}
                    />
                  </div>
                  {/* Post Content */}
                  <h3 className="text-xl font-semibold text-indigo-600">{post.title || "Untitled Post"}</h3>
                  <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.description ? post.description.slice(0, 50) : "No description available"}...
                  </p>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{post.date || "Date not available"}</p>
                  <button onClick={()=>{navigate(`/post/${post._id}`)}} className="mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Read More
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
