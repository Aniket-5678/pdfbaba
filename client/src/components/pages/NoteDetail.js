import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { HiOutlineCalendar } from "react-icons/hi";

/* 🔹 Skeleton Loader */
const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 w-24 bg-gray-300 rounded"></div>
    <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
    <div className="h-4 w-full bg-gray-300 rounded"></div>
    <div className="h-4 w-full bg-gray-300 rounded"></div>
    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
    <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
  </div>
);

const NoteDetail = () => {
  const { slug } = useParams();
  const [theme] = useTheme();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${slug}`);
        setNote(res.data.note);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [slug]);

  return (
    <Layout>
      <div
        className={`min-h-screen py-10 px-4 sm:px-6 md:px-10 lg:px-16 mt-28 ${
          theme === "dark" ? "bg-gray-950 text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* MAIN CONTENT */}
          <div
            className={`flex-1 rounded-2xl shadow-lg p-6 md:p-10 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-900 text-white hover:shadow-2xl"
                : "bg-white hover:shadow-xl"
            }`}
          >
            {loading ? (
              <Skeleton />
            ) : !note ? (
              <div className="text-center text-gray-400 text-lg py-20">
                Note not found 😢
              </div>
            ) : (
              <>
                {/* CATEGORY */}
                <span
                  className={`inline-block mb-4 text-xs md:text-sm px-3 py-1 rounded-full font-medium transition ${
                    theme === "dark"
                      ? "bg-blue-900 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {note?.category || "General"}
                </span>

                {/* TITLE */}
                <h1 className="text-[1.5rem] sm:text-2xl md:text-3xl font-semibold mb-5 leading-snug break-words">
                  {note?.title}
                </h1>

                {/* DATE */}
                <div className="flex items-center text-xs md:text-sm mb-6 text-gray-400 gap-2">
                  <HiOutlineCalendar />
                  <span>{new Date(note?.createdAt).toLocaleDateString()}</span>
                </div>

                {/* CONTENT */}
                <div
                  className={`prose max-w-full sm:prose-sm md:prose-base lg:prose-lg ${
                    theme === "dark" ? "prose-invert text-white" : ""
                  } break-words`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: note?.content
                      ?.replace(/&lt;/g, "<")
                      .replace(/&gt;/g, ">"),
                  }}
                ></div>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">

            {/* ABOUT CARD */}
            <div
              className={`p-5 rounded-xl shadow-md transition-all duration-300 ${
                theme === "dark" ? "bg-gray-900 text-white hover:shadow-lg" : "bg-white hover:shadow-lg"
              }`}
            >
              <h3 className="font-semibold text-sm mb-2 border-b pb-2">About</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Access structured, readable, and well-organized notes. Fully responsive for mobile, tablet, and desktop.
              </p>
            </div>

            {/* DETAILS CARD */}
            <div
              className={`p-5 rounded-xl shadow-md transition-all duration-300 ${
                theme === "dark" ? "bg-gray-900 text-white hover:shadow-lg" : "bg-white hover:shadow-lg"
              }`}
            >
              <h3 className="font-semibold text-sm mb-2 border-b pb-2">Details</h3>
              {loading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">
                    Category: <span className="font-medium">{note?.category}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">
                    Notes length: <span className="font-medium">{note?.content?.length || 0} characters</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Created: <span className="font-medium">{new Date(note?.createdAt).toLocaleDateString()}</span>
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetail;