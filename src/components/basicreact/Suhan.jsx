// import { useState } from "react";

// function Suhan(props) {
//   // const skills = ["html", "css", "js"];

//   // const suhan = (e) => {
//   //     console.log("hello suhan ahmed", e);
//   // }

//   const [count, setCount] = useState(10);

//   const increment = () => {
//     setCount(count + 1);
//     console.log(count);
//   };


//   return (
//     <div>
//       <button
//         onClick={increment}
//         className="bg-gray-400 py-2 px-8 cursor-pointer rounded-xl"
//       >
//         Click Me
//       </button>

//       {/* <div className='py-4'>
//             <button onClick={suhan} className='bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer'>Click me</button>
//         </div>            

//             <ul>
//                 {skills.map((skill, index) => {
//                     <li key={index}>{skill}</li>
//                 })}
//             </ul> */}
//     </div>
//   );
// }

// export default Suhan;
import { useState } from "react";
import Blog from "./components/Blog";
// import Suhan from "./components/basicreact/Suhan";
// import Suhan1 from "./components/basicreact/Suhan1";

export default function App() {
  const [blogs, setBlogs] = useState([
    // {
    //   id: 1,
    //   title: "Blog 1",
    //   content: "This is the content of blog 1",
    //   author: "Author 1",
    //   date: "2023-01-01",
    // },
    // {
    //   id: 2,
    //   title: "Blog 2",
    //   content: "This is the content of blog 2",
    //   author: "Author 2",
    //   date: "2023-01-02",
    // },
    // {
    //   id: 3,
    //   title: "Blog 3",
    //   content: "This is the content of blog 3",
    //   author: "Author 3",
    //   date: "2023-01-03",
    // },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((item) => item.id !== id));
  };

  // edit
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
      // blog update
      const updatedBlogs = blogs.map((item) =>
        item.id === editId ? { ...item, title, content, author } : item
      );
      setBlogs(updatedBlogs);
      setIsEditing(false);
      setEditId(null);
    } else {
      //
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

    //
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
    <div className="container mx-auto flex items-center justify-between">
      
      {/* extract this part into a separate component */}
      <div className="border border-gray-300 rounded-md p-4 my-4">
        <h1 className="text-3xl font-bold">Blog</h1>
      
      <input onClick={filteredBlogs}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="search"
        placeholder="Search blogs..."
        className="border border-gray-300 rounded-md px-4 py-2 mr-2 my-4"
      />
        <form
          className="flex items-center flex-col space-y-2"
          onSubmit={addBlog}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Blog title"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          />

          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            name="author"
            placeholder="Author"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
            placeholder="Blog content"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          />

          <button
            type="submit"
            className="bg-[#007bff] text-white px-4 py-2 rounded-md cursor-pointer"
          >
            {isEditing ? "Update Blog" : "Add New Blog"}
          </button>

        </form>
      </div>

      <div className="mt-5">
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available</p>
        ) : (
          blogs.map((item) => (
            <Blog
              key={item.id}
              blog={item}
              deleteBlog={deleteBlog}
              handleEdit={handleEdit}
            />
            // <Blog key={item.id} blog={item} deleteBlog={deleteBlog} />
          ))
        )}
      </div>
    </div>
  );
}

