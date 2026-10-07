import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, Clock3, LoaderCircle, Mail, MessageSquareText, RefreshCw } from "lucide-react";
import AdminShell from "../AdminShell";

export default function DeveloperRequests() {
  const [requests,setRequests]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  const load=()=>{setLoading(true);axios.get("/api/v1/builder/admin/requests").then(r=>setRequests(r.data)).catch(e=>setError(e.response?.data?.message||"Could not load project requests")).finally(()=>setLoading(false));};
  useEffect(()=>{load()},[]);
  const status=async(id,value)=>{await axios.patch(`/api/v1/builder/admin/requests/${id}`,{status:value});setRequests(list=>list.map(r=>r._id===id?{...r,status:value}:r));};
  return <AdminShell title="Developer requests" description="Project briefs sent by users who want a custom full stack website."><div className="wra-toolbar"><span>{requests.length} {requests.length===1?"request":"requests"}</span><button onClick={load}><RefreshCw size={15}/> Refresh</button></div>{error&&<p className="wra-error">{error}</p>}{loading?<div className="wra-loading"><LoaderCircle className="spin"/> Loading requests…</div>:!requests.length?<div className="wra-empty"><MessageSquareText size={28}/><h3>No project requests yet</h3><p>New developer connect requests will appear here.</p></div>:<div className="wra-list">{requests.map(r=><article className="wra-card" key={r._id}><div className="wra-card-head"><div className="wra-avatar">{r.name?.[0]?.toUpperCase()}</div><div><h3>{r.name}</h3><a href={`mailto:${r.email}`}><Mail size={13}/>{r.email}</a></div><time><Clock3 size={13}/>{new Date(r.createdAt).toLocaleString()}</time><select aria-label="Request status" value={r.status} onChange={e=>status(r._id,e.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><div className="wra-meta"><span>{r.projectType}</span><span>{r.budget}</span><span>User: {r.owner?.fullName || r.owner?.email || "Account"}</span></div><p>{r.message}</p><a className="wra-reply" href={`mailto:${r.email}?subject=${encodeURIComponent("Your website project")}`}>Reply by email <ArrowUpRight size={14}/></a></article>)}</div>}</AdminShell>;
}
