import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/Api";

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
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Profile
  const [profile, setProfile] = useState(null);

  // Complaints
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifLoading, setNotifLoading] = useState(true);

  // Feedback
  const [rating, setRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const userId = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");

  // ---------- Format time ----------
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ---------- Fetch Profile ----------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("view_my_profile/");
        if (res.data.status === "success") {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("Profile load error:", err);
      }
    };
    fetchProfile();
  }, []);

  // ---------- Fetch Complaints ----------
  useEffect(() => {
    const fetchComplaints = async () => {
      if (!userId) {
        setError("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await API.get(`my_complaints/?user_id=${userId}`);
        const json = res.data;

        if (json.status === "success") {
          const mapped = json.data.map((c) => ({
            id: c.id,
            title: c.title || "",
            category: c.category || "—",
            description: c.description || "",
            location: c.location || "—",
            status: c.status || "SUBMITTED",
            department: c.department || "—",
            assigned: c.assigned_staff || "—",
            priority: c.priority || "—",
            admin_note: c.admin_note || "",
            staff_note: c.staff_note || "",
            image: c.image || null,
            date: c.submitted_at
              ? new Date(c.submitted_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—",
            submitted_at: c.submitted_at,
            assigned_at: c.assigned_at,
            resolved_at: c.resolved_at,
            closed_at: c.closed_at,
            has_feedback: c.has_feedback || false,
          }));
          setComplaints(mapped);
        } else {
          setError(json.message || "Failed to load complaints");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  // ---------- Fetch Notifications ----------
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId) {
        setNotifLoading(false);
        return;
      }

      try {
        setNotifLoading(true);
        const res = await API.get(`my_notifications/?user_id=${userId}`);
        const json = res.data;

        if (json.status === "success") {
          setNotifications(json.data || []);
          setUnreadCount(json.unread_count || 0);
        }
      } catch (err) {
        console.error("Notifications error:", err);
      } finally {
        setNotifLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  // ---------- Submit Feedback ----------
  const handleSubmitFeedback = async () => {
    if (rating < 1 || rating > 5) {
      alert("Please select a rating (1 to 5 stars)");
      return;
    }

    try {
      setSubmittingFeedback(true);

      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("user_id", userId);
      formData.append("rating", rating);
      formData.append("comment", feedbackComment);

      const res = await API.post("submit_feedback/", formData);

      if (res.data.status === "success") {
        alert("Thank you! Your feedback has been submitted.");
        setFeedbackSubmitted(true);
        setRating(0);
        setFeedbackComment("");
      } else {
        alert(res.data.message || "Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // ---------- Helpers ----------
  const statusColor = (status) => {
    const s = (status || "").toUpperCase();
    if (["RESOLVED", "CLOSED"].includes(s)) return "var(--pcs-mid-green)";
    if (["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(s)) return "var(--pcs-gold)";
    if (s === "REJECTED") return "var(--pcs-laterite)";
    return "var(--pcs-deep-green)";
  };

  const isResolved = (status) =>
    ["RESOLVED", "CLOSED"].includes((status || "").toUpperCase());

  const total = complaints.length;
  const inProgress = complaints.filter((c) =>
    ["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes((c.status || "").toUpperCase())
  ).length;
  const resolved = complaints.filter((c) => isResolved(c.status)).length;
  const pending = complaints.filter((c) =>
    ["SUBMITTED", "PENDING"].includes((c.status || "").toUpperCase())
  ).length;

  const openComplaint = (c) => {
    setSelectedComplaint(c);
    setActiveTab("complaints");
    setFeedbackSubmitted(c.has_feedback || false);
    setRating(0);
    setFeedbackComment("");
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
          color: #fff;
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

        .pcs-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .pcs-main {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          padding: 28px 0 48px;
          min-height: calc(100vh - 60px);
        }

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
          font-size: 22px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          overflow: hidden;
        }

        .pcs-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .pcs-badge-count {
          background: var(--pcs-laterite);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
          margin-left: auto;
        }

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

        .pcs-stars {
          display: flex;
          gap: 6px;
          margin: 10px 0 16px;
        }

        .pcs-star {
          font-size: 28px;
          cursor: pointer;
          color: #DDE3DB;
          transition: color 0.1s;
          user-select: none;
        }

        .pcs-star.active {
          color: var(--pcs-gold);
        }

        .pcs-empty, .pcs-loading, .pcs-error {
          text-align: center;
          padding: 40px 20px;
          color: var(--pcs-muted);
          font-size: 14px;
        }
        .pcs-error { color: var(--pcs-laterite); }

        .pcs-complaint-image {
          max-width: 100%;
          max-height: 280px;
          border-radius: 10px;
          margin-top: 12px;
          border: 1px solid #ECE7D9;
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
        }

        .pcs-input:focus, .pcs-select:focus, .pcs-textarea:focus {
          outline: none;
          border-color: var(--pcs-gold);
          box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.15);
        }

        .pcs-textarea {
          resize: vertical;
          min-height: 90px;
        }

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

        .pcs-notif-item {
          display: flex;
          gap: 12px;
          padding: 14px 0;
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

        .pcs-notif-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          margin-bottom: 2px;
        }

        .pcs-notif-text {
          font-size: 13.5px;
          line-height: 1.45;
        }

        .pcs-notif-time {
          font-size: 12px;
          color: var(--pcs-muted);
          margin-top: 4px;
        }

        .pcs-notif-type {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(30, 92, 62, 0.1);
          color: var(--pcs-mid-green);
          margin-left: 8px;
        }

        @media (max-width: 900px) {
          .pcs-main { grid-template-columns: 1fr; }
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
          .pcs-detail-grid { grid-template-columns: 1fr; }
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

      {/* NAVBAR */}
      <nav className="pcs-nav">
        <div className="pcs-container pcs-nav-row">
          <Link className="pcs-brand-link" to="/" style={{ color: "#fff" }}>
            <LampMark /> Public Complaint System
          </Link>

          <button
            className="pcs-nav-toggle"
            type="button"
            onClick={() => setNavOpen((o) => !o)}
          >
            ☰
          </button>

          <div className={`pcs-nav-links ${navOpen ? "open" : ""}`}>
            <button onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}>
              Dashboard
            </button>
            <button onClick={() => { setActiveTab("complaints"); setSelectedComplaint(null); }}>
              My Complaints
            </button>
            <button onClick={() => setActiveTab("notifications")}>
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <button onClick={() => navigate("/user/profile")}>Profile</button>
            <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <div className="pcs-container pcs-main">
        {/* SIDEBAR */}
        <aside className="pcs-sidebar">
          <div className="pcs-user-card">
            <div className="pcs-avatar">
              {profile?.profile_image ? (
                <img src={profile.profile_image} alt="Avatar" />
              ) : (
                (profile?.name?.charAt(0) || "U").toUpperCase()
              )}
            </div>
            <div className="pcs-user-name">
              {profile?.name || "User"}
            </div>
            <div className="pcs-user-role">
              @{profile?.username || "citizen"}
            </div>
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
            <span className="pcs-side-icon">📝</span> Submit Complaint
          </button>

          <button
            className={`pcs-side-link ${activeTab === "complaints" ? "active" : ""}`}
            onClick={() => { setActiveTab("complaints"); setSelectedComplaint(null); }}
          >
            <span className="pcs-side-icon">📋</span> My Complaints
          </button>

          <button
            className={`pcs-side-link ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="pcs-side-icon">🔔</span> Notifications
            {unreadCount > 0 && <span className="pcs-badge-count">{unreadCount}</span>}
          </button>

          <button
            className="pcs-side-link"
            onClick={() => navigate("/user/profile")}
          >
            <span className="pcs-side-icon">👤</span> Profile
          </button>
        </aside>

        {/* CONTENT */}
        <div className="pcs-content">
          {loading && <div className="pcs-loading">Loading your complaints...</div>}
          {error && !loading && <div className="pcs-error">{error}</div>}

          {/* DASHBOARD */}
          {!loading && !error && activeTab === "dashboard" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">
                Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}
              </h1>
              <p className="pcs-page-sub">Here’s an overview of your complaints and recent activity.</p>

              <div className="pcs-stats-row">
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
                  <div className="pcs-stat-label">Total Complaints</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{inProgress}</div>
                  <div className="pcs-stat-label">In Progress</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
                  <div className="pcs-stat-label">Resolved</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-laterite)" }}>{pending}</div>
                  <div className="pcs-stat-label">Pending</div>
                </div>
              </div>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Recent Complaints
                  <button
                    className="pcs-btn pcs-btn-primary pcs-btn-sm"
                    onClick={() => navigate("/user/submit-complaint")}
                  >
                    + New Complaint
                  </button>
                </div>

                {complaints.length === 0 ? (
                  <div className="pcs-empty">No complaints yet.</div>
                ) : (
                  complaints.slice(0, 5).map((c) => (
                    <div
                      key={c.id}
                      className="pcs-complaint-item"
                      onClick={() => openComplaint(c)}
                    >
                      <div>
                        <div className="pcs-cmp-id">
                          #{c.id} {c.title && `· ${c.title}`}
                        </div>
                        <div className="pcs-cmp-desc">{c.description}</div>
                        <div className="pcs-cmp-meta">
                          {c.category} · {c.location} · {c.date}
                        </div>
                      </div>
                      <span
                        className="pcs-status-badge"
                        style={{ background: statusColor(c.status) }}
                      >
                        {c.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Latest Notifications
                  {unreadCount > 0 && (
                    <span style={{ fontSize: "13px", color: "var(--pcs-laterite)", fontWeight: 600 }}>
                      {unreadCount} unread
                    </span>
                  )}
                </div>

                {notifLoading ? (
                  <div className="pcs-empty">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="pcs-empty">No notifications yet.</div>
                ) : (
                  notifications.slice(0, 4).map((n) => (
                    <div key={n.id} className="pcs-notif-item">
                      <div className={`pcs-notif-dot ${n.is_read ? "read" : ""}`} />
                      <div>
                        <div className="pcs-notif-title">
                          {n.title}
                          {n.notification_type && (
                            <span className="pcs-notif-type">{n.notification_type}</span>
                          )}
                        </div>
                        <div className="pcs-notif-text">{n.message}</div>
                        <div className="pcs-notif-time">{formatTime(n.created_at)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* COMPLAINT LIST */}
          {!loading && !error && activeTab === "complaints" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">My Complaints</h1>
              <p className="pcs-page-sub">View history, track status and take further action.</p>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Complaint History
                  <button
                    className="pcs-btn pcs-btn-primary pcs-btn-sm"
                    onClick={() => navigate("/user/submit-complaint")}
                  >
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
                      onClick={() => openComplaint(c)}
                    >
                      <div>
                        <div className="pcs-cmp-id">
                          #{c.id} {c.title && `· ${c.title}`}
                        </div>
                        <div className="pcs-cmp-desc">{c.description}</div>
                        <div className="pcs-cmp-meta">
                          {c.category} · {c.department} · {c.date}
                        </div>
                      </div>
                      <span
                        className="pcs-status-badge"
                        style={{ background: statusColor(c.status) }}
                      >
                        {c.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* COMPLAINT DETAIL */}
          {selectedComplaint && (
            <>
              <button
                className="pcs-btn pcs-btn-outline pcs-btn-sm"
                style={{ marginBottom: "16px" }}
                onClick={() => setSelectedComplaint(null)}
              >
                ← Back to list
              </button>

              <h1 className="pcs-page-title">
                #{selectedComplaint.id}
                {selectedComplaint.title ? ` · ${selectedComplaint.title}` : ""}
              </h1>
              <p className="pcs-page-sub">{selectedComplaint.description}</p>

              <div className="pcs-card">
                <div className="pcs-card-title">
                  Complaint Details
                  <span
                    className="pcs-status-badge"
                    style={{ background: statusColor(selectedComplaint.status) }}
                  >
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
                    <div className="pcs-detail-label">Department</div>
                    <div className="pcs-detail-value">{selectedComplaint.department}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Assigned Staff</div>
                    <div className="pcs-detail-value">{selectedComplaint.assigned}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Priority</div>
                    <div className="pcs-detail-value">{selectedComplaint.priority}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Submitted On</div>
                    <div className="pcs-detail-value">{selectedComplaint.date}</div>
                  </div>
                  {selectedComplaint.assigned_at && (
                    <div>
                      <div className="pcs-detail-label">Assigned At</div>
                      <div className="pcs-detail-value">
                        {new Date(selectedComplaint.assigned_at).toLocaleString("en-IN")}
                      </div>
                    </div>
                  )}
                  {selectedComplaint.resolved_at && (
                    <div>
                      <div className="pcs-detail-label">Resolved At</div>
                      <div className="pcs-detail-value">
                        {new Date(selectedComplaint.resolved_at).toLocaleString("en-IN")}
                      </div>
                    </div>
                  )}
                </div>

                {selectedComplaint.image && (
                  <div style={{ marginTop: "12px" }}>
                    <div className="pcs-detail-label">Attached Image</div>
                    <img
                      src={selectedComplaint.image}
                      alt="Complaint"
                      className="pcs-complaint-image"
                    />
                  </div>
                )}

                {(selectedComplaint.admin_note || selectedComplaint.staff_note) && (
                  <div style={{ marginTop: "18px" }}>
                    {selectedComplaint.admin_note && (
                      <div style={{ marginBottom: "12px" }}>
                        <div className="pcs-detail-label">Admin Note</div>
                        <div className="pcs-detail-value" style={{ lineHeight: 1.5 }}>
                          {selectedComplaint.admin_note}
                        </div>
                      </div>
                    )}
                    {selectedComplaint.staff_note && (
                      <div>
                        <div className="pcs-detail-label">Staff Note</div>
                        <div className="pcs-detail-value" style={{ lineHeight: 1.5 }}>
                          {selectedComplaint.staff_note}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FEEDBACK */}
              {isResolved(selectedComplaint.status) && (
                <div className="pcs-card">
                  <div className="pcs-card-title">⭐ Give Feedback</div>

                  {feedbackSubmitted ? (
                    <div style={{ color: "var(--pcs-mid-green)", fontWeight: 500, fontSize: "15px" }}>
                      ✓ Thank you! Your feedback has been submitted.
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize: "13.5px", color: "var(--pcs-muted)", marginBottom: "8px" }}>
                        How satisfied are you with the resolution of this complaint?
                      </p>

                      <div className="pcs-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`pcs-star ${star <= rating ? "active" : ""}`}
                            onClick={() => setRating(star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <div className="pcs-field">
                        <label className="pcs-label">Your Comment (optional)</label>
                        <textarea
                          className="pcs-textarea"
                          rows={3}
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          placeholder="Share your experience with the resolution..."
                        />
                      </div>

                      <button
                        className="pcs-btn pcs-btn-primary"
                        onClick={handleSubmitFeedback}
                        disabled={submittingFeedback || rating === 0}
                      >
                        {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h1 className="pcs-page-title">Notifications</h1>
              <p className="pcs-page-sub">
                Stay updated on the progress of your complaints.
                {unreadCount > 0 && (
                  <span style={{ color: "var(--pcs-laterite)", fontWeight: 600 }}>
                    {" "}• {unreadCount} unread
                  </span>
                )}
              </p>

              <div className="pcs-card">
                {notifLoading ? (
                  <div className="pcs-empty">Loading notifications...</div>
                ) : notifications.length === 0 ? (
                  <div className="pcs-empty">No notifications yet.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="pcs-notif-item">
                      <div className={`pcs-notif-dot ${n.is_read ? "read" : ""}`} />
                      <div style={{ flex: 1 }}>
                        <div className="pcs-notif-title">
                          {n.title}
                          {n.notification_type && (
                            <span className="pcs-notif-type">{n.notification_type}</span>
                          )}
                        </div>
                        <div className="pcs-notif-text">{n.message}</div>
                        <div className="pcs-notif-time">
                          {formatTime(n.created_at)}
                          {n.complaint_id && (
                            <span style={{ marginLeft: "10px", color: "var(--pcs-mid-green)" }}>
                              • Complaint #{n.complaint_id}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;