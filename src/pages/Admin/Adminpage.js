import React, { useState } from "react";

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" strokeLinejoin="round" />
  </svg>
);
const IconClipboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 11h6M9 15h6M9 19h3" strokeLinecap="round" />
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.3 2.9-5.2 5.5-5.2s5.5 1.9 5.5 5.2" strokeLinecap="round" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.4c2 .2 4.6 1.6 4.6 5.1" strokeLinecap="round" />
  </svg>
);
const IconBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="8" width="18" height="11" rx="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);
const IconBuilding = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" strokeLinecap="round" />
    <path d="M10 21v-4h4v4" />
  </svg>
);
const IconFolder = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" strokeLinejoin="round" />
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" />
    <path d="M2.5 20h19" strokeLinecap="round" />
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" strokeLinejoin="round" />
    <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
  </svg>
);
const IconGear = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19 12a7 7 0 0 0-.15-1.4l1.9-1.5-2-3.4-2.3.9a7 7 0 0 0-2.4-1.4L13.6 3h-3.2l-.45 2.2a7 7 0 0 0-2.4 1.4l-2.3-.9-2 3.4 1.9 1.5A7 7 0 0 0 5 12c0 .5.05.95.15 1.4l-1.9 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.4 1.4l.45 2.2h3.2l.45-2.2a7 7 0 0 0 2.4-1.4l2.3.9 2-3.4-1.9-1.5c.1-.45.15-.9.15-1.4Z" strokeLinejoin="round" />
  </svg>
);
const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconWrench = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2-2 2.6-2.6Z" strokeLinejoin="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2l2.4 2.4 4.6-5.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.6-4.6" strokeLinecap="round" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome, active: true },
  { href: "/admin/complaints", label: "Complaints", icon: IconClipboard },
  { href: "/admin/view_user_details", label: "Users", icon: IconUsers },
  { href: "/admin/staff", label: "Staff", icon: IconBriefcase },
  { href: "/admin/department", label: "Departments", icon: IconBuilding },
  { href: "/admin/categories", label: "Categories", icon: IconFolder },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const COMPLAINTS = [
  { id: "#CMP001", title: "Road damage near junction", category: "Road", user: "Rahul", priority: "High", status: "Pending" },
  { id: "#CMP002", title: "Street light not working", category: "Electricity", user: "Anjali", priority: "Medium", status: "In Progress" },
  { id: "#CMP003", title: "Waste collection issue", category: "Waste", user: "Arun", priority: "Low", status: "Resolved" },
  { id: "#CMP004", title: "Water supply interruption", category: "Water", user: "Meera", priority: "High", status: "Pending" },
];

const priorityClass = { High: "cv-badge-red", Medium: "cv-badge-amber", Low: "cv-badge-slate" };
const statusClass = { Pending: "cv-badge-amber", "In Progress": "cv-badge-indigo", Resolved: "cv-badge-green" };

