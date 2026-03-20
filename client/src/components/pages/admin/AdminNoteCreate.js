import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const AdminNoteCreate = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/notes", {
        title,
        category,
        content,
        tags: tags.split(","),
      });

      alert("Note Created ✅");

      // reset
      setTitle("");
      setCategory("");
      setContent("");
      setTags("");
    } catch (err) {
      console.log(err);
      alert("Error creating note ❌");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2>Create Note 📝</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Enter category (html, css, etc)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* Rich Text Editor */}
        <div style={{ marginBottom: "20px" }}>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Write your notes here..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "blue",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default AdminNoteCreate;