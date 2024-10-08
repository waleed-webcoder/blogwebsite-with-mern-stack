import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManagePosts = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [postdata, setpostdata] = useState(null); // State for posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/managepost", {
          withCredentials: true, // Ensure cookies are sent
        });
        setpostdata(response.data.data); // Adjusted to use `response.data.data` based on your backend structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!postdata) {
    return <div>No posts available</div>;
  }

  // Update search query when input changes
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Delete post function
  const handledelete = async (postid) => {
    const confirmation = await window.confirm("Do you want to delete this post?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/managepost/deletepost/${postid}`);
        alert("Post deleted successfully");
        setpostdata((prevData) => ({
          ...prevData,
          posts: prevData.posts.filter((post) => post._id !== postid),
        })); // Update postdata after deletion
      } catch (error) {
        console.log("Error deleting post", error);
        alert("Post could not be deleted");
      }
    }
  };

  // Filter posts based on search query
  const filteredPosts = postdata.posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-5">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Your Posts</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Post Table */}
      <div className="overflow-x-auto">
        {filteredPosts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600">Post Title</th>
                <th className="py-2 px-4 text-left text-gray-600">Date</th>
                <th className="py-2 px-4 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{post.title}</td> {/* Display post title */}
                  <td className="py-2 px-4">{post.date}</td>   {/* Display post date */}
                  <td className="py-2 px-4 text-center">
                    <Link to={`/editpost/${post._id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg mr-2">
                      Edit
                    </Link>
                    <button onClick={() => handledelete(post._id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No posts match your search.!</p>
        )}
      </div>

      {/* Additional Content for a Beautiful UI */}
      <div className="mt-8 p-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Admin Tips</h2>
        <p className="mb-4">
          Stay updated with your post performanc and  edit them regularly, and keep your readers engaged with fresh content. You can search through the posts using the search bar for a seamless experience.
        </p>
        <img src="https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-300x170.png" alt="Manage your posts" className="rounded-lg shadow-lg mx-auto" />
      </div>
    </div>
  );
};

export default ManagePosts;
