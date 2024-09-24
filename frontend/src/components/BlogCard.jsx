const BlogCard = ({ title, description }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-sm">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
      </div>
    );
  };
  
  export default BlogCard;
  