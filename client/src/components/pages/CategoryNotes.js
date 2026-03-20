import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Layout/Layout";

const CategoryNotes = () => {
  const { category } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useTheme();
  const navigate = useNavigate();

  // 🔥 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 20;

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  useEffect(() => {
    if (!category) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/api/notes?category=${category}`);
        setNotes(res.data.notes || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [category]);

  // 🔥 pagination logic
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginatedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <Layout>
    <div
      className={`mt-28 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      } min-h-screen px-4 py-10`}
    >
      {/* 🔥 HEADING */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-[1.1rem] sm:text-2xl font-light tracking-wide">
          {category ? category : "Study Notes"}
        </h1>
      </div>

      {/* 🔥 LOADING SKELETON */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-[120px] rounded-xl animate-pulse ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <p className="text-center opacity-60">No notes found 😢</p>
      ) : (
        <>
          {/* 🔥 GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {paginatedNotes.map((note) => (
              <div
                key={note._id}
                onClick={() => navigate(`/note/${note?.slug}`)}
                className={`cursor-pointer border rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-blue-600"
                    : "bg-white border-gray-200 hover:bg-blue-600"
                }`}
              >
                {/* TITLE */}
                <h2 className="text-sm font-medium line-clamp-2">
                  {note?.title || "No Title"}
                </h2>

                {/* CATEGORY */}
                <p className="text-xs opacity-60 mt-2">
                  {note?.category}
                </p>

                {/* CTA */}
                <div className="mt-4 text-[11px] opacity-70">
                  View Notes →
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </Layout>
  );
};

export default CategoryNotes;