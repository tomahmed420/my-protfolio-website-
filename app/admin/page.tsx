'use client';

import { FormEvent, useEffect, useState } from "react";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [json, setJson] = useState("");
  const [status, setStatus] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({password})});
    if(res.ok){setLoggedIn(true);load();} else setStatus("Invalid password.");
  }
  async function load(){
    const res=await fetch("/api/admin/content");
    if(res.ok){setJson(JSON.stringify(await res.json(),null,2));setLoggedIn(true);}
    else setStatus("Admin is not configured or the session expired.");
  }
  async function save(){
    setStatus("Saving…");
    const res=await fetch("/api/admin/content",{method:"PUT",headers:{"content-type":"application/json"},body:json});
    setStatus(res.ok ? "Saved. Vercel will redeploy from the GitHub commit." : await res.text());
  }
  useEffect(()=>{load()},[]);
  if(!loggedIn) return <main className="admin-wrap"><div className="admin-card"><p className="eyebrow">ADMIN</p><h1>Portfolio Control</h1><p>Sign in to edit the site content.</p><form onSubmit={login}><input type="password" placeholder="Admin password" value={password} onChange={e=>setPassword(e.target.value)}/><button className="btn primary">Sign in</button></form><small>{status}</small></div></main>;
  return <main className="admin-wrap"><div className="admin-editor"><div className="admin-top"><div><p className="eyebrow">ADMIN</p><h1>Portfolio Content</h1></div><button className="btn primary" onClick={save}>Save Changes</button></div><p className="admin-help">Edit the JSON content below. The production setup will store it in GitHub and Vercel will rebuild the site.</p><textarea value={json} onChange={e=>setJson(e.target.value)} spellCheck={false}/><small>{status}</small></div></main>;
}