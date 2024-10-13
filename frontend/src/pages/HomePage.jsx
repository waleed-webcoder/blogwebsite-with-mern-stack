import React from "react";
import { FaArrowRight, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to Our Blog
          </h1>
          <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Dive into the latest posts, tutorials, and insights across tech, lifestyle, and business!
          </p>
          <Link to="/Feed" className="mt-8 bg-white text-blue-600 hover:text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center">
            Start Reading <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBlb3BsZXxlbnwwfHx8fDE2NDY0NTUxMTU&ixlib=rb-1.2.1&q=80&w=400"
          alt="Blog hero"
          className="absolute inset-0 object-cover w-full h-full opacity-10"
        />
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <img
                src="https://www.mumways.com/wp-content/uploads/2017/11/IMG_3057-848x461.jpg"
                alt="Blog"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-6">How to Start a Blog</h3>
              <p className="text-gray-600 mt-4">Discover the steps to kickstart your blogging journey...</p>
              <button className="text-blue-600 hover:underline mt-4">Read More</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <img
                src="https://images.stockcake.com/public/1/0/9/1099277d-a8af-468a-a1fc-d91fd5088475_large/cozy-writing-moment-stockcake.jpg"
                alt="Blog"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-6">10 Tips for Better Writing</h3>
              <p className="text-gray-600 mt-4">Enhance your writing skills with these expert tips...</p>
              <button className="text-blue-600 hover:underline mt-4">Read More</button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <img
                src="https://images.unsplash.com/photo-1519682577862-22b62b24e493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBlb3BsZXxlbnwwfHx8fDE2NDY0NTUxMTU&ixlib=rb-1.2.1&q=80&w=400"
                alt="Blog"
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-bold mt-6">Top Business Strategies for 2024</h3>
              <p className="text-gray-600 mt-4">Master the latest strategies to grow your business...</p>
              <button className="text-blue-600 hover:underline mt-4">Read More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-500 text-white rounded-lg p-8 text-center shadow-lg hover:scale-105 transition">
              <h4 className="text-2xl font-bold">Technology</h4>
              <p className="text-gray-200 mt-4">Latest trends in tech and programming.</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-8 text-center shadow-lg hover:scale-105 transition">
              <h4 className="text-2xl font-bold">Lifestyle</h4>
              <p className="text-gray-200 mt-4">Ideas for a balanced and fulfilling life.</p>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-8 text-center shadow-lg hover:scale-105 transition">
              <h4 className="text-2xl font-bold">Business</h4>
              <p className="text-gray-200 mt-4">Innovative tips to take your business forward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About Our Blog</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide insights and practical guides on a variety of topics including technology, business, and lifestyle. Stay connected with us as we explore new trends and ideas that can shape your future!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Blog Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-gray-200">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
