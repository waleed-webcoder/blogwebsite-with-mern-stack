import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate=useNavigate();
  const {logout}=useAuth();

  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userprofile", {
          withCredentials: true, // Ensure cookies are sent
        });
        setUserData(response.data.data); // Adjusted to use `response.data.data` based on your backend structure
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setPic(e.target.files[0]);
  };

  const handleLogout = () => {
    const confirm=window.confirm("do you want to logout ?");
    if(confirm){
      logout();
      navigate("/login")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pic", pic);
    try {
      const response = await axios.post("http://localhost:3000/postcreation", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post created successfully", response.data);
      alert("Your post has been created!");
    } catch (error) {
      console.log("Error in creating post", error);
      alert("You must be logged in");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Dashboard Header */}
        <header className="bg-blue-600 py-6 px-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            Welcome, {userData?.name}! 🎉
          </h1>
          <p className="text-white text-lg mt-2">Your personalized dashboard awaits you</p>
        </header>

        {/* Main Dashboard Content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white shadow-md p-4">
            <nav>
              <ul>
                <li className="mb-4">
                  <Link to="/managepost" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg">Manage Posts</Link>
                </li>
                <li className="mb-4">
                  <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg">Profile Settings</Link>
                </li>
                <li className="mb-4">
                  <button onClick={handleLogout} className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg">Logout</button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Dashboard Main Section */}
          <main className="flex-1 bg-white p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Cards for Analytics */}
              <div className="bg-blue-500 text-white p-6 rounded-lg text-center shadow-lg">
                <h3 className="text-2xl font-bold">Your Total Posts</h3>
                <p className="mt-2 text-lg">{userData?.posts?.length || 0}</p>
              </div>
            </div>

            {/* Create Post Section */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
              <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  required
                  placeholder="Post Title"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Write your post here..."
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                  rows="5"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="mb-4">
                  <label htmlFor="pic" className="block mb-2 text-sm font-medium text-gray-700">
                    Post Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="pic"
                      id="pic"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Publish Post
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;