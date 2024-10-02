import axios from 'axios';
import React, { useState,useEffect } from 'react';
const ManagePosts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [postdata,setpostdata]=useState(null);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      console.log(postdata)
      // Safeguard against missing user data
      if (!postdata) {
        return <div>No user data available</div>;
      }
    
    
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto p-5">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Manage Posts</h1>
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
  {postdata.posts.length > 0 ? (
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left text-gray-600">Post Title</th>
          <th className="py-2 px-4 text-left text-gray-600">Date</th>
          <th className="py-2 px-4 text-center text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {postdata.posts.map((post) => (
          <tr key={post._id} className="border-t border-gray-200">
            <td className="py-2 px-4">{post.title}</td> {/* Access post.title */}
            <td className="py-2 px-4">{post.date}</td>   {/* Access post.date */}
            <td className="py-2 px-4 text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg mr-2">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-lg">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-600">No posts available.</p>
  )}
</div>

      {/* Additional Content for a Beautiful UI */}
      <div className="mt-8 p-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Admin Tips</h2>
        <p className="mb-4">
          Stay updated with your post performance, edit them regularly, and keep your readers engaged with fresh content. You can search through the posts using the search bar for a seamless experience.
        </p>
        <img src="https://via.placeholder.com/150" alt="Manage your posts" className="rounded-lg shadow-lg mx-auto" />
      </div>
    </div>
  );
};

export default ManagePosts;
