import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";

/* 🔹 SKELETON */
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
        className={`min-h-screen py-8 px-3 md:px-6 mt-28 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-5">

          {/* MAIN */}
          <div
            className={`md:col-span-3 rounded-2xl shadow p-5 md:p-10 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            {loading ? (
              <Skeleton />
            ) : !note ? (
              <div className="text-center text-gray-400">
                Note not found 😢
              </div>
            ) : (
              <>
                {/* CATEGORY */}
                <span className="inline-block mb-3 text-xs md:text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {note?.category || "General"}
                </span>

                {/* TITLE */}
                <h1 className="text-[1.2rem] md:text-3xl font-bold mb-3 leading-snug">
                  {note?.title}
                </h1>

                {/* META (ONLY DATE NOW) */}
                <div className="text-xs md:text-sm mb-5 border-b pb-3 text-gray-400">
                  {new Date(note?.createdAt).toLocaleDateString()}
                </div>

                {/* CONTENT */}
                <div
                  className={`prose prose-sm md:prose-base max-w-none ${
                    theme === "dark" ? "prose-invert text-white" : ""
                  }`}
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
          <div className="md:col-span-1 space-y-4">

            {/* ABOUT */}
            <div
              className={`p-4 rounded-xl shadow ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-sm mb-1">About</h3>
              <p className="text-xs text-gray-400">
                Learn faster with structured notes
              </p>
            </div>

            {/* STATS (REMOVED VIEWS) */}
            <div
              className={`p-4 rounded-xl shadow ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="font-semibold text-sm mb-1">Details</h3>

              {loading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400">
                    Category: {note?.category}
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