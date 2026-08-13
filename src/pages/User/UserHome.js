import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LampMark = ({ size = 22 }) => (
  <svg width={size} height={size * 1.26} viewBox="0 0 46 58" fill="none" aria-hidden="true">
    <path d="M23 4C23 4 15 14 15 22C15 27.5 18.5 31 23 31C27.5 31 31 27.5 31 22C31 14 23 4 23 4Z" fill="var(--pcs-gold-soft)" />
    <path d="M23 10C23 10 19 16 19 21C19 24 20.8 26 23 26C25.2 26 27 24 27 21C27 16 23 10 23 10Z" fill="#FFE8A3" />
    <rect x="21.4" y="30" width="3.2" height="14" fill="var(--pcs-gold)" />
    <path d="M10 44C10 40 15.5 38 23 38C30.5 38 36 40 36 44C36 48 30.5 47 23 47C15.5 47 10 48 10 44Z" fill="var(--pcs-gold)" />
    <ellipse cx="23" cy="44" rx="13" ry="3" fill="var(--pcs-deep-green)" opacity="0.35" />
  </svg>
);

const UserHome = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Sample data – replace with real API data
  const complaints = [
    {
      id: "CMP-2026-0142",
      category: "Street Light",
      description: "Street light not working near Ward 7 bus stop",
      location: "Ward 7, Near Bus Stop",
      status: "In Progress",
      department: "Electrical",
      date: "10 Aug 2026",
      assigned: "Ravi Kumar",
    },
    {
      id: "CMP-2026-0118",
      category: "Waste Management",
      description: "Garbage not collected for 4 days",
      location: "Ward 3, Main Road",
      status: "Resolved",
      department: "Sanitation",
      date: "02 Aug 2026",
      assigned: "Anitha S",
    },
    {
      id: "CMP-2026-0095",
      category: "Road",
      description: "Large pothole causing traffic issues",
      location: "Ward 5, Market Road",
      status: "Pending",
      department: "Public Works",
      date: "28 Jul 2026",
      assigned: "—",
    },
  ];

  const notifications = [
    { id: 1, text: "Your complaint CMP-2026-0142 has been assigned to Electrical department", time: "2 hours ago", unread: true },
    { id: 2, text: "Staff requested additional information for CMP-2026-0118", time: "1 day ago", unread: true },
    { id: 3, text: "Complaint CMP-2026-0095 is under review", time: "3 days ago", unread: false },
  ];

  const statusColor = (status) => {
    if (status === "Resolved") return "var(--pcs-mid-green)";
    if (status === "In Progress") return "var(--pcs-gold)";
    return "var(--pcs-laterite)";
  };

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

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pcs-page {
          font-family: 'Work Sans', sans-serif;
          color: var(--pcs-ink);
          background: var(--pcs-cream);
          min-height: 100vh;
        }

        .pcs-page a { text-decoration: none; color: inherit; }

        .pcs-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        h1, h2, h3, h4 {
          font-family: 'Fraunces', serif;
        }

        /* -------- NAV -------- */
        .pcs-nav {
          background: var(--pcs-deep-green);
          padding: 14px 0;
          position: sticky;
          top: 0;
          z-index: 50;
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
          font-size: 17px;
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
          gap: 22px;
        }

        .pcs-nav-links a, .pcs-nav-links button {
          color: rgba(251, 246, 236, 0.82);
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .pcs-nav-links a:hover, .pcs-nav-links button:hover {
          color: var(--pcs-gold-soft);
        }

        .pcs-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .pcs-btn-gold {
          background: var(--pcs-gold);
          color: var(--pcs-deep-green);
        }
        .pcs-btn-gold:hover { background: var(--pcs-gold-soft); }

        .pcs-btn-primary {
          background: var(--pcs-deep-green);
          color: var(--pcs-gold-soft);
        }
        .pcs-btn-primary:hover { background: var(--pcs-mid-green); }

        .pcs-btn-outline {
          background: transparent;
          color: var(--pcs-deep-green);
          border-color: var(--pcs-deep-green);
        }
        .pcs-btn-outline:hover {
          background: var(--pcs-deep-green);
          color: var(--pcs-gold-soft);
        }

        .pcs-btn-sm {
          padding: 6px 12px;
          font-size: 12.5px;
        }

        /* -------- LAYOUT -------- */
        .pcs-main {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          padding: 28px 0 48px;
          min-height: calc(100vh - 60px);
        }

        /* -------- SIDEBAR -------- */
        .pcs-sidebar {
          background: #FFFFFF;
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 20px 14px;
          height: fit-content;
          position: sticky;
          top: 80px;
        }

        .pcs-user-card {
          text-align: center;
          padding: 12px 8px 18px;
          border-bottom: 1px solid #ECE7D9;
          margin-bottom: 14px;
        }

        .pcs-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--pcs-cream);
          border: 2.5px solid var(--pcs-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          font-size: 26px;
        }

        .pcs-user-name {
          font-weight: 600;
          font-size: 15px;
          color: var(--pcs-deep-green);
        }

        .pcs-user-role {
          font-size: 12px;
          color: var(--pcs-muted);
          margin-top: 2px;
        }

        .pcs-side-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--pcs-ink);
          cursor: pointer;
          transition: background 0.12s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }

        .pcs-side-link:hover {
          background: rgba(30, 92, 62, 0.07);
        }

        .pcs-side-link.active {
          background: rgba(30, 92, 62, 0.12);
          color: var(--pcs-deep-green);
          font-weight: 600;
        }

        .pcs-side-icon {
          width: 20px;
          text-align: center;
          font-size: 15px;
        }

        /* -------- CONTENT -------- */
        .pcs-content {
          min-width: 0;
        }

        .pcs-page-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--pcs-deep-green);
          margin-bottom: 6px;
        }

        .pcs-page-sub {
          font-size: 14px;
          color: var(--pcs-muted);
          margin-bottom: 24px;
        }

        /* Stats */
        .pcs-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .pcs-stat {
          background: #FFFFFF;
          border: 1px solid #ECE7D9;
          border-radius: 12px;
          padding: 18px 16px;
          text-align: center;
        }

        .pcs-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .pcs-stat-label {
          font-size: 12.5px;
          color: var(--pcs-muted);
        }

        /* Cards */
        .pcs-card {
          background: #FFFFFF;
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 20px;
        }

        .pcs-card-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Complaint list */
        .pcs-complaint-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid #F0EBE0;
          cursor: pointer;
          transition: background 0.1s ease;
        }

        .pcs-complaint-item:last-child { border-bottom: none; }
        .pcs-complaint-item:hover { background: rgba(251, 246, 236, 0.6); }

        .pcs-cmp-id {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--pcs-mid-green);
          margin-bottom: 3px;
        }

        .pcs-cmp-desc {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .pcs-cmp-meta {
          font-size: 12.5px;
          color: var(--pcs-muted);
        }

        .pcs-status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
        }

        /* Form */
        .pcs-field {
          margin-bottom: 16px;
        }

        .pcs-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--pcs-deep-green);
          margin-bottom: 6px;
        }

        .pcs-input, .pcs-select, .pcs-textarea {
          width: 100%;
          padding: 11px 13px;
          font-size: 14px;
          font-family: 'Work Sans', sans-serif;
          border: 1.5px solid #DDE3DB;
          border-radius: 9px;
          background: #FFFEF9;
          color: var(--pcs-ink);
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .pcs-input:focus, .pcs-select:focus, .pcs-textarea:focus {
          outline: none;
          border-color: var(--pcs-gold);
          box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.15);
        }

        .pcs-textarea { resize: vertical; min-height: 90px; }

        .pcs-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* Notifications */
        .pcs-notif-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #F0EBE0;
        }

        .pcs-notif-item:last-child { border-bottom: none; }

        .pcs-notif-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--pcs-laterite);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .pcs-notif-dot.read { background: #C5CFC8; }

        .pcs-notif-text { font-size: 13.5px; line-height: 1.45; }
        .pcs-notif-time { font-size: 12px; color: var(--pcs-muted); margin-top: 3px; }

        /* Detail view */
        .pcs-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
          margin-bottom: 20px;
        }

        .pcs-detail-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--pcs-muted);
          margin-bottom: 3px;
        }

        .pcs-detail-value {
          font-size: 14.5px;
          font-weight: 500;
        }

        .pcs-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }

        /* Chat */
        .pcs-chat-box {
          background: var(--pcs-cream);
          border-radius: 10px;
          padding: 16px;
          max-height: 260px;
          overflow-y: auto;
          margin-bottom: 12px;
        }

        .pcs-chat-msg {
          margin-bottom: 12px;
          max-width: 80%;
        }

        .pcs-chat-msg.staff {
          margin-right: auto;
        }

        .pcs-chat-msg.user {
          margin-left: auto;
          text-align: right;
        }

        .pcs-chat-bubble {
          display: inline-block;
          padding: 9px 13px;
          border-radius: 12px;
          font-size: 13.5px;
          line-height: 1.45;
        }

        .pcs-chat-msg.staff .pcs-chat-bubble {
          background: #FFFFFF;
          border: 1px solid #E5E0D4;
        }

        .pcs-chat-msg.user .pcs-chat-bubble {
          background: var(--pcs-deep-green);
          color: var(--pcs-cream);
        }

        .pcs-chat-meta {
          font-size: 11px;
          color: var(--pcs-muted);
          margin-top: 3px;
        }

        .pcs-chat-input-row {
          display: flex;
          gap: 10px;
        }

        .pcs-chat-input-row .pcs-input { flex: 1; }

        /* Rating */
        .pcs-stars {
          display: flex;
          gap: 6px;
          margin: 10px 0 16px;
        }

        .pcs-star {
          font-size: 26px;
          cursor: pointer;
          color: #DDE3DB;
          transition: color 0.1s;
        }

        .pcs-star.active { color: var(--pcs-gold); }

        /* Empty */
        .pcs-empty {
          text-align: center;
          padding: 40px 20px;
          color: var(--pcs-muted);
          font-size: 14px;
        }

        /* -------- RESPONSIVE -------- */
        @media (max-width: 900px) {
          .pcs-main {
            grid-template-columns: 1fr;
          }
          .pcs-sidebar {
            position: static;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 14px;
          }
          .pcs-user-card { display: none; }
          .pcs-side-link {
            width: auto;
            padding: 8px 12px;
            font-size: 13px;
          }
          .pcs-stats-row { grid-template-columns: repeat(2, 1fr); }
          .pcs-form-row, .pcs-detail-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .pcs-nav-toggle { display: inline-block; }
          .pcs-nav-links {
            position: absolute;
            top: 56px;
            left: 0;
            right: 0;
            background: var(--pcs-deep-green);
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 14px 20px 18px;
            display: none;
            border-top: 1px solid rgba(228, 200, 120, 0.2);
          }
          .pcs-nav-links.open { display: flex; }
          .pcs-stats-row { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <nav className="pcs-nav">
        <div className="pcs-container pcs-nav-row">
          <Link className="pcs-brand-link" to="/">
            <LampMark />
            Public Complaint System
          </Link>

          <button
            className="pcs-nav-toggle"
            type="button"
            onClick={() => setNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <div className={`pcs-nav-links ${navOpen ? "open" : ""}`}>
            <button type="button" onClick={() => setActiveTab("dashboard")}>Dashboard</button>
            <button type="button" onClick={() => { setActiveTab("complaints"); setShowComplaintForm(false); }}>My Complaints</button>
            <button type="button" onClick={() => setActiveTab("notifications")}>Notifications</button>
            <button type="button" onClick={() => setActiveTab("profile")}>Profile</button>
            <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">Logout</Link>
          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <div className="pcs-container pcs-main">
        {/* Sidebar */}
        <aside className="pcs-sidebar">
          <div className="pcs-user-card">
            <div className="pcs-avatar">👤</div>
            <div className="pcs-user-name">Anand Krishnan</div>
            <div className="pcs-user-role">Citizen · Ward 7</div>
          </div>

          <button
            className={`pcs-side-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}
          >
            <span className="pcs-side-icon">🏠</span> Dashboard
          </button>


          <button
  className="pcs-side-link"
  onClick={() => navigate("/user/submit-complaint")}
>
  📝 Submit Complaint
</button>

<button
  className="pcs-side-link"
  onClick={() => navigate("/user/my-complaints")}
>
  📋 My Complaints
</button>
         
          <button
            className={`pcs-side-link ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="pcs-side-icon">🔔</span> Notifications
          </button>


          <button
  className={`pcs-side-link ${
    activeTab === "profile" ? "active" : ""
  }`}
  onClick={() => navigate("/user/profile")}
>
  <span className="pcs-side-icon">👤</span>
  Profile
</button>
         
        </aside>

        {/* Content Area */}
        <div className="pcs-content">

          {/* ========== DASHBOARD ========== */}
          {activeTab === "dashboard" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">Welcome back</h1>
              <p className="pcs-page-sub">Here’s an overview of your complaints and recent activity.</p>

              <div className="pcs-stats-row">
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>3</div>
                  <div className="pcs-stat-label">Total Complaints</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>1</div>
                  <div className="pcs-stat-label">In Progress</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>1</div>
                  <div className="pcs-stat-label">Resolved</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-laterite)" }}>1</div>
                  <div className="pcs-stat-label">Pending</div>
                </div>
              </div>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Recent Complaints
                  <button className="pcs-btn pcs-btn-primary pcs-btn-sm" onClick={() => { setActiveTab("submit"); setShowComplaintForm(true); }}>
                    + New Complaint
                  </button>
                </div>

                {complaints.map((c) => (
                  <div
                    key={c.id}
                    className="pcs-complaint-item"
                    onClick={() => { setSelectedComplaint(c); setActiveTab("complaints"); }}
                  >
                    <div>
                      <div className="pcs-cmp-id">{c.id}</div>
                      <div className="pcs-cmp-desc">{c.description}</div>
                      <div className="pcs-cmp-meta">{c.category} · {c.location} · {c.date}</div>
                    </div>
                    <span className="pcs-status-badge" style={{ background: statusColor(c.status) }}>
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pcs-card">
                <div className="pcs-card-title">Latest Notifications</div>
                {notifications.slice(0, 3).map((n) => (
                  <div key={n.id} className="pcs-notif-item">
                    <div className={`pcs-notif-dot ${n.unread ? "" : "read"}`} />
                    <div>
                      <div className="pcs-notif-text">{n.text}</div>
                      <div className="pcs-notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ========== SUBMIT COMPLAINT ========== */}
          {(activeTab === "submit" || showComplaintForm) && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">Submit Complaint</h1>
              <p className="pcs-page-sub">Describe the issue clearly so it can be routed to the right department.</p>

              <div className="pcs-card">
                <form onSubmit={(e) => { e.preventDefault(); alert("Complaint submitted (demo)"); setShowComplaintForm(false); setActiveTab("complaints"); }}>
                  <div className="pcs-form-row">
                    <div className="pcs-field">
                      <label className="pcs-label">Category</label>
                      <select className="pcs-select" required>
                        <option value="">Select category</option>
                        <option>Street Light</option>
                        <option>Waste Management</option>
                        <option>Road / Pothole</option>
                        <option>Water Supply</option>
                        <option>Drainage</option>
                        <option>Public Toilet</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="pcs-field">
                      <label className="pcs-label">Location</label>
                      <input className="pcs-input" type="text" placeholder="Ward, landmark or area" required />
                    </div>
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Description</label>
                    <textarea className="pcs-textarea" placeholder="Describe the issue in detail..." required />
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Upload Image / Document</label>
                    <input className="pcs-input" type="file" accept="image/*,.pdf" />
                  </div>

                  <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                    <button type="submit" className="pcs-btn pcs-btn-primary">Submit Complaint</button>
                    <button type="button" className="pcs-btn pcs-btn-outline" onClick={() => { setShowComplaintForm(false); setActiveTab("dashboard"); }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {/* ========== COMPLAINT LIST ========== */}
          {activeTab === "complaints" && !selectedComplaint && !showComplaintForm && (
            <>
              <h1 className="pcs-page-title">My Complaints</h1>
              <p className="pcs-page-sub">View history, track status and take further action.</p>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Complaint History
                  <button className="pcs-btn pcs-btn-primary pcs-btn-sm" onClick={() => { setActiveTab("submit"); setShowComplaintForm(true); }}>
                    + New
                  </button>
                </div>

                {complaints.length === 0 ? (
                  <div className="pcs-empty">No complaints yet. Submit your first one.</div>
                ) : (
                  complaints.map((c) => (
                    <div
                      key={c.id}
                      className="pcs-complaint-item"
                      onClick={() => setSelectedComplaint(c)}
                    >
                      <div>
                        <div className="pcs-cmp-id">{c.id}</div>
                        <div className="pcs-cmp-desc">{c.description}</div>
                        <div className="pcs-cmp-meta">
                          {c.category} · {c.department} · {c.date}
                        </div>
                      </div>
                      <span className="pcs-status-badge" style={{ background: statusColor(c.status) }}>
                        {c.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ========== COMPLAINT DETAIL ========== */}
          {selectedComplaint && (
            <>
              <button
                className="pcs-btn pcs-btn-outline pcs-btn-sm"
                style={{ marginBottom: "16px" }}
                onClick={() => setSelectedComplaint(null)}
              >
                ← Back to list
              </button>

              <h1 className="pcs-page-title">{selectedComplaint.id}</h1>
              <p className="pcs-page-sub">{selectedComplaint.description}</p>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Complaint Details
                  <span className="pcs-status-badge" style={{ background: statusColor(selectedComplaint.status) }}>
                    {selectedComplaint.status}
                  </span>
                </div>

                <div className="pcs-detail-grid">
                  <div>
                    <div className="pcs-detail-label">Category</div>
                    <div className="pcs-detail-value">{selectedComplaint.category}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Location</div>
                    <div className="pcs-detail-value">{selectedComplaint.location}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Assigned Department</div>
                    <div className="pcs-detail-value">{selectedComplaint.department}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Assigned Staff</div>
                    <div className="pcs-detail-value">{selectedComplaint.assigned}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Submitted On</div>
                    <div className="pcs-detail-value">{selectedComplaint.date}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Status</div>
                    <div className="pcs-detail-value">{selectedComplaint.status}</div>
                  </div>
                </div>

                <div className="pcs-actions-row">
                  {selectedComplaint.status === "In Progress" && (
                    <>
                      <button className="pcs-btn pcs-btn-outline pcs-btn-sm">Add Additional Info</button>
                      <button className="pcs-btn pcs-btn-outline pcs-btn-sm">Chat with Staff</button>
                    </>
                  )}
                  {selectedComplaint.status === "Resolved" && (
                    <>
                      <button className="pcs-btn pcs-btn-primary pcs-btn-sm">Confirm Resolution</button>
                      <button className="pcs-btn pcs-btn-outline pcs-btn-sm">Reopen Complaint</button>
                      <button className="pcs-btn pcs-btn-outline pcs-btn-sm">Give Feedback</button>
                    </>
                  )}
                  {selectedComplaint.status === "Pending" && (
                    <button className="pcs-btn pcs-btn-outline pcs-btn-sm">Add Additional Info</button>
                  )}
                </div>
              </div>

              {/* Chat / Communication */}
              <div className="pcs-card">
                <div className="pcs-card-title">Communication with Staff</div>
                <div className="pcs-chat-box">
                  <div className="pcs-chat-msg staff">
                    <div className="pcs-chat-bubble">We have received your complaint and assigned it to the Electrical team.</div>
                    <div className="pcs-chat-meta">Staff · 10 Aug 2026, 11:20 AM</div>
                  </div>
                  <div className="pcs-chat-msg user">
                    <div className="pcs-chat-bubble">Thank you. The light is still not working as of this morning.</div>
                    <div className="pcs-chat-meta">You · 10 Aug 2026, 02:45 PM</div>
                  </div>
                  <div className="pcs-chat-msg staff">
                    <div className="pcs-chat-bubble">Technician will visit tomorrow morning. Please keep the area accessible.</div>
                    <div className="pcs-chat-meta">Staff · 11 Aug 2026, 09:10 AM</div>
                  </div>
                </div>
                <div className="pcs-chat-input-row">
                  <input className="pcs-input" type="text" placeholder="Type a message..." />
                  <button className="pcs-btn pcs-btn-primary">Send</button>
                </div>
              </div>

              {/* Feedback (shown when resolved) */}
              {selectedComplaint.status === "Resolved" && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Feedback & Rating</div>
                  <p style={{ fontSize: "13.5px", color: "var(--pcs-muted)", marginBottom: "8px" }}>
                    How satisfied are you with the resolution?
                  </p>
                  <div className="pcs-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className={`pcs-star ${s <= 4 ? "active" : ""}`}>★</span>
                    ))}
                  </div>
                  <div className="pcs-field">
                    <label className="pcs-label">Your feedback</label>
                    <textarea className="pcs-textarea" placeholder="Share your experience (optional)" rows={3} />
                  </div>
                  <button className="pcs-btn pcs-btn-primary">Submit Feedback</button>
                </div>
              )}

              {/* Resolution Details */}
              {selectedComplaint.status === "Resolved" && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Resolution Details</div>
                  <div className="pcs-detail-grid">
                    <div>
                      <div className="pcs-detail-label">Resolved On</div>
                      <div className="pcs-detail-value">08 Aug 2026</div>
                    </div>
                    <div>
                      <div className="pcs-detail-label">Resolved By</div>
                      <div className="pcs-detail-value">Anitha S (Sanitation)</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="pcs-detail-label">Resolution Note</div>
                    <div className="pcs-detail-value" style={{ marginTop: "4px", lineHeight: 1.5 }}>
                      Garbage collection schedule restored. Extra vehicle deployed for the area. Issue closed after verification.
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========== NOTIFICATIONS ========== */}
          {activeTab === "notifications" && (
            <>
              <h1 className="pcs-page-title">Notifications</h1>
              <p className="pcs-page-sub">Stay updated on the progress of your complaints.</p>

              <div className="pcs-card">
                {notifications.map((n) => (
                  <div key={n.id} className="pcs-notif-item">
                    <div className={`pcs-notif-dot ${n.unread ? "" : "read"}`} />
                    <div>
                      <div className="pcs-notif-text">{n.text}</div>
                      <div className="pcs-notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

       
        </div>
      </div>
    </div>
  );
};

export default UserHome;