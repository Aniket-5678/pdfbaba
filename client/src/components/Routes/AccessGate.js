import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Loader2 } from "lucide-react";
export default function AccessGate({ admin = false }) {
  const [auth] = useAuth(),
    location = useLocation(),
    [state, setState] = useState("pending");
  useEffect(() => {
    let alive = true;
    setState("pending");
    if (!auth.token)
      return () => {
        alive = false;
      };
    axios
      .get("/api/v1/user/" + (admin ? "admin-auth" : "user-auth"))
      .then((r) => {
        if (alive) setState(r.data.ok ? "allowed" : "denied");
      })
      .catch(() => {
        if (alive) setState("denied");
      });
    return () => {
      alive = false;
    };
  }, [auth.token, admin]);
  let stored = false;
  try {
    stored = Boolean(localStorage.getItem("auth"));
  } catch {}
  if ((!auth.token && !stored) || state === "denied")
    return <Navigate to="/login" replace state={location.pathname} />;
  if (state === "allowed" && auth.token) return <Outlet />;
  return (
    <div
      role="status"
      className="flex min-h-[60vh] items-center justify-center gap-3 bg-slate-50 text-sm text-violet-600"
    >
      <Loader2 className="animate-spin" size={22} />
      Opening your workspace...
    </div>
  );
}
