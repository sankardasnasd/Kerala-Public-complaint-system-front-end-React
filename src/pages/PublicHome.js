import React, { useState } from "react";
import { Link } from "react-router-dom";

const LampMark = ({ size = 28 }) => (
  <svg width={size} height={size * 1.26} viewBox="0 0 46 58" fill="none" aria-hidden="true">
    <path d="M23 4C23 4 15 14 15 22C15 27.5 18.5 31 23 31C27.5 31 31 27.5 31 22C31 14 23 4 23 4Z" fill="var(--pcs-gold-soft)" />
    <path d="M23 10C23 10 19 16 19 21C19 24 20.8 26 23 26C25.2 26 27 24 27 21C27 16 23 10 23 10Z" fill="#FFE8A3" />
    <rect x="21.4" y="30" width="3.2" height="14" fill="var(--pcs-gold)" />
    <path d="M10 44C10 40 15.5 38 23 38C30.5 38 36 40 36 44C36 48 30.5 47 23 47C15.5 47 10 48 10 44Z" fill="var(--pcs-gold)" />
    <ellipse cx="23" cy="44" rx="13" ry="3" fill="var(--pcs-deep-green)" opacity="0.35" />
  </svg>
);

const IconRegister = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5" strokeLinecap="round" />
    <circle cx="12" cy="8" r="4" />
  </svg>
);

const IconSubmit = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 20V6a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" strokeLinejoin="round" />
    <path d="M14 4v5h5" strokeLinejoin="round" />
    <path d="M8 13h8M8 17h5" strokeLinecap="round" />
  </svg>
);

const IconTrack = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.6-4.6" strokeLinecap="round" />
  </svg>
);

const IconBell = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" strokeLinejoin="round" />
    <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
  </svg>
);

const IconStar = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" strokeLinejoin="round" />
  </svg>
);

const IconWrench = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--pcs-deep-green)" strokeWidth="1.7" aria-hidden="true">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2-2 2.6-2.6Z" strokeLinejoin="round" />
  </svg>
);

