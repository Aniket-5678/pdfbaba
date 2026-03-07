import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

import {
  useMediaQuery,
  TextField,
  IconButton,
  Drawer
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useTheme } from "../context/ThemeContext";

const normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
};

const SearchInput = () => {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const [noteResults, setNoteResults] = useState([]);
  const [roadmapResults, setRoadmapResults] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [sourceCodeResults, setSourceCodeResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:480px)");

  const { theme } = useTheme();

  useEffect(() => {

    const search = async () => {

      const normalizedQuery = normalizeText(query);

      if (!normalizedQuery) {
        setNoteResults([]);
        setRoadmapResults([]);
        setQuizResults([]);
        setSourceCodeResults([]);
        return;
      }

      setLoading(true);

      try {

        const [notesRes, roadmapRes, quizRes, sourceRes] = await Promise.all([
          axios.get("/api/v1/keyword/search", { params: { query: normalizedQuery } }),
          axios.get("/api/v1/roadmaps"),
          axios.get("/api/v1/quizzes/all"),
          axios.get("/api/v1/sourcecode")
        ]);

        const notes = notesRes.data.success ? notesRes.data.data : [];

        const roadmaps = roadmapRes.data.filter((r) =>
          normalizeText(r.category).includes(normalizedQuery)
        );

        const quizzes = quizRes.data.filter((q) =>
          normalizeText(q.title).includes(normalizedQuery)
        );

        const sourceCodes = sourceRes.data.filter((s) =>
          normalizeText(s.title).includes(normalizedQuery)
        );

        setNoteResults(notes);
        setRoadmapResults(roadmaps);
        setQuizResults(quizzes);
        setSourceCodeResults(sourceCodes);

      } catch (error) {
        console.log("Search error:", error);
      } finally {
        setLoading(false);
      }

    };

    const timer = setTimeout(search, 350);

    return () => clearTimeout(timer);

  }, [query]);

  const handleNavigate = (url) => {
    setQuery("");
    setNoteResults([]);
    setRoadmapResults([]);
    setQuizResults([]);
    setSourceCodeResults([]);
    setDrawerOpen(false);
    navigate(url);
  };

  const handleSearch = () => {

    if (noteResults.length > 0) {
      navigate(`/question/${noteResults[0]._id}`);
    }

    else if (roadmapResults.length > 0) {
      navigate(`/roadmap/${roadmapResults[0]._id}`);
    }

    else if (quizResults.length > 0) {
      navigate(`/play/${quizResults[0]._id}`);
    }

    else if (sourceCodeResults.length > 0) {
      navigate(`/service/${sourceCodeResults[0]._id}`);
    }

    else {
      navigate("/not-found");
    }

    setDrawerOpen(false);
  };

  /* ---------------- MOBILE SEARCH ---------------- */

  if (isMobile) {

    return (

      <>

        <IconButton
          onClick={() => setDrawerOpen(true)}
          style={{ color: theme === "dark" ? "white" : "gray" }}
        >
          <SearchIcon />
        </IconButton>

        <Drawer
          anchor="top"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >

          <div className="p-5">

            <IconButton
              style={{ float: "right" }}
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>

            <TextField
              fullWidth
              placeholder="Search notes, quizzes, roadmaps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />

            {loading && (
              <div className="mt-3">
                <ClipLoader size={20} />
              </div>
            )}

            <div className="mt-4">

              {noteResults.map((note) => (
                <div
                  key={note._id}
                  className="py-2 cursor-pointer"
                  onClick={() => handleNavigate(`/question/${note._id}`)}
                >
                  📘 {note.description}
                </div>
              ))}

              {roadmapResults.map((r) => (
                <div
                  key={r._id}
                  className="py-2 cursor-pointer"
                  onClick={() => handleNavigate(`/roadmap/${r._id}`)}
                >
                  🛣 {r.category}
                </div>
              ))}

              {quizResults.map((q) => (
                <div
                  key={q._id}
                  className="py-2 cursor-pointer"
                  onClick={() => handleNavigate(`/play/${q._id}`)}
                >
                  🧠 {q.title}
                </div>
              ))}

              {sourceCodeResults.map((s) => (
                <div
                  key={s._id}
                  className="py-2 cursor-pointer"
                  onClick={() => handleNavigate(`/service/${s._id}`)}
                >
                  💻 {s.title}
                </div>
              ))}

            </div>

          </div>

        </Drawer>

      </>

    );

  }

  /* ---------------- DESKTOP SEARCH ---------------- */

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
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        {loading && <ClipLoader size={18} />}

      </div>

      {(noteResults.length ||
        roadmapResults.length ||
        quizResults.length ||
        sourceCodeResults.length) > 0 && (

        <div className="absolute w-full bg-white border rounded-xl shadow-2xl mt-2 max-h-96 overflow-y-auto z-50">

          {noteResults.map((note) => (
            <div
              key={note._id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleNavigate(`/question/${note._id}`)}
            >
              <IoSearchOutline />
              {note.description}
            </div>
          ))}

          {roadmapResults.map((r) => (
            <div
              key={r._id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleNavigate(`/roadmap/${r._id}`)}
            >
              <IoSearchOutline />
              {r.category}
            </div>
          ))}

          {quizResults.map((q) => (
            <div
              key={q._id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleNavigate(`/play/${q._id}`)}
            >
              <IoSearchOutline />
              {q.title}
            </div>
          ))}

          {sourceCodeResults.map((s) => (
            <div
              key={s._id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleNavigate(`/service/${s._id}`)}
            >
              <IoSearchOutline />
              {s.title}
            </div>
          ))}

        </div>

      )}

    </div>

  );

};

export default SearchInput;