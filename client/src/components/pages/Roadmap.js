
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";
import NativeAd from "./NativeAd";
import SmallBannerAd from "./SmallBannerAd";
import { Search } from "lucide-react";

/* ================= Skeleton Card ================= */

const SkeletonCard = ({ dark }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 border ${
      dark
        ? "bg-white/5 border-white/10"
        : "bg-white border-gray-200"
    }`}
  >
    <div className="animate-pulse space-y-4">
      <div className="h-3 w-20 bg-indigo-400/40 rounded" />

      <div className="h-5 w-3/4 bg-gray-300/40 rounded" />

      <div className="h-3 w-1/2 bg-gray-300/40 rounded" />
    </div>
  </div>
);

const Roadmap = () => {
  /* ================= State ================= */

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ================= Refs ================= */

  const sliderRef = useRef(null);

  /* ================= Hooks ================= */

  const [theme] = useTheme();
  const navigate = useNavigate();

  /* ================= Constants ================= */

  const cardsPerPage = 12;
  const dark = theme === "dark";

  /* ================= Scroll To Top ================= */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= Fetch Roadmaps ================= */

  useEffect(() => {
    let isMounted = true;

    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get("/api/v1/roadmaps");

        if (isMounted) {
          setRoadmaps(res.data);
        }
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRoadmaps();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ================= Slider Controls ================= */

  const scrollLeft = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -250,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  /* ================= Unique Categories ================= */

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      roadmaps
        .map((roadmap) => roadmap.category)
        .filter(Boolean)
    );

    return ["All", ...uniqueCategories];
  }, [roadmaps]);

  /* ================= Filtering ================= */

  const filteredRoadmaps = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return roadmaps
      .filter((roadmap) => {
        const category = roadmap.category || "";

        return category.toLowerCase().includes(query);
      })
      .filter((roadmap) => {
        if (selectedCategory === "All") {
          return true;
        }

        return roadmap.category === selectedCategory;
      });
  }, [roadmaps, searchQuery, selectedCategory]);

  /* ================= Pagination ================= */

  const totalPages = Math.ceil(
    filteredRoadmaps.length / cardsPerPage
  );

  const indexOfLastCard =
    currentPage * cardsPerPage;

  const indexOfFirstCard =
    indexOfLastCard - cardsPerPage;

  const currentRoadmaps = filteredRoadmaps.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  /* ================= Page Change ================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================= Helper ================= */

  const getRoadmapTitle = (roadmap) => {
    // Top-level title
    if (roadmap.title) {
      return roadmap.title;
    }

    // First node title
    if (
      roadmap.nodes &&
      roadmap.nodes.length > 0 &&
      roadmap.nodes[0]?.title
    ) {
      return roadmap.nodes[0].title;
    }

    // Slug fallback
    if (roadmap.slug) {
      return roadmap.slug.replace(/-/g, " ");
    }

    // Category fallback
    return roadmap.category || "Roadmap";
  };

  /* ================= Render ================= */

  return (
    <Layout>
      <div className="pt-24 mt-5 pb-16 px-4 max-w-7xl mx-auto">

        {/* ================= Header ================= */}

        <div className="text-center mb-10">
          <h1
            className={`text-[1.1rem] sm:text-4xl font-medium tracking-tight ${
              dark
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Learning Roadmaps
          </h1>

          <p
            className={`mt-3 max-w-2xl mx-auto text-[1rem] sm:text-base ${
              dark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Structured learning roadmaps designed to
            guide your journey and help you build skills
            step by step.
          </p>
        </div>

        {/* ================= Small Banner ================= */}

        <div className="flex justify-center mb-6">
          <SmallBannerAd />
        </div>

        {/* ================= Category Slider ================= */}

        <div className="relative w-full mb-8">

          {/* Left Button */}

          <button
            type="button"
            onClick={scrollLeft}
            className="
              hidden
              md:flex
              absolute
              left-0
              top-1/2
              -translate-y-1/2
              z-10
              bg-white
              shadow-md
              rounded-full
              w-9
              h-9
              items-center
              justify-center
              hover:bg-gray-100
              transition
            "
          >
            ←
          </button>

          {/* Categories */}

          <div
            ref={sliderRef}
            className="
              flex
              gap-3
              overflow-x-auto
              scrollbar-hide
              whitespace-nowrap
              pb-2
              px-8
            "
          >
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : dark
                    ? "bg-white/5 hover:bg-white/10 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Button */}

          <button
            type="button"
            onClick={scrollRight}
            className="
              hidden
              md:flex
              absolute
              right-0
              top-1/2
              -translate-y-1/2
              z-10
              bg-white
              shadow-md
              rounded-full
              w-9
              h-9
              items-center
              justify-center
              hover:bg-gray-100
              transition
            "
          >
            →
          </button>
        </div>

        {/* ================= Search ================= */}

        <div className="relative max-w-xl mx-auto mb-10">

          <Search
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              dark
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          />

          <input
            disabled={loading}
            type="text"
            placeholder="Search roadmap (React, Node, Java, Python...)"
            className={`w-full pl-12 pr-4 py-3 rounded-xl border backdrop-blur-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
              dark
                ? "bg-white/5 border-white/10 text-gray-200 placeholder:text-gray-500"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* ================= Grid ================= */}

        {loading ? (
          /* ================= Loading ================= */

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-4
              gap-6
            "
          >
            {[...Array(cardsPerPage)].map((_, i) => (
              <SkeletonCard
                key={i}
                dark={dark}
              />
            ))}
          </div>

        ) : currentRoadmaps.length === 0 ? (
          /* ================= Empty State ================= */

          <p className="text-center text-gray-400 text-lg mt-10">
            No roadmaps found
          </p>

        ) : (
          /* ================= Roadmap Grid ================= */

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-4
              gap-6
            "
          >
            {currentRoadmaps.map((roadmap, i) => (
              <div
                key={roadmap._id}
                onClick={() =>
                  navigate(
                    `/roadmap/${roadmap._id}`
                  )
                }
                className={`group relative cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border ${
                  dark
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 hover:border-indigo-400"
                }`}
              >

                {/* Hover Glow */}

                <div
                  className="
                    absolute
                    inset-0
                    rounded-2xl
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-300
                    bg-gradient-to-r
                    from-indigo-500/10
                    via-purple-500/10
                    to-pink-500/10
                  "
                />

                {/* Number */}

                <div className="relative z-10 text-xs font-semibold mb-3 text-indigo-500">
                  ROADMAP{" "}
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Title */}

                <h3
                  className={`relative z-10 font-semibold capitalize text-base sm:text-lg leading-snug ${
                    dark
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {getRoadmapTitle(roadmap)}
                </h3>

                {/* Footer */}

                <div
                  className={`relative z-10 mt-6 text-xs font-medium flex items-center justify-between ${
                    dark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <span>
                    View Path
                  </span>

                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= Pagination ================= */}

        {!loading && totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-12">
            {[...Array(totalPages)].map(
              (_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() =>
                    handlePageChange(idx + 1)
                  }
                  className={`min-w-[38px] h-10 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === idx + 1
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : dark
                      ? "bg-white/5 text-gray-300 hover:bg-white/10"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              )
            )}
          </div>
        )}

        {/* ================= Native Ad ================= */}

        <div className="mt-14">
          <NativeAd />
        </div>
      </div>
    </Layout>
  );
};

export default Roadmap;

