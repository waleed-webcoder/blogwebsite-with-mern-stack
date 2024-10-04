import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiSave } from 'react-icons/fi'; // Importing icons
import { MdTitle, MdDateRange } from 'react-icons/md'; // Importing icons for title and date

const EditPost = () => {
  const { id } = useParams(); // Get the post id from URL params
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    date: '',
    description: '',
    imageurl:''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(post.imageurl);

  useEffect(() => {
    // Fetch post data for the specific ID
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/managepost/editpost/${id}`);
        setPost(response.data); // Set post data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  // Handle form submit
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/managepost/${id}`, post); // Send PUT request to update post
      alert('Post updated successfully');
      navigate('/managepost'); // Redirect back to manage post page
    } catch (error) {
      console.log('Error updating post', error);
      alert('Post could not be updated');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center py-10 px-5">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiEdit className="text-indigo-600" /> Edit Your Post
        </h2>

        <form onSubmit={handleSaveChanges}>
          {/* Post Title Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MdTitle className="text-indigo-500" /> Post Title
            </label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the post title"
            />
          </div>

          {/* Post Date Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MdDateRange className="text-indigo-500" /> Post Date
            </label>
            <input
              type="date"
              name="date"
              value={post.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Post Content Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="6"
              placeholder="Enter your post content here..."
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2"
          >
            <FiSave /> Save Changes
          </button>
        </form>

        {/* Image for design enhancement */}
        <div className="mt-8 text-center">
  {post.imageurl ? (
    <img
      src={`http://localhost:3000/${post.imageurl}`}
      alt="Post illustration"
      className="mx-auto rounded-lg shadow-lg  max-w-xs"
      
    />
  ) : (
    <p className="text-gray-500">No image available</p>
  )}
</div>

        {/* Motivational Tips Section */}
        <div className="mt-8 p-5 bg-purple-600 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Pro Tip</h2>
          <p>Keep your posts engaging and updated to ensure your audience stays interested. You can always come back to make improvements!</p>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
