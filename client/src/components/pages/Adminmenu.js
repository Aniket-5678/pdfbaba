import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Folder,
  Route,
  Brain,
  Code2,
  ShoppingBag,
  Plus,
} from "lucide-react";
export const adminLinks = [
  ["Overview", "/dashboard/admin", LayoutDashboard],
  ["Create note", "/dashboard/admin/notes", Plus],
  ["Manage notes", "/dashboard/admin/notesmanage", BookOpen],
  ["Categories", "/dashboard/admin/create-category", Folder],
  ["Create quiz", "/dashboard/admin/create-quiz", Plus],
  ["Manage quizzes", "/dashboard/admin/all-quiz", Brain],
  ["Create roadmap", "/dashboard/admin/createroadmap", Plus],
  ["Manage roadmaps", "/dashboard/admin/roadmaplist", Route],
  ["Create project", "/dashboard/admin/sourcecode", Plus],
  ["Manage projects", "/dashboard/admin/sourcecodeupdatedelete", Code2],
  ["Orders", "/dashboard/admin/usersourcecodeorder", ShoppingBag],
];
export default function Adminmenu() {
  return (
    <nav
      aria-label="Admin navigation"
      className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 lg:flex-col lg:overflow-visible"
    >
      {adminLinks.map(([name, url, Icon]) => (
        <NavLink
          end
          key={url}
          to={url}
          className={({ isActive }) =>
            "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition " +
            (isActive
              ? "bg-violet-600 text-white"
              : "text-slate-500 hover:bg-violet-50 hover:text-violet-700")
          }
        >
          <Icon size={17} />
          {name}
        </NavLink>
      ))}
    </nav>
  );
}
