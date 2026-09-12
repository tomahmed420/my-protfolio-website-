'use client';

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowRight, BarChart3, CheckCircle2, Code2, Database, Facebook,
  Gauge, Mail, Menu, Moon, MousePointer2, ShieldCheck, X
} from "lucide-react";
import content from "@/data/content.json";

const iconMap: Record<string, ReactNode> = {
  meta: <Facebook size={26} />,
  gtm: <MousePointer2 size={26} />,
  ga4: <BarChart3 size={26} />,
  tracking: <Database size={26} />
};

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectMode, setProjectMode] = useState<"Client Work" | "Vibe Code">("Client Work");
  const projects = useMemo(
    () => content.projects.filter((p) => p.category === projectMode),
    [projectMode]
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">{content.site.shortName}</a>
        <nav className={mobileOpen ? "nav open" : "nav"}>
          {[
            ["About","#about"],["Services","#services"],["Case Studies","#case-studies"],
            ["Projects","#projects"],["Testimonials","#testimonials"],["Contact","#contact"]
          ].map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Theme"><Moon size={17}/></button>
          <a className="mini-cta" href="#contact">Let’s Talk <ArrowRight size={15}/></a>
          <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">{content.site.eyebrow}</p>
          <h1>{content.site.headline.split("\n").map((line, i) =>
            <span key={line} className={i === 2 ? "accent block" : "block"}>{line}</span>
          )}</h1>
          <p className="lead">{content.site.description}</p>
          <div className="cta-row">
            <a className="btn primary" href="#case-studies">{content.site.primaryCta} <ArrowRight size={17}/></a>
            <a className="btn secondary" href="#contact">{content.site.secondaryCta}</a>
          </div>
          <div className="expertise-strip">
            {["Meta Ads","GTM","GA4","Conversion Tracking"].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="portrait-placeholder"><span>SA.</span></div>
            <div className="signature">Md. Shahjalal Ahmed</div>
          </div>
          <div className="hero-note" aria-hidden="true"><span>Strategy</span><span>Measure</span><span>Optimize</span><span>Grow</span></div>
        </div>
      </section>

      <section className="trust-bar">
        <div className="section-shell trust-inner">
          <span>Built around measurable growth</span>
          <div className="tool-list">{["Meta Ads","Google Tag Manager","Google Analytics 4","Conversion Tracking"].map(x => <b key={x}>{x}</b>)}</div>
        </div>
      </section>

      <section id="about" className="section-shell section">
        <div className="section-heading"><p className="eyebrow">ABOUT</p><h2>{content.about.title}</h2></div>
        <div className="about-grid">
          <div className="about-copy"><p>{content.about.body}</p><a className="text-link" href="#contact">Let’s talk about your goals <ArrowRight size={16}/></a></div>
          <div className="principles"><div className="authority-note"><span className="story-label">MY APPROACH</span><strong>Less noise. Better decisions.</strong><p>I prefer a focused system: clear objectives, dependable measurement, and disciplined optimization.</p></div>
            {content.about.principles.map(([title, body]) => <div className="principle" key={title}><CheckCircle2 size={20}/><div><strong>{title}</strong><small>{body}</small></div></div>)}
          </div>
          <div className="proof-grid">
            {content.proof.map(([number,label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section id="services" className="section-shell section section-muted">
        <div className="section-heading"><p className="eyebrow">CORE SERVICES</p><h2>Built around acquisition and measurement.</h2><p>I focus on the systems that determine whether paid traffic becomes measurable business growth.</p></div>
        <div className="service-grid">
          {content.services.map((service) => <article className="service-card" key={service.title}><div className="service-icon">{iconMap[service.icon]}</div><h3>{service.title}</h3><p>{service.description}</p><a href="#contact">Discuss this service <ArrowRight size={15}/></a></article>)}
        </div>
      </section>

      <section id="case-studies" className="section-shell section">
        <div className="section-heading"><p className="eyebrow">{content.featuredCaseStudy.eyebrow}</p><h2>{content.featuredCaseStudy.title}</h2><p>{content.featuredCaseStudy.summary}</p></div>
        <article className="featured-case">
          <div className="case-visual">
            <div className="case-chart"><BarChart3 size={52}/><span>Verified performance visual</span></div>
          </div>
          <div className="case-content">
            <div className="case-story">
              <div><span className="story-label">THE CHALLENGE</span><p>Define the business problem and the acquisition constraint before touching the campaigns.</p></div>
              <div><span className="story-label">THE APPROACH</span><p>Align Meta Ads strategy with a clean measurement setup across GTM and GA4.</p></div>
              <div><span className="story-label">THE RESULT</span><p>Replace this statement with verified performance data, context and the period measured.</p></div>
            </div>
            <div className="metric-grid">{content.featuredCaseStudy.metrics.map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
            <a className="btn primary" href="#contact">Discuss a Similar Challenge <ArrowRight size={17}/></a>
          </div>
        </article>
      </section>

      <section className="section-shell section section-muted">
        <div className="section-heading inline-heading"><div><p className="eyebrow">MORE CASE STUDIES</p><h2>Other Projects & Results</h2></div><a className="text-link" href="#projects">View All <ArrowRight size={16}/></a></div>
        <div className="case-grid">{content.caseStudies.map((item) => <article className="case-card" key={item.title}><div className="image-placeholder"><Gauge size={30}/></div><p className="kicker">{item.category}</p><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">View Case Study <ArrowRight size={15}/></a></article>)}</div>
      </section>

      <section id="testimonials" className="section-shell section">
        <div className="section-heading"><p className="eyebrow">CLIENT FEEDBACK</p><h2>Trusted when measurement matters.</h2><p>Selected feedback from clients and collaborators. Only verified testimonials belong here.</p></div>
        <div className="testimonial-grid">{content.testimonials.map((t) => <article className="testimonial" key={t.name}><p>“{t.quote}”</p><div className="testimonial-meta"><div className="avatar">{t.name.slice(0,1)}</div><div><strong>{t.name}</strong><small>{t.role}</small></div><span>{"★".repeat(t.rating)}</span></div></article>)}</div>
      </section>

      <section id="projects" className="section-shell section section-muted">
        <div className="section-heading inline-heading"><div><p className="eyebrow">PROJECTS</p><h2>Other Work & Side Projects</h2><p>A curated mix of client work and Vibe Code experiments.</p></div>
          <div className="segmented"><button className={projectMode==="Client Work"?"active":""} onClick={() => setProjectMode("Client Work")}>Client Work</button><button className={projectMode==="Vibe Code"?"active":""} onClick={() => setProjectMode("Vibe Code")}>Vibe Code</button></div>
        </div>
        <div className="project-grid">{projects.map((p) => <article className="project-card" key={p.title}><div className="image-placeholder"><Code2 size={30}/></div><div><p className="kicker">{p.category}</p><h3>{p.title}</h3><p>{p.description}</p><a href="#contact">View Project <ArrowRight size={15}/></a></div></article>)}</div>
      </section>

      <section id="contact" className="section-shell section contact-section">
        <div><p className="eyebrow">LET’S WORK TOGETHER</p><h2>{content.contact.headline}</h2><p>{content.contact.body}</p><div className="cta-row"><a className="btn primary" href={"mailto:"+content.contact.email}>Get in Touch <ArrowRight size={17}/></a><a className="btn secondary" href="#case-studies">View Case Studies</a></div></div>
        <div className="contact-proof"><ShieldCheck size={24}/><strong>Professional & measurable</strong><span>Strategy, tracking and optimization built around business outcomes.</span></div>
      </section>

      <footer className="footer">
        <div className="section-shell footer-grid">
          <div><a className="brand" href="#top">{content.site.shortName}</a><p>{content.site.name}<br/>Meta Ads & Tracking Specialist</p></div>
          <div className="footer-links">{["About","Services","Case Studies","Projects","Testimonials","Contact"].map(x => <a key={x} href={"#"+x.toLowerCase().replace(" ","-")}>{x}</a>)}</div>
          <div className="socials"><a href={content.socials.linkedin || "#"} aria-label="LinkedIn">in</a><a href={content.socials.facebook || "#"} aria-label="Facebook">f</a><a href={content.socials.github || "#"} aria-label="GitHub">gh</a><a href={"mailto:"+content.contact.email} aria-label="Email"><Mail size={16}/></a></div>
        </div>
        <div className="copyright">© {new Date().getFullYear()} {content.site.name}. All rights reserved.</div>
      </footer>
    </main>
  );
}