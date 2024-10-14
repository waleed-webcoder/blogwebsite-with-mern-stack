// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AllPosts = () => {
//   const [postdata, setpostdata] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // Search query state
//   const [selectedCategory, setSelectedCategory] = useState("All"); // Category filter state

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/feed", {
//           withCredentials: true,
//         });
//         setpostdata(response.data.postdata || []); // Ensure empty array if no posts
//       } catch (error) {
//         console.error("Error in fetching posts:", error);
//         alert("Error in fetching posts at this time");
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Filter posts based on search and category
//   const filteredPosts = postdata.filter((post) => {
//     const matchesSearch = post.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || post.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
//         <div className="container mx-auto text-center">
//           <h1 className="text-5xl font-bold">Discover All Posts</h1>
//           <p className="text-xl mt-4">
//             Explore insights, stories, and guides from all our users
//           </p>
//         </div>
//       </section>

//       {/* Search and Filter */}
//       <section className="container mx-auto py-12 px-6">
//         <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-6 lg:space-y-0">
//           <input
//             type="text"
//             placeholder="Search posts by title"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full lg:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="All">All Categories</option>
//             <option value="Technology">Technology</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Business">Business</option>
//           </select>
//         </div>

//         {/* Displaying Posts */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.length > 0 ? (
//             filteredPosts.map((post) => (
//               <div
//                 key={post._id} // Assuming MongoDB, _id is the default key
//                 className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
//               >
//                 <img
//                   src={`http://localhost:3000/${post.imageurl}`}
//                   alt={post.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-2">{post.title}</h3>
//                   <p className="text-gray-700 mb-6">
//     {post.description} {/* Assuming 'description' contains the detailed post content */}
//   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     By {post.user.name} |{" "}
//                     {new Date(post.date).toLocaleDateString()}
//                   </p>
                  
//                   <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 text-lg">No posts found.</p>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-indigo-600 text-white py-6 mt-20">
//         <div className="container mx-auto px-6 text-center">
//           <p>&copy; 2024 Blog Platform. All rights reserved.</p>
//           <div className="flex justify-center space-x-4 mt-4">
//             <a href="#" className="hover:underline">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:underline">
//               Terms of Service
//             </a>
//             <a href="#" className="hover:underline">
//               Contact Us
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AllPosts;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from '../pages/ThemeContext'; // Import your ThemeContext

const AllPosts = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [postdata, setpostdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Category filter state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/feed", {
          withCredentials: true,
        });
        setpostdata(response.data.postdata || []); // Ensure empty array if no posts
      } catch (error) {
        console.error("Error in fetching posts:", error);
        alert("Error in fetching posts at this time");
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search and category
  const filteredPosts = postdata.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Hero Section */}
      <section className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20`}>
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Discover All Posts</h1>
          <p className="text-xl mt-4">
            Explore insights, stories, and guides from all our users
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className={`container mx-auto py-12 px-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-6 lg:space-y-0">
          <input
            type="text"
            placeholder="Search posts by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full lg:w-1/3 px-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full lg:w-1/4 px-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Displaying Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post._id} // Assuming MongoDB, _id is the default key
                className={`shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <img
                  src={`http://localhost:3000/${post.imageurl}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.description} {/* Assuming 'description' contains the detailed post content */}
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                    By {post.user.name} |{" "}
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No posts found.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-indigo-600 text-white py-6 mt-20`}>
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Blog Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AllPosts;
