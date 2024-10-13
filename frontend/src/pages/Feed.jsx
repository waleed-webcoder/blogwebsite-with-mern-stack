import React, { useState } from "react";

const AllPosts = () => {
  // Sample data for demonstration
  const allPosts = [
    {
      id: 1,
      title: "Tech Innovations of 2024",
      author: "John Doe",
      category: "Technology",
      image: "https://source.unsplash.com/featured/technology",
      date: "2024-10-10",
      excerpt:
        "Explore the latest innovations in the world of technology that are shaping the future.",
    },
    {
      id: 2,
      title: "10 Tips for a Healthier Lifestyle",
      author: "Jane Smith",
      category: "Lifestyle",
      image: "https://source.unsplash.com/featured/health",
      date: "2024-09-28",
      excerpt: "Discover practical tips to improve your lifestyle and wellbeing.",
    },
    {
      id: 3,
      title: "The Future of Business Automation",
      author: "Michael Roe",
      category: "Business",
      image: "https://source.unsplash.com/featured/business",
      date: "2024-10-01",
      excerpt:
        "Automation is transforming businesses. Learn how it’s driving the next wave of innovation.",
    },
    // Add more posts as needed
  ];

  // State for search, filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on search and category
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Discover All Posts</h1>
          <p className="text-xl mt-4">
            Explore insights, stories, and guides from all our users
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto py-12 px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-6 lg:space-y-0">
          <input
            type="text"
            placeholder="Search posts by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full lg:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    By {post.author} | {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
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
      <footer className="bg-indigo-600 text-white py-6 mt-20">
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