const PublicHome = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="pcs-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');

        :root {
          --pcs-deep-green: #10331F;
          --pcs-mid-green: #1E5C3E;
          --pcs-gold: #C99A3B;
          --pcs-gold-soft: #E4C878;
          --pcs-cream: #FBF6EC;
          --pcs-laterite: #B0512B;
          --pcs-ink: #16241C;
          --pcs-muted: #5E6E64;
        }

        * { box-sizing: border-box; }

        .pcs-page {
          font-family: 'Work Sans', sans-serif;
          color: var(--pcs-ink);
          background: var(--pcs-cream);
        }

        .pcs-page a { text-decoration: none; }

        .pcs-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        h1, h2, h3, h4 {
          font-family: 'Fraunces', serif;
          margin: 0;
        }

        /* ---------------- NAVBAR ---------------- */
        .pcs-nav {
          background: var(--pcs-deep-green);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 2px 14px rgba(16, 51, 31, 0.18);
        }

        .pcs-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pcs-brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--pcs-cream);
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 18px;
        }

        .pcs-nav-toggle {
          display: none;
          background: none;
          border: 1px solid rgba(228, 200, 120, 0.4);
          border-radius: 7px;
          padding: 7px 10px;
          color: var(--pcs-gold-soft);
          font-size: 18px;
          cursor: pointer;
        }

        .pcs-nav-links {
          display: flex;
          align-items: center;
          gap: 26px;
        }

        .pcs-nav-links a {
          color: rgba(251, 246, 236, 0.82);
          font-size: 14.5px;
          font-weight: 500;
        }

        .pcs-nav-links a:hover { color: var(--pcs-gold-soft); }

        .pcs-btn {
          display: inline-block;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: transform 0.05s ease, background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .pcs-btn:active { transform: translateY(1px); }

        .pcs-btn-gold {
          background: var(--pcs-gold);
          color: var(--pcs-deep-green);
        }
        .pcs-btn-gold:hover { background: var(--pcs-gold-soft); }

        .pcs-btn-outline-cream {
          background: transparent;
          color: var(--pcs-cream);
          border-color: rgba(251, 246, 236, 0.5);
        }
        .pcs-btn-outline-cream:hover { border-color: var(--pcs-gold-soft); color: var(--pcs-gold-soft); }

        .pcs-btn-lg { padding: 13px 28px; font-size: 15px; }

        .pcs-btn-primary {
          background: var(--pcs-deep-green);
          color: var(--pcs-gold-soft);
        }
        .pcs-btn-primary:hover { background: var(--pcs-mid-green); }

        .pcs-btn-outline-primary {
          background: transparent;
          color: var(--pcs-deep-green);
          border-color: var(--pcs-deep-green);
        }
        .pcs-btn-outline-primary:hover { background: var(--pcs-deep-green); color: var(--pcs-gold-soft); }

        .pcs-btn-laterite {
          background: var(--pcs-laterite);
          color: var(--pcs-cream);
        }
        .pcs-btn-laterite:hover { background: #9a4423; }

        /* ---------------- HERO ---------------- */
        .pcs-hero {
          padding: 76px 0 84px;
          position: relative;
          overflow: hidden;
        }

        .pcs-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }

        .pcs-eyebrow {
          display: inline-block;
          background: rgba(201, 154, 59, 0.14);
          color: var(--pcs-gold);
          border: 1px solid rgba(201, 154, 59, 0.35);
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 6px 14px;
          border-radius: 999px;
        }

        .pcs-hero-title {
          font-size: 46px;
          font-weight: 700;
          line-height: 1.14;
          color: var(--pcs-deep-green);
          margin: 20px 0 18px;
        }

        .pcs-hero-title span { color: var(--pcs-laterite); }

        .pcs-hero-lead {
          font-size: 16px;
          line-height: 1.65;
          color: var(--pcs-muted);
          max-width: 480px;
        }

        .pcs-hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        /* Process card */
        .pcs-process-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #ECE7D9;
          box-shadow: 0 24px 48px -22px rgba(16, 51, 31, 0.28);
          padding: 30px 28px;
        }

        .pcs-process-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          margin-bottom: 20px;
        }

        .pcs-step {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
        }
        .pcs-step:last-child { margin-bottom: 0; }

        .pcs-step-num {
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--pcs-deep-green);
          color: var(--pcs-gold-soft);
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pcs-step-num.pcs-step-done { background: var(--pcs-mid-green); }

        .pcs-step h6 {
          font-family: 'Work Sans', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          margin: 0 0 3px;
          color: var(--pcs-ink);
        }

        .pcs-step small {
          font-size: 12.5px;
          color: var(--pcs-muted);
          line-height: 1.4;
        }

        /* ---------------- STATS ---------------- */
        .pcs-stats {
          padding: 10px 0 60px;
        }

        .pcs-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .pcs-stat-card {
          background: #FFFFFF;
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 26px 18px;
          text-align: center;
        }

        .pcs-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .pcs-stat-num.gold { color: var(--pcs-gold); }
        .pcs-stat-num.green { color: var(--pcs-mid-green); }
        .pcs-stat-num.laterite { color: var(--pcs-laterite); }
        .pcs-stat-num.ink { color: var(--pcs-deep-green); }

        .pcs-stat-label {
          font-size: 13px;
          color: var(--pcs-muted);
        }

        /* ---------------- SECTION shared ---------------- */
        .pcs-section { padding: 70px 0; }
        .pcs-section-alt { background: #FFFFFF; }

        .pcs-kicker {
          color: var(--pcs-gold);
          font-weight: 600;
          font-size: 12.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pcs-section-title {
          font-size: 30px;
          font-weight: 700;
          color: var(--pcs-deep-green);
          margin: 10px 0 14px;
        }

        .pcs-section-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--pcs-muted);
          margin-bottom: 14px;
        }

        /* ---------------- ABOUT ---------------- */
        .pcs-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .pcs-feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .pcs-feature-card {
          background: var(--pcs-cream);
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 22px 18px;
          text-align: center;
        }

        .pcs-feature-card h6 {
          font-family: 'Work Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          margin: 12px 0 4px;
        }

        .pcs-feature-card small {
          font-size: 12.5px;
          color: var(--pcs-muted);
        }

        /* ---------------- HOW IT WORKS ---------------- */
        .pcs-how-head { text-align: center; max-width: 560px; margin: 0 auto 46px; }

        .pcs-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .pcs-how-card {
          background: var(--pcs-cream);
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
        }

        .pcs-how-card .pcs-step-num {
          margin: 0 auto 14px;
        }

        .pcs-how-card h5 {
          font-size: 16px;
          font-weight: 600;
          font-family: 'Work Sans', sans-serif;
          margin-bottom: 6px;
        }

        .pcs-how-card p {
          font-size: 13px;
          color: var(--pcs-muted);
          margin: 0;
          line-height: 1.55;
        }

        /* ---------------- CTA ---------------- */
        .pcs-cta {
          background: linear-gradient(155deg, var(--pcs-deep-green), var(--pcs-mid-green));
          color: var(--pcs-cream);
          padding: 64px 0;
          text-align: center;
        }

        .pcs-cta h2 {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .pcs-cta p {
          color: rgba(251, 246, 236, 0.78);
          margin-bottom: 28px;
          font-size: 15px;
        }

        /* ---------------- FOOTER ---------------- */
        .pcs-footer {
          background: var(--pcs-ink);
          color: rgba(251, 246, 236, 0.72);
          padding: 46px 0 24px;
        }

        .pcs-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 32px;
          margin-bottom: 26px;
        }

        .pcs-footer h5, .pcs-footer h6 {
          font-family: 'Fraunces', serif;
          color: var(--pcs-cream);
          margin-bottom: 12px;
        }

        .pcs-footer h5 { font-size: 17px; display: flex; align-items: center; gap: 8px; }
        .pcs-footer h6 { font-size: 14px; font-weight: 600; }

        .pcs-footer p { font-size: 13px; line-height: 1.6; margin: 0 0 8px; }

        .pcs-footer a {
          display: block;
          color: rgba(251, 246, 236, 0.68);
          font-size: 13.5px;
          margin-bottom: 8px;
        }
        .pcs-footer a:hover { color: var(--pcs-gold-soft); }

        .pcs-footer-rule {
          height: 1px;
          background: rgba(251, 246, 236, 0.14);
          margin-bottom: 18px;
        }

        .pcs-footer-bottom {
          text-align: center;
          font-size: 12.5px;
          color: rgba(251, 246, 236, 0.5);
        }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 900px) {
          .pcs-hero-grid { grid-template-columns: 1fr; }
          .pcs-about-grid { grid-template-columns: 1fr; }
          .pcs-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .pcs-how-grid { grid-template-columns: repeat(2, 1fr); }
          .pcs-footer-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 760px) {
          .pcs-nav-toggle { display: inline-block; }
          .pcs-nav-links {
            position: absolute;
            top: 58px;
            left: 0;
            right: 0;
            background: var(--pcs-deep-green);
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 16px 24px 20px;
            display: none;
            border-top: 1px solid rgba(228, 200, 120, 0.2);
          }
          .pcs-nav-links.open { display: flex; }
          .pcs-nav-links a { padding: 8px 0; width: 100%; }
          .pcs-hero-title { font-size: 32px; }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <nav className="pcs-nav">
        <div className="pcs-container pcs-nav-row">
          <Link className="pcs-brand-link" to="/">
            <LampMark size={22} />
            Public Complaint System
          </Link>

          <button
            className="pcs-nav-toggle"
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div className={`pcs-nav-links ${navOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <a href="#about">About</a>
            <a href="#how">How It Works</a>
            <a href="#contact">Contact</a>
            <Link to="/login" className="pcs-btn pcs-btn-outline-cream">Login</Link>
            <Link to="/register" className="pcs-btn pcs-btn-gold">Register</Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="pcs-hero">
        <div className="pcs-container pcs-hero-grid">
          <div>
            <span className="pcs-eyebrow">Government of Kerala &middot; Citizen Services</span>

            <h1 className="pcs-hero-title">
              Your voice matters.
              <br />
              <span>We take action.</span>
            </h1>

            <p className="pcs-hero-lead">
              Report civic issues in your ward, panchayat, or municipality &mdash;
              from broken streetlights to waste management &mdash; and follow
              every complaint from filing to resolution, in one place.
            </p>

            <div className="pcs-hero-actions">
              <Link to="/register" className="pcs-btn pcs-btn-primary pcs-btn-lg">
                Register &amp; submit a complaint
              </Link>
              <Link to="/login" className="pcs-btn pcs-btn-outline-primary pcs-btn-lg">
                Login
              </Link>
            </div>
          </div>

          <div className="pcs-process-card">
            <div className="pcs-process-title">How a complaint moves</div>

            <div className="pcs-step">
              <div className="pcs-step-num">1</div>
              <div>
                <h6>Submit complaint</h6>
                <small>Describe the issue and where it's happening.</small>
              </div>
            </div>

            <div className="pcs-step">
              <div className="pcs-step-num">2</div>
              <div>
                <h6>Complaint review</h6>
                <small>The office verifies details and its department.</small>
              </div>
            </div>

            <div className="pcs-step">
              <div className="pcs-step-num">3</div>
              <div>
                <h6>Staff assignment</h6>
                <small>It's routed to the staff member responsible.</small>
              </div>
            </div>

            <div className="pcs-step">
              <div className="pcs-step-num pcs-step-done">✓</div>
              <div>
                <h6>Resolution</h6>
                <small>Track progress until the issue is closed.</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="pcs-stats">
        <div className="pcs-container pcs-stats-grid">
          <div className="pcs-stat-card">
            <div className="pcs-stat-num ink">1,245</div>
            <div className="pcs-stat-label">Total complaints</div>
          </div>
          <div className="pcs-stat-card">
            <div className="pcs-stat-num green">985</div>
            <div className="pcs-stat-label">Resolved complaints</div>
          </div>
          <div className="pcs-stat-card">
            <div className="pcs-stat-num gold">186</div>
            <div className="pcs-stat-label">Pending complaints</div>
          </div>
          <div className="pcs-stat-card">
            <div className="pcs-stat-num laterite">12</div>
            <div className="pcs-stat-label">Departments</div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="pcs-section pcs-section-alt">
        <div className="pcs-container pcs-about-grid">
          <div>
            <span className="pcs-kicker">About the system</span>
            <h2 className="pcs-section-title">Making public complaints simple</h2>

            <p className="pcs-section-text">
              The Public Complaint Management System is a centralized digital
              platform that lets citizens report public issues and follow
              their complaints from a single dashboard.
            </p>

            <p className="pcs-section-text">
              Each complaint is reviewed by an administrator and assigned to
              the staff member responsible, so nothing sits unattended.
            </p>

            <Link to="/register" className="pcs-btn pcs-btn-primary" style={{ marginTop: "8px" }}>
              Get started
            </Link>
          </div>

          <div className="pcs-feature-grid">
            <div className="pcs-feature-card">
              <IconSubmit />
              <h6>Easy complaints</h6>
              <small>Submit complaints online</small>
            </div>
            <div className="pcs-feature-card">
              <IconTrack />
              <h6>Track status</h6>
              <small>Monitor your complaint</small>
            </div>
            <div className="pcs-feature-card">
              <IconBell />
              <h6>Notifications</h6>
              <small>Receive status updates</small>
            </div>
            <div className="pcs-feature-card">
              <IconStar />
              <h6>Feedback</h6>
              <small>Rate the resolution</small>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="pcs-section">
        <div className="pcs-container">
          <div className="pcs-how-head">
            <span className="pcs-kicker">Simple process</span>
            <h2 className="pcs-section-title">How it works</h2>
            <p className="pcs-section-text">
              Resolve your complaint through four straightforward steps.
            </p>
          </div>

          <div className="pcs-how-grid">
            <div className="pcs-how-card">
              <div className="pcs-step-num"><IconRegister /></div>
              <h5>1. Register</h5>
              <p>Create your account to access the complaint portal.</p>
            </div>
            <div className="pcs-how-card">
              <div className="pcs-step-num"><IconSubmit /></div>
              <h5>2. Submit</h5>
              <p>Share the details of your public complaint.</p>
            </div>
            <div className="pcs-how-card">
              <div className="pcs-step-num pcs-step-done"><IconWrench /></div>
              <h5>3. Resolve</h5>
              <p>Assigned staff work on resolving the issue.</p>
            </div>
            <div className="pcs-how-card">
              <div className="pcs-step-num pcs-step-done"><IconStar /></div>
              <h5>4. Feedback</h5>
              <p>Rate your experience once it's resolved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pcs-cta">
        <div className="pcs-container">
          <h2>Have a public issue?</h2>
          <p>Register now and submit your complaint.</p>
          <Link to="/register" className="pcs-btn pcs-btn-laterite pcs-btn-lg">
            Register now
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="pcs-footer">
        <div className="pcs-container">
          <div className="pcs-footer-grid">
            <div>
              <h5><LampMark size={18} /> Public Complaint System</h5>
              <p>
                A digital platform for transparent and efficient public
                complaint management across Kerala.
              </p>
            </div>

            <div>
              <h6>Quick links</h6>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>

            <div>
              <h6>Contact</h6>
              <p>support@complaints.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="pcs-footer-rule" />
          <p className="pcs-footer-bottom">© 2026 Public Complaint System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;