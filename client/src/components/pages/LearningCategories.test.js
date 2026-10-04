import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import LearningCategories, { LearningPage } from "./LearningCategories";
import NotesLibrary from "./NotesLibrary";

jest.mock("axios", () => ({ get: jest.fn() }));
jest.mock("../Layout/Layout", () => ({ children }) => <div>{children}</div>);
jest.mock("../Seo", () => () => null);
jest.mock("framer-motion", () => ({
  useReducedMotion: () => true,
  motion: {
    div: ({ children, initial, animate, whileInView, viewport, transition, ...props }) => <div {...props}>{children}</div>,
  },
}));

const categories = {
  data: {
    noteCategories: [{ name: "technology", slug: "technology" }],
    category: [{ name: "Technology", slug: "technology" }],
  },
};

beforeEach(() => {
  axios.get.mockReset();
  axios.get.mockImplementation((url) => Promise.resolve(
    url === "/api/notes"
      ? { data: { notes: [{ _id: "1", title: "Browser fundamentals", slug: "browser-fundamentals", category: "technology" }] } }
      : categories,
  ));
});

function renderFlow(path = "/categories") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/categories" element={<LearningCategories standalone />} />
        <Route path="/notes-category/:category" element={<NotesLibrary />} />
        <Route path="/learn/:topic" element={<LearningPage />} />
        <Route path="/note/:slug" element={<div>Note content page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

test("loads real categories, then fetches their notes on click and opens a note", async () => {
  renderFlow();
  const category = await screen.findByRole("link", { name: /Technology.*Explore study notes/i });
  expect(screen.getAllByRole("link", { name: /Technology.*Explore study notes/i })).toHaveLength(1);
  fireEvent.click(category);
  const note = await screen.findByRole("link", { name: /Browser fundamentals/i });
  expect(axios.get).toHaveBeenCalledWith("/api/notes", expect.objectContaining({ params: { category: "technology" } }));
  expect(screen.getByRole("link", { name: /All learning categories/i }).getAttribute("href")).toBe("/categories");
  fireEvent.click(note);
  await screen.findByText("Note content page");
});

test("existing learning links fetch notes too", async () => {
  renderFlow("/learn/exam-prep");
  await screen.findByRole("link", { name: /Browser fundamentals/i });
  expect(axios.get).toHaveBeenCalledWith("/api/notes", expect.objectContaining({ params: { category: "exam-preparation" } }));
});

test("shows category API errors instead of broken static links", async () => {
  axios.get.mockRejectedValue(new Error("Network unavailable"));
  renderFlow();
  await waitFor(() => expect(screen.getByRole("alert").textContent).toMatch(/Couldn't load categories/));
  expect(screen.queryByRole("link", { name: /Explore study notes/i })).toBeNull();
});


