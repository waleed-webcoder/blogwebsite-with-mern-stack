import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./ThemeContext";
import { useParams } from "react-router-dom";

// Icons (optional: you can install react-icons if not already)
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";

const PostDetail = () => {
    const { theme } = useContext(ThemeContext);
    const { id } = useParams(); // Destructure the `id`
    const [post, setPost] = useState(null);
    const [relatedPost, setRelatedPost] = useState([]); // Default to an empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/post/${id}`, {
                    withCredentials: true,
                });
                const relatedPostResponse = await axios.get("http://localhost:3000/feed", {
                    withCredentials: true,
                });
                setPost(response.data.post);
                setRelatedPost(relatedPostResponse.data.postdata || []); // Ensure correct access to post data
                setLoading(false);
            } catch (error) {
                console.log("Error in fetching post", error);
                alert("Error in fetching post");
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <p className="text-center text-lg font-semibold py-10">Loading...</p>;
    }

    if (!post) {
        return <p className="text-center text-lg font-semibold py-10">Post not found!</p>;
    }

    return (
        <div className="container mx-auto py-12 px-6">
            <h1 className="text-3xl p-4 m-2 md:text-6xl text-pink-800 font-bold text-center mb-6">✦ ✧ {post.title} ✧ ✦</h1>
            {/* Image section */}
            <div className="mb-8">
                <img
                    src={`http://localhost:3000/${post.imageurl}`}
                    alt={post.title}
                    className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Post Title */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6">{post.title}</h1>

            {/* Author and Date */}
            <div className="flex justify-center items-center space-x-4 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                    <FaUserCircle className="text-xl" />
                    <span className="font-medium">{post.user.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-xl" />
                    <span className="font-medium">{new Date(post.date).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Post Description */}
            <div className="mx-auto">
                <p className="text-lg leading-relaxed text-gray-800 mb-8">{post.description}</p>
            </div>

            {/* Additional Section - Related Posts (Optional) */}
            {relatedPost.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-center mb-4">Related Posts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPost.map((related, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                {/* Post Image */}
                                <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={related.imageurl ? `http://localhost:3000/${related.imageurl}` : "https://via.placeholder.com/600x400"}
                                        alt={related.title}
                                    />
                                </div>
                                {/* Post Content */}
                                <h3 className="text-xl font-semibold text-indigo-600">{related.title || "Untitled Post"}</h3>
                                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {related.description ? related.description.slice(0, 100) : "No description available"}...
                                </p>
                                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{related.date || "Date not available"}</p>
                                <button className="mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                    Read More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