const Adminpage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="cv-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --cv-indigo: #1E7A4C;
          --cv-indigo-deep: #145636;
          --cv-slate-900: #14162B;
          --cv-slate-800: #1E2140;
          --cv-slate-600: #565A78;
          --cv-slate-400: #9195AE;
          --cv-bg: #F3F4F9;
          --cv-line: #E4E5F0;
          --cv-white: #FFFFFF;
          --cv-green: #1E9A6E;
          --cv-green-bg: #E1F5EC;
          --cv-amber: #B5790A;
          --cv-amber-bg: #FBEDD3;
          --cv-red: #C6403A;
          --cv-red-bg: #FBE1DF;
        }

        * { box-sizing: border-box; }

        .cv-shell {
          min-height: 100vh;
          background: var(--cv-bg);
          font-family: 'Inter', sans-serif;
          color: var(--cv-slate-900);
          display: flex;
        }

        .cv-shell a { text-decoration: none; }

        .cv-shell h2, .cv-shell h3, .cv-shell h4, .cv-shell h5 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        /* ---------------- SIDEBAR (light) ---------------- */
        .cv-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--cv-white);
          border-right: 1px solid var(--cv-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .cv-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .cv-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--cv-indigo);
          color: var(--cv-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .cv-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .cv-brand-sub { font-size: 10.5px; color: var(--cv-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .cv-sidebar-rule { height: 1px; background: var(--cv-line); margin: 18px 0 12px; }

        .cv-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .cv-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--cv-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .cv-nav-link:hover { background: var(--cv-bg); color: var(--cv-slate-900); }

        .cv-nav-link.active {
          background: #E6F3EC;
          color: var(--cv-indigo-deep);
          font-weight: 600;
        }

        .cv-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--cv-indigo);
        }

        .cv-nav-link svg { flex: 0 0 auto; }

        .cv-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--cv-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .cv-logout-link:hover { background: var(--cv-red-bg); }

        .cv-sidebar-close {
          display: none;
          background: var(--cv-bg);
          border: none;
          color: var(--cv-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
          cursor: pointer;
        }

        .cv-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .cv-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .cv-topnav {
          background: var(--cv-white);
          border-bottom: 1px solid var(--cv-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .cv-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .cv-menu-btn {
          display: none;
          background: var(--cv-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--cv-slate-900);
          cursor: pointer;
        }

        .cv-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--cv-bg);
          border: 1px solid var(--cv-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--cv-slate-400);
        }
        .cv-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--cv-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .cv-search input::placeholder { color: var(--cv-slate-400); }

        .cv-topnav-right { display: flex; align-items: center; gap: 16px; }

        .cv-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--cv-bg);
          border: 1px solid var(--cv-line);
          color: var(--cv-slate-900);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .cv-bell-btn:hover { background: var(--cv-line); }
        .cv-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--cv-red);
          border: 1.5px solid var(--cv-white);
        }

        .cv-user-block { text-align: right; line-height: 1.25; }
        .cv-user-name { font-size: 13px; font-weight: 700; }
        .cv-user-role { font-size: 11px; color: var(--cv-slate-400); }

        .cv-avatar {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--cv-indigo);
          color: var(--cv-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- CONTENT ---------------- */
        .cv-content { padding: 26px 28px 60px; }

        .cv-welcome { margin-bottom: 22px; }
        .cv-welcome h3 { font-size: 22px; font-weight: 700; color: var(--cv-slate-900); }
        .cv-welcome p { font-size: 13.5px; color: var(--cv-slate-600); margin: 5px 0 0; }

        /* ---------------- STATS ---------------- */
        .cv-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 22px; }

        .cv-card { background: var(--cv-white); border: 1px solid var(--cv-line); border-radius: 12px; }

        .cv-stat-card { position: relative; overflow: hidden; padding: 18px 20px; }
        .cv-stat-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
        .cv-stat-card.indigo::before { background: var(--cv-indigo); }
        .cv-stat-card.amber::before { background: var(--cv-amber); }
        .cv-stat-card.blue::before { background: #2E7FD1; }
        .cv-stat-card.green::before { background: var(--cv-green); }

        .cv-stat-label { font-size: 11.5px; color: var(--cv-slate-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 6px; }
        .cv-stat-num { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 26px; color: var(--cv-slate-900); }
        .cv-stat-trend { font-size: 12px; font-weight: 600; margin-top: 8px; display: inline-block; }
        .cv-stat-trend.up { color: var(--cv-green); }
        .cv-stat-trend.warn { color: var(--cv-amber); }
        .cv-stat-trend.info { color: #2E7FD1; }

        /* ---------------- QUICK ACTIONS ---------------- */
        .cv-section-card { margin-bottom: 22px; }
        .cv-section-body { padding: 22px; }
        .cv-section-title { font-size: 15.5px; font-weight: 700; color: var(--cv-slate-900); margin-bottom: 14px; }

        .cv-quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

        .cv-quick-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid var(--cv-line);
          color: var(--cv-slate-900);
          background: var(--cv-bg);
          transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }
        .cv-quick-btn:hover { transform: translateY(-2px); border-color: var(--cv-indigo); background: var(--cv-white); }

        .cv-quick-icon {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: var(--cv-white);
          border: 1px solid var(--cv-line);
          display: flex; align-items: center; justify-content: center;
          color: var(--cv-indigo);
          flex: 0 0 auto;
        }

        .cv-quick-btn.primary { background: var(--cv-indigo); border-color: var(--cv-indigo); color: var(--cv-white); }
        .cv-quick-btn.primary .cv-quick-icon { background: rgba(255,255,255,0.16); border-color: transparent; color: var(--cv-white); }
        .cv-quick-btn.primary:hover { background: var(--cv-indigo-deep); border-color: var(--cv-indigo-deep); }

        /* ---------------- TABLE ---------------- */
        .cv-table-head-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }

        .cv-view-all-btn {
          padding: 7px 15px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          background: var(--cv-white);
          border: 1px solid var(--cv-line);
          color: var(--cv-slate-900);
        }
        .cv-view-all-btn:hover { border-color: var(--cv-indigo); color: var(--cv-indigo); }

        .cv-table-wrap { overflow-x: auto; margin-top: 14px; }
        .cv-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .cv-table thead th {
          text-align: left;
          color: var(--cv-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--cv-line);
        }

        .cv-table tbody tr { border-bottom: 1px solid var(--cv-line); transition: background 0.12s ease; }
        .cv-table tbody tr:hover { background: var(--cv-bg); }
        .cv-table td { padding: 13px 14px; vertical-align: middle; }

        .cv-badge { display: inline-block; padding: 4px 11px; border-radius: 6px; font-size: 11.5px; font-weight: 700; }
        .cv-badge-red { background: var(--cv-red-bg); color: var(--cv-red); }
        .cv-badge-amber { background: var(--cv-amber-bg); color: var(--cv-amber); }
        .cv-badge-green { background: var(--cv-green-bg); color: var(--cv-green); }
        .cv-badge-slate { background: var(--cv-bg); color: var(--cv-slate-600); }
        .cv-badge-indigo { background: #E1F0E7; color: var(--cv-indigo-deep); }

        .cv-view-btn {
          padding: 6px 14px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid var(--cv-line);
          color: var(--cv-slate-900);
          background: var(--cv-white);
        }
        .cv-view-btn:hover { border-color: var(--cv-indigo); color: var(--cv-indigo); }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 1080px) {
          .cv-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .cv-quick-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .cv-sidebar { transform: translateX(-100%); }
          .cv-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .cv-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .cv-main { margin-left: 0; }
          .cv-menu-btn { display: inline-flex; }
          .cv-search { display: none; }
          .cv-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
        }

        @media (max-width: 640px) {
          .cv-stats-grid, .cv-quick-grid { grid-template-columns: 1fr; }
          .cv-topnav, .cv-content { padding-left: 18px; padding-right: 18px; }
          .cv-user-block { display: none; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`cv-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="cv-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="cv-brand-row">
          <div className="cv-brand-mark">PC</div>
          <div>
            <div className="cv-brand-name">Public Complaint</div>
            <div className="cv-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="cv-sidebar-rule" />

        <ul className="cv-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`cv-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="cv-sidebar-rule" />

        <a href="/admin/settings" className="cv-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="cv-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`cv-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="cv-main">
        {/* TOP NAVBAR */}
        <nav className="cv-topnav">
          <div className="cv-topnav-left">
            <button className="cv-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="cv-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="cv-topnav-right">
            <button className="cv-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="cv-bell-dot" />
            </button>

            <div className="cv-user-block">
              <div className="cv-user-name">Administrator</div>
              <div className="cv-user-role">Admin</div>
            </div>

            <div className="cv-avatar">A</div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="cv-content">
          <div className="cv-welcome">
            <h3>Welcome back, Administrator</h3>
            <p>Monitor and manage public complaints from here.</p>
          </div>

          {/* ================= STATISTICS ================= */}
          <div className="cv-stats-grid">
            <div className="cv-card cv-stat-card indigo">
              <p className="cv-stat-label">Total Complaints</p>
              <h2 className="cv-stat-num">1,245</h2>
              <span className="cv-stat-trend up">↑ 12% this month</span>
            </div>

            <div className="cv-card cv-stat-card amber">
              <p className="cv-stat-label">Pending</p>
              <h2 className="cv-stat-num">186</h2>
              <span className="cv-stat-trend warn">Needs attention</span>
            </div>

            <div className="cv-card cv-stat-card blue">
              <p className="cv-stat-label">In Progress</p>
              <h2 className="cv-stat-num">324</h2>
              <span className="cv-stat-trend info">Being handled</span>
            </div>

            <div className="cv-card cv-stat-card green">
              <p className="cv-stat-label">Resolved</p>
              <h2 className="cv-stat-num">735</h2>
              <span className="cv-stat-trend up">59% resolution rate</span>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className="cv-card cv-section-card">
            <div className="cv-section-body">
              <h5 className="cv-section-title">Quick Actions</h5>

              <div className="cv-quick-grid">
                <a href="/admin/complaints" className="cv-quick-btn primary">
                  <span className="cv-quick-icon"><IconClipboard /></span>
                  Manage Complaints
                </a>
                <a href="/admin/staff" className="cv-quick-btn">
                  <span className="cv-quick-icon"><IconBriefcase /></span>
                  Manage Staff
                </a>
                <a href="/admin/users" className="cv-quick-btn">
                  <span className="cv-quick-icon"><IconUsers /></span>
                  Manage Users
                </a>
                <a href="/admin/reports" className="cv-quick-btn">
                  <span className="cv-quick-icon"><IconChart /></span>
                  View Reports
                </a>
              </div>
            </div>
          </div>

          {/* ================= RECENT COMPLAINTS ================= */}
          <div className="cv-card">
            <div className="cv-section-body">
              <div className="cv-table-head-row">
                <div>
                  <h5 className="cv-section-title" style={{ marginBottom: "2px" }}>Recent Complaints</h5>
                  <p style={{ fontSize: "12.5px", color: "var(--cv-slate-600)", margin: 0 }}>
                    Latest complaints submitted by users
                  </p>
                </div>

                <a href="/admin/complaints" className="cv-view-all-btn">View All</a>
              </div>

              <div className="cv-table-wrap">
                <table className="cv-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Complaint</th>
                      <th>Category</th>
                      <th>User</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {COMPLAINTS.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td>{c.title}</td>
                        <td>{c.category}</td>
                        <td>{c.user}</td>
                        <td><span className={`cv-badge ${priorityClass[c.priority]}`}>{c.priority}</span></td>
                        <td><span className={`cv-badge ${statusClass[c.status]}`}>{c.status}</span></td>
                        <td><button className="cv-view-btn">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;