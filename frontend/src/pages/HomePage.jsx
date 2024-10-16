import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../pages/ThemeContext'; // Import your ThemeContext

const HomePage = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      {/* Hero Section */}
      <section className={`relative ${theme === 'dark' ? 'bg-gradient-to-r from-purple-700 to-blue-800' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white py-20`}>
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
      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-slate-100'} py-16`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "How to Start a Blog",
                description: "Discover the steps to kickstart your blogging journey...",
                imgSrc: "https://www.mumways.com/wp-content/uploads/2017/11/IMG_3057-848x461.jpg",
              },
              {
                title: "10 Tips for Better Writing",
                description: "Enhance your writing skills with these expert tips...",
                imgSrc: "https://images.stockcake.com/public/1/0/9/1099277d-a8af-468a-a1fc-d91fd5088475_large/cozy-writing-moment-stockcake.jpg",
              },
              {
                title: "Top Business Strategies for 2024",
                description: "Master the latest strategies to grow your business...",
                imgSrc: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHBlb3BsZXxlbnwwfHx8fDE2NDY0NTUxMTU&ixlib=rb-1.2.1&q=80&w=400",
              },
            ].map((blog, index) => (
              <div key={index} className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}`}>
                <img
                  src={blog.imgSrc}
                  alt="Blog"
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-6">{blog.title}</h3>
                <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{blog.description}</p>
                <button className="text-blue-600 hover:underline mt-4">Read More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} py-16`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Technology", description: "Latest trends in tech and programming.", color: "bg-blue-500" },
              { title: "Lifestyle", description: "Ideas for a balanced and fulfilling life.", color: "bg-green-500" },
              { title: "Business", description: "Innovative tips to take your business forward.", color: "bg-yellow-500" },
            ].map((category, index) => (
              <div key={index} className={`${category.color} text-white rounded-lg p-8 text-center shadow-lg hover:scale-105 transition`}>
                <h4 className="text-2xl font-bold">{category.title}</h4>
                <p className="text-gray-200 mt-4">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} py-16`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">About Our Blog</h2>
          <p className={`max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            We provide insights and practical guides on a variety of topics including technology, business, and lifestyle. Stay connected with us as we explore new trends and ideas that can shape your future!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} py-6`}>
        <div className="container mx-auto text-center">
          <p className={`text-gray-600 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
            &copy; 2024 Blog Platform. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="#" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
