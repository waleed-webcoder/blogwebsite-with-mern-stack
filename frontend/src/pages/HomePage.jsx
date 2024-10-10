import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to Our Blog</h1>
          <p className="text-lg md:text-xl mt-4">Explore our latest posts, guides, and tutorials</p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Start Reading
          </button>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post */}
            <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">How to Start a Blog</h3>
              <p className="text-gray-600 mb-4">Learn the essentials of creating a successful blog...</p>
              <button className="text-blue-600 hover:underline">Read More</button>
            </div>
            {/* Repeat for more blog posts */}
            <div className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">10 Tips for Better Writing</h3>
              <p className="text-gray-600 mb-4">Improve your writing skills with these expert tips...</p>
              <button className="text-blue-600 hover:underline">Read More</button>
            </div>
            {/* Example - you can add more as needed */}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category */}
            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold text-blue-600 mb-2">Technology</h4>
              <p className="text-gray-600">Stay updated with the latest in tech.</p>
            </div>
            {/* Category */}
            <div className="bg-green-100 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold text-green-600 mb-2">Lifestyle</h4>
              <p className="text-gray-600">Get tips for a healthy and balanced lifestyle.</p>
            </div>
            {/* Category */}
            <div className="bg-yellow-100 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold text-yellow-600 mb-2">Business</h4>
              <p className="text-gray-600">Insights and tips on growing your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We aim to provide valuable information and resources for those looking to learn about a variety of topics including technology, lifestyle, business, and more. Join us in exploring new ideas, gaining insights, and expanding your knowledge.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Blog Platform. All rights reserved !</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:underline">OUR Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
