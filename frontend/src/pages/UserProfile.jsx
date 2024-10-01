// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Importing Axios to make HTTP requests
// import { useNavigate } from "react-router-dom";
// const UserProfile = () => {
//   const [userData, setUserData] = useState(null); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/userprofile",{
//             withCredentials:true,
//         }); 

//         setUserData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []); 

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-lg text-white">
//           <img
//             className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//             src={userData.pic}
//             alt="User Profile"
//           />
//           <h1 className="text-3xl font-semibold mt-4">{userData.name}</h1>
//           <p className="text-gray-300">Blogger & Content Creator</p>
//         </div>

//         {/* User's Posts */}
//         <div className="p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Posts</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {userData.posts.map((post, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-all duration-200"
//               >
//                 <h3 className="text-xl font-semibold text-blue-600">{post.title}</h3>
//                 <p className="text-gray-600 mt-2"> {post.description ? post.description.slice(0, 100) : "No description available"}...</p>
//                 <p className="text-sm text-gray-500 mt-2">{post.date}</p>
//                 <button className="mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
//                   Read More
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userprofile", {
          withCredentials: true, // Ensure cookies are sent
        });
        setUserData(response.data.data); // Adjusted to use `response.data.data` based on your backend structure
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
  console.log(userData)
  // Safeguard against missing user data
  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-t-lg text-white">
          {/* Profile Picture */}
          <img
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            src={`http://localhost:3000/${userData.pic}`|| "https://www.lovepanky.com/wp-content/uploads/2020/04/how-to-be-mean-1.jpg"} // Fallback to a default picture
            alt="User Profile"
          />
          {/* User Info */}
          <h1 className="text-3xl font-semibold mt-4">{userData.name}</h1>
          <p className="text-gray-300">Blogger & Content Creator</p>
        </div>

        {/* User's Posts */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.posts.length > 0 ? (
              userData.posts.map((post, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold text-blue-600">{post.title || "Untitled Post"}</h3>
                  <p className="text-gray-600 mt-2">
                    {post.description ? post.description.slice(0, 100) : "No description available"}...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">{post.date || "Date not available"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
