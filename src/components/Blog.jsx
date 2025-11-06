export default function Blog({
  // states
  blog,

  handleEdit,

  // methods
  deleteBlog,
}) {
  return (
    <div className="flex justify-between space-x-4 border border-gray-300 rounded-md p-4 mb-4 min-w-[400px] bg-[#f9f9f9]">
      <div className="" key={blog.id}>
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <p className="text-gray-500">{blog.date}</p>
        <p className="text-gray-700">{blog.content}</p>
        <p className="text-gray-500">Author: {blog.author}</p>
      </div>

      <div
        // key={item.id}
        // blog={item}
        className="flex items-center"
      >
        <button
          onClick={() => handleEdit(blog)}
          className="bg-[#007bff] text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => deleteBlog(blog.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
