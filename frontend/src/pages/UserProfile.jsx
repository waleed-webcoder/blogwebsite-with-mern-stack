import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userprofile", {
          withCredentials: true,
        });
        setUserData(response.data.data); // Adjusted for backend response
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
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">No user data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={`http://localhost:3000/${userData.pic}` || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
          <h1 className="text-3xl font-semibold mt-4">{userData.name}</h1>
          <p className="text-gray-200 mt-2">Blogger & Content Creator</p>
        </div>

        {/* User's Posts */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.posts.length > 0 ? (
              userData.posts.map((post, index) => (
                console.log(post.imageurl),
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                  <p className="text-gray-600 mt-2">
                    {post.description ? post.description.slice(0, 100) : "No description available"}...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{post.date || "Date not available"}</p>
                  <button className="mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
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
