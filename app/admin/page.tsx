'use client';

import { FormEvent, useEffect, useMemo, useState } from "react";

type Content = Record<string, unknown>;

const labels: Record<string,string> = {
  site: "Hero & Site",
  about: "About",
  services: "Services",
  proof: "Proof",
  featuredCaseStudy: "Featured Case Study",
  caseStudies: "Case Studies",
  testimonials: "Testimonials",
  projects: "Projects",
  contact: "Contact",
  socials: "Social Links",
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<Content>({});
  const [active, setActive] = useState("site");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setLoggedIn(true);
    } else if (res.status !== 401) {
      setStatus("Admin is not configured.");
    }
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setStatus("Signing in…");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await load();
    } else {
      setStatus("Invalid password.");
    }
  }

  async function save() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(draft);
    } catch {
      setStatus("This section contains invalid JSON.");
      return;
    }
    const next = { ...content, [active]: parsed };
    setStatus("Saving…");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next),
    });
    if (res.ok) {
      setContent(next);
      setStatus("Saved successfully.");
    } else {
      setStatus(await res.text());
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setStatus("");
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (loggedIn && active in content) {
      setDraft(JSON.stringify(content[active], null, 2));
      setStatus("");
    }
  }, [active, loggedIn, content]);

  const sectionKeys = useMemo(() => Object.keys(content), [content]);

  if (!loggedIn) {
    return (
      <main className="admin-wrap">
        <div className="admin-card">
          <p className="eyebrow">PRIVATE ADMIN</p>
          <h1>Portfolio Control</h1>
          <p>Manage the content shown across your public portfolio.</p>
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="btn primary" type="submit">Sign in</button>
          </form>
          <small>{status}</small>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-wrap">
      <div className="admin-editor">
        <div className="admin-top">
          <div>
            <p className="eyebrow">PRIVATE ADMIN</p>
            <h1>Portfolio Control</h1>
            <p className="admin-help">Choose a section, edit its content, then save. Changes are committed to GitHub and picked up by Vercel.</p>
          </div>
          <button className="btn secondary" onClick={logout}>Sign out</button>
        </div>

        <div className="admin-layout">
          <aside className="admin-sidebar">
            {sectionKeys.map((key) => (
              <button
                key={key}
                className={active === key ? "admin-tab active" : "admin-tab"}
                onClick={() => setActive(key)}
              >
                {labels[key] ?? key}
              </button>
            ))}
          </aside>

          <section className="admin-main">
            <div className="admin-main-head">
              <div>
                <span className="admin-section-label">{labels[active] ?? active}</span>
                <p>Edit only this section. Keep valid JSON formatting.</p>
              </div>
              <button className="btn primary" onClick={save}>Save Section</button>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              aria-label={`Edit ${active}`}
            />
            <small>{status}</small>
          </section>
        </div>
      </div>
    </main>
  );
}
