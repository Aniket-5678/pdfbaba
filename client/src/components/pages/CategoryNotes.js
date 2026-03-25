import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Layout from "../Layout/Layout";
import { HiArrowRight } from "react-icons/hi";
import { GoBook } from "react-icons/go";

const CategoryNotes = () => {
  const { category } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme] = useTheme();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 20;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!category) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/notes?category=${category}`);
        setNotes(res.data.notes || []);
        setCurrentPage(1);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [category]);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginatedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  return (
    <Layout>
      <div
        className={`mt-24 sm:mt-28 min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 ${
          theme === "dark"
            ? "bg-gray-950 text-white"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Heading */}
          <div className="mb-10 md:mb-12">
            <p className="text-blue-600 font-light tracking-[2px] uppercase text-[11px] sm:text-xs mb-2">
              Study Notes
            </p>

            <h1 className="text-[1.15rem] sm:text-2xl md:text-4xl font-light tracking-wide leading-tight capitalize">
              {category ? `${category} Notes` : "Study Notes"}
            </h1>

            {/* Subheading */}
            <p
              className={`mt-3 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Explore structured study notes and learning content in{" "}
              <span className="capitalize">{category}</span>. Read topic-wise
              material, revise important concepts, and improve your learning
              with easy-to-access web notes.
            </p>

            {!loading && notes.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                <div
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm ${
                    theme === "dark"
                      ? "bg-white/10 text-gray-300"
                      : "bg-white text-slate-700 border border-gray-200"
                  }`}
                >
                  {notes.length} Notes Available
                </div>

                <div
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm ${
                    theme === "dark"
                      ? "bg-white/10 text-gray-300"
                      : "bg-white text-slate-700 border border-gray-200"
                  }`}
                >
                  Updated Learning Resources
                </div>
              </div>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-[190px] rounded-2xl animate-pulse ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-lg sm:text-2xl font-light mb-3">
                No notes found 😢
              </h2>
              <p
                className={`text-sm sm:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-slate-500"
                }`}
              >
                We couldn’t find any notes in this category right now.
              </p>
            </div>
          ) : (
            <>
              {/* Notes Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {paginatedNotes.map((note, index) => (
                  <div
                    key={note._id}
                    onClick={() => navigate(`/note/${note?.slug}`)}
                    className={`group cursor-pointer border rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-800 hover:bg-blue-600"
                        : "bg-white border-gray-200 hover:bg-blue-600"
                    }`}
                  >
                    {/* Top */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] sm:text-[11px] uppercase tracking-[2px] transition ${
                          theme === "dark"
                            ? "text-blue-400 group-hover:text-white"
                            : "text-blue-600 group-hover:text-white"
                        }`}
                      >
                        Note {index + 1 + (currentPage - 1) * notesPerPage}
                      </span>

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg transition ${
                          theme === "dark"
                            ? "bg-white/10 text-blue-400 group-hover:bg-white/20 group-hover:text-white"
                            : "bg-blue-50 text-blue-600 group-hover:bg-white/20 group-hover:text-white"
                        }`}
                      >
                        <GoBook />
                      </div>
                    </div>

 <h2 className="text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] font-light tracking-wide leading-snug line-clamp-3 min-h-[68px] group-hover:text-white transition">
  {note?.title || "No Title"}
</h2>

                    {/* Description */}
                    <p
                      className={`mt-3 text-[11px] sm:text-[12px] md:text-[13px] leading-relaxed line-clamp-3 transition ${
                        theme === "dark"
                          ? "text-gray-400 group-hover:text-blue-100"
                          : "text-slate-500 group-hover:text-blue-100"
                      }`}
                    >
                      Read topic-based notes and improve your understanding of{" "}
                      {note?.category || category} concepts in a simple and
                      structured format.
                    </p>

                    {/* Bottom */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] sm:text-xs transition ${
                          theme === "dark"
                            ? "bg-white/10 text-gray-300 group-hover:bg-white/20 group-hover:text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-white/20 group-hover:text-white"
                        }`}
                      >
                        {note?.category || "Study Notes"}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-5 flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-medium group-hover:text-white transition">
                      Read Notes <HiArrowRight size={16} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 sm:mt-12 gap-2 flex-wrap">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`min-w-[40px] h-[40px] px-3 rounded-xl text-sm transition-all duration-300 ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-md"
                          : theme === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-blue-500 hover:text-white"
                          : "bg-white border border-gray-200 text-slate-700 hover:bg-blue-500 hover:text-white"
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
      </div>
    </Layout>
  );
};

export default CategoryNotes;