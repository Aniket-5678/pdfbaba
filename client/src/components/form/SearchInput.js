import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { useMediaQuery, TextField, IconButton, Drawer } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../context/ThemeContext";

// Normalize text for search comparison
const normalizeText = (text) =>
  text?.toLowerCase().trim().replace(/\s+/g, " ") || "";

const SearchInput = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width:480px)");

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [noteResults, setNoteResults] = useState([]);
  const [roadmapResults, setRoadmapResults] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [sourceCodeResults, setSourceCodeResults] = useState([]);
  const [studyNotesResults, setStudyNotesResults] = useState([]);

  // ---------- SEARCH ----------
  useEffect(() => {
    if (!query.trim()) {
      setNoteResults([]);
      setRoadmapResults([]);
      setQuizResults([]);
      setSourceCodeResults([]);
      setStudyNotesResults([]);
      return;
    }

    const normalizedQuery = normalizeText(query);
    setLoading(true);

    const fetchData = async () => {
      try {
        const [
          notesRes,
          roadmapsRes,
          quizzesRes,
          sourceRes,
          studyNotesRes,
        ] = await Promise.all([
          axios
            .get("/api/v1/keyword/search", { params: { query: normalizedQuery } })
            .catch(() => ({ data: { success: false, data: [] } })),
          axios.get("/api/v1/roadmaps").catch(() => ({ data: [] })),
          axios.get("/api/v1/quizzes/all").catch(() => ({ data: [] })),
          axios.get("/api/v1/sourcecode").catch(() => ({ data: [] })),
          axios
            .get("/api/notes", { params: { search: normalizedQuery } })
            .catch(() => ({ data: { notes: [] } })),
        ]);

        setNoteResults(notesRes.data.success ? notesRes.data.data : []);
        setRoadmapResults(
          (roadmapsRes.data || []).filter((r) =>
            normalizeText(r.category).includes(normalizedQuery)
          )
        );
        setQuizResults(
          (quizzesRes.data || []).filter((q) =>
            normalizeText(q.title).includes(normalizedQuery)
          )
        );
        setSourceCodeResults(
          (sourceRes.data || []).filter((s) =>
            normalizeText(s.title).includes(normalizedQuery)
          )
        );
        setStudyNotesResults(
          (studyNotesRes.data.notes || []).filter((s) =>
            normalizeText(s.title).includes(normalizedQuery)
          )
        );
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 350); // debounce
    return () => clearTimeout(timer);
  }, [query]);

  // ---------- NAVIGATION ----------
  const handleNavigate = (url) => {
    setQuery("");
    setNoteResults([]);
    setRoadmapResults([]);
    setQuizResults([]);
    setSourceCodeResults([]);
    setStudyNotesResults([]);
    setDrawerOpen(false);
    navigate(url);
  };

  const handleSearch = () => {
    if (noteResults.length) navigate(`/question/${noteResults[0]._id}`);
    else if (roadmapResults.length) navigate(`/roadmap/${roadmapResults[0]._id}`);
    else if (quizResults.length) navigate(`/play/${quizResults[0]._id}`);
    else if (sourceCodeResults.length) navigate(`/service/${sourceCodeResults[0]._id}`);
    else if (studyNotesResults.length) navigate(`/note/${studyNotesResults[0].slug}`); // ✅ updated slug route
    else navigate("/not-found");

    setDrawerOpen(false);
  };

  // ----------- RENDER SEARCH ITEMS -----------
  const renderResults = () => (
    <>
      {studyNotesResults.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleNavigate(`/note/${item.slug}`)} // ✅ updated
        >
          📒 {item.title}
        </div>
      ))}

      {noteResults.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleNavigate(`/question/${item._id}`)}
        >
          📘 {item.description}
        </div>
      ))}

      {roadmapResults.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleNavigate(`/roadmap/${item._id}`)}
        >
          🛣 {item.category}
        </div>
      ))}

      {quizResults.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleNavigate(`/play/${item._id}`)}
        >
          🧠 {item.title}
        </div>
      ))}

      {sourceCodeResults.map((item) => (
        <div
          key={item._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleNavigate(`/service/${item._id}`)}
        >
          💻 {item.title}
        </div>
      ))}
    </>
  );

  // ----------- MOBILE SEARCH -----------
  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setDrawerOpen(true)} style={{ color: theme === "dark" ? "white" : "gray" }}>
          <SearchIcon />
        </IconButton>

        <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="p-5">
            <IconButton style={{ float: "right" }} onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>

            <TextField
              fullWidth
              placeholder="Search notes, quizzes, roadmaps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {loading && <div className="mt-3"><ClipLoader size={20} /></div>}

            <div className="mt-4">{renderResults()}</div>
          </div>
        </Drawer>
      </>
    );
  }

  // ----------- DESKTOP SEARCH -----------
  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex items-center bg-white border rounded-full shadow-md overflow-hidden px-4">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search notes, quizzes, roadmaps or source code..."
          className="flex-1 py-3 outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {loading && <ClipLoader size={18} />}
      </div>

      {(noteResults.length ||
        roadmapResults.length ||
        quizResults.length ||
        sourceCodeResults.length ||
        studyNotesResults.length) > 0 && (
        <div className="absolute w-full bg-white border rounded-xl shadow-2xl mt-2 max-h-96 overflow-y-auto z-50">
          {renderResults()}
        </div>
      )}
    </div>
  );
};

export default SearchInput;