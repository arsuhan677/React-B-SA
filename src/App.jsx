import { useState } from "react";
import Blog from "./components/Blog";

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((item) => item.id !== id));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
  };

  const addBlog = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedBlogs = blogs.map((item) =>
        item.id === editId ? { ...item, title, content, author } : item
      );
      setBlogs(updatedBlogs);
      setIsEditing(false);
      setEditId(null);
    } else {
      setBlogs([
        ...blogs,
        {
          id: blogs.length + 1,
          title,
          content,
          author,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
    }

    setTitle("");
    setContent("");
    setAuthor("");
  };

  const filteredBlogs = blogs.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">

      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <div className="border border-gray-300 rounded-md p-6 w-full lg:w-[40%] max-h-[450px] overflow-y-auto bg-white shadow">
          <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">Blog</h1>

          <input
            onClick={filteredBlogs}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search blogs..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
          />

          <form className="flex flex-col space-y-3" onSubmit={addBlog}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Blog title"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />

            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="Author"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Blog content"
              className="border border-gray-300 rounded-md px-4 py-2 h-32 w-full"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md w-full hover:bg-blue-700 transition"
            >
              {isEditing ? "Update Blog" : "Add New Blog"}
            </button>
          </form>
        </div>

        {/* Blogs listt*/}
        <div className="border border-gray-300 rounded-md p-6 w-full lg:w-[60%] bg-white shadow overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
            All Blogs
          </h2>

          {filteredBlogs.length === 0 ? (
            <p className="text-gray-500">No blogs available</p>
          ) : (
            filteredBlogs.map((item) => (
              <Blog
                key={item.id}
                blog={item}
                deleteBlog={deleteBlog}
                handleEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
