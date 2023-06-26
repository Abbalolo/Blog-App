import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("mario");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, author };

    setIsPending(true);

    fetch("http://localhost:3000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("New blog added");
        setIsPending(false);
        // history.go(-1)
        navigate("/");
      })
      .catch((error) => {
        console.log("Error adding new blog:", error);
        setIsPending(false);
      });
  };

  return (
    <div className="create">
      <h2>Add new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog Author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="ibrahim">ibrahim</option>
        </select>

        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Add Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
