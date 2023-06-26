import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("https://loloblog.netlify.app" + id);
  const navigate = useNavigate();
  const handleClick = () => {
    fetch("https://loloblog.netlify.app/blogs" + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div> {error} </div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p> written by {blog.author}</p>
          <div>{blog.body}</div>
        </article>
      )}
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default BlogDetails;
