import { useEffect, useState } from "react";
import axios from "axios";

const NoteManage = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [editNote, setEditNote] = useState(null);

  // ================= FETCH =================
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `/api/notes?search=${search}&category=${category}`
      );
      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, category]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `/api/notes/${editNote._id}`,
        editNote
      );

      setEditNote(null);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">Manage Notes 📚</h1>

        {/* FILTER */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-full"
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category..."
            className="p-2 border rounded w-full"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Views</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {notes.map((note) => (
                <tr key={note._id} className="border-t">
                  <td className="p-3">{note.title}</td>
                  <td className="p-3">{note.category}</td>
                  <td className="p-3">{note.views}</td>

                  <td className="p-3 flex gap-2">
                    {/* EDIT */}
                    <button
                      onClick={() => setEditNote(note)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {notes.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No Notes Found 😢
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editNote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-lg">

            <h2 className="text-xl font-semibold mb-4">Edit Note ✏️</h2>

            <input
              type="text"
              value={editNote.title}
              onChange={(e) =>
                setEditNote({ ...editNote, title: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
            />

            <input
              type="text"
              value={editNote.category}
              onChange={(e) =>
                setEditNote({ ...editNote, category: e.target.value })
              }
              className="w-full p-2 border rounded mb-3"
            />

            {/* ⚠️ simple textarea (optional upgrade: ReactQuill) */}
            <textarea
              value={editNote.content}
              onChange={(e) =>
                setEditNote({ ...editNote, content: e.target.value })
              }
              className="w-full p-2 border rounded mb-3 h-32"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditNote(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteManage;