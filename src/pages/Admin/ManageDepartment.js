import React, { useEffect, useState } from "react";
import API from "../../services/Api";

/* ---------------- sidebar / nav icons ---------------- */
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

/* ---------------- page-specific icons ---------------- */
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome },
  { href: "/admin/complaints", label: "Complaints", icon: IconClipboard },
  { href: "/admin/view_user_details", label: "Users", icon: IconUsers },
  { href: "/admin/staff", label: "Staff", icon: IconBriefcase },
  { href: "/admin/department", label: "Departments", icon: IconBuilding, active: true },
  { href: "/admin/categories", label: "Categories", icon: IconFolder },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments = async () => {
    try {
      const response = await API.get("view_departments/");

      if (response.data.status === "success") {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load departments");
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // ==========================================
  // ADD DEPARTMENT
  // ==========================================

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await API.post("add_department/", formData);

      if (response.data.status === "success") {
        alert(response.data.message);

        setName("");
        setDescription("");

        loadDepartments();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.post(`delete_department/${id}/`);

      if (response.data.status === "success") {
        alert(response.data.message);
        loadDepartments();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Unable to delete department");
    }
  };

  return (
    <div className="dp-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --dp-green: #1E7A4C;
          --dp-green-deep: #145636;
          --dp-green-bg: #E6F3EC;
          --dp-slate-900: #14162B;
          --dp-slate-600: #565A78;
          --dp-slate-400: #9195AE;
          --dp-bg: #F3F4F9;
          --dp-line: #E4E5F0;
          --dp-white: #FFFFFF;
          --dp-red: #C6403A;
          --dp-red-bg: #FBE1DF;
        }

        * { box-sizing: border-box; }

        .dp-shell {
          min-height: 100vh;
          background: var(--dp-bg);
          font-family: 'Inter', sans-serif;
          color: var(--dp-slate-900);
          display: flex;
        }

        .dp-shell h2, .dp-shell h3, .dp-shell h5 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        .dp-shell a { text-decoration: none; }
        .dp-shell button { font-family: 'Inter', sans-serif; cursor: pointer; }

        /* ---------------- SIDEBAR ---------------- */
        .dp-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--dp-white);
          border-right: 1px solid var(--dp-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .dp-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .dp-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--dp-green);
          color: var(--dp-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .dp-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .dp-brand-sub { font-size: 10.5px; color: var(--dp-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .dp-sidebar-rule { height: 1px; background: var(--dp-line); margin: 18px 0 12px; }

        .dp-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .dp-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--dp-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .dp-nav-link:hover { background: var(--dp-bg); color: var(--dp-slate-900); }

        .dp-nav-link.active {
          background: var(--dp-green-bg);
          color: var(--dp-green-deep);
          font-weight: 600;
        }
        .dp-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--dp-green);
        }

        .dp-nav-link svg { flex: 0 0 auto; }

        .dp-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--dp-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .dp-logout-link:hover { background: var(--dp-red-bg); }

        .dp-sidebar-close {
          display: none;
          background: var(--dp-bg);
          border: none;
          color: var(--dp-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        .dp-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .dp-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .dp-topnav {
          background: var(--dp-white);
          border-bottom: 1px solid var(--dp-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .dp-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .dp-menu-btn {
          display: none;
          background: var(--dp-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--dp-slate-900);
        }

        .dp-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--dp-bg);
          border: 1px solid var(--dp-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--dp-slate-400);
        }
        .dp-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--dp-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .dp-search input::placeholder { color: var(--dp-slate-400); }

        .dp-topnav-right { display: flex; align-items: center; gap: 16px; }

        .dp-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--dp-bg);
          border: 1px solid var(--dp-line);
          color: var(--dp-slate-900);
          display: flex; align-items: center; justify-content: center;
        }
        .dp-bell-btn:hover { background: var(--dp-line); }
        .dp-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--dp-red);
          border: 1.5px solid var(--dp-white);
        }

        .dp-user-block { text-align: right; line-height: 1.25; }
        .dp-user-name-top { font-size: 13px; font-weight: 700; }
        .dp-user-role { font-size: 11px; color: var(--dp-slate-400); }

        .dp-avatar-top {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--dp-green);
          color: var(--dp-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- BODY ---------------- */
        .dp-body { padding: 26px 30px 60px; }

        .dp-page-heading { margin-bottom: 22px; }
        .dp-title { font-size: 21px; font-weight: 700; color: var(--dp-slate-900); }
        .dp-subtitle { font-size: 13px; color: var(--dp-slate-600); margin: 4px 0 0; }

        .dp-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 20px;
          align-items: start;
        }

        /* ---------------- CARD ---------------- */
        .dp-card {
          background: var(--dp-white);
          border: 1px solid var(--dp-line);
          border-radius: 12px;
        }

        .dp-card-body { padding: 22px; }

        .dp-card-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--dp-slate-900);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }

        .dp-card-title-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--dp-green-bg);
          color: var(--dp-green-deep);
          display: flex; align-items: center; justify-content: center;
        }

        /* ---------------- FORM ---------------- */
        .dp-field { margin-bottom: 16px; }
        .dp-label { display: block; font-size: 12.5px; font-weight: 600; color: var(--dp-slate-900); margin-bottom: 6px; }

        .dp-input, .dp-textarea {
          width: 100%;
          padding: 10px 13px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          border: 1px solid var(--dp-line);
          border-radius: 8px;
          background: var(--dp-bg);
          color: var(--dp-slate-900);
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .dp-input::placeholder, .dp-textarea::placeholder { color: var(--dp-slate-400); }

        .dp-input:focus, .dp-textarea:focus {
          outline: none;
          border-color: var(--dp-green);
          background: var(--dp-white);
          box-shadow: 0 0 0 3px rgba(30, 122, 76, 0.14);
        }

        /* ---------------- BUTTONS ---------------- */
        .dp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: transform 0.12s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .dp-btn:active { transform: translateY(1px); }
        .dp-btn-block { width: 100%; }

        .dp-btn-green { background: var(--dp-green); color: var(--dp-white); }
        .dp-btn-green:hover { background: var(--dp-green-deep); }

        .dp-btn-sm { padding: 6px 12px; font-size: 12px; }

        .dp-btn-outline-danger {
          background: var(--dp-white);
          border-color: var(--dp-line);
          color: var(--dp-red);
        }
        .dp-btn-outline-danger:hover { border-color: var(--dp-red); background: var(--dp-red-bg); }

        /* ---------------- LIST HEADER ---------------- */
        .dp-list-head-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .dp-count-badge {
          background: var(--dp-green-bg);
          color: var(--dp-green-deep);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 13px;
          border-radius: 999px;
        }

        /* ---------------- TABLE ---------------- */
        .dp-table-wrap { overflow-x: auto; }
        .dp-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .dp-table thead th {
          text-align: left;
          color: var(--dp-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--dp-line);
        }

        .dp-table tbody tr { border-bottom: 1px solid var(--dp-line); transition: background 0.12s ease; }
        .dp-table tbody tr:hover { background: var(--dp-bg); }
        .dp-table td { padding: 12px 14px; vertical-align: middle; }

        .dp-desc-cell { color: var(--dp-slate-600); }

        .dp-empty-row td { text-align: center; padding: 56px 14px; color: var(--dp-slate-400); }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 1080px) {
          .dp-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 900px) {
          .dp-sidebar { transform: translateX(-100%); }
          .dp-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .dp-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .dp-main { margin-left: 0; }
          .dp-menu-btn { display: inline-flex; }
          .dp-search { display: none; }
          .dp-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
        }

        @media (max-width: 640px) {
          .dp-topnav, .dp-body { padding-left: 18px; padding-right: 18px; }
          .dp-user-block { display: none; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`dp-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="dp-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="dp-brand-row">
          <div className="dp-brand-mark">PC</div>
          <div>
            <div className="dp-brand-name">Public Complaint</div>
            <div className="dp-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="dp-sidebar-rule" />

        <ul className="dp-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`dp-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="dp-sidebar-rule" />

        <a href="/admin/settings" className="dp-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="dp-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`dp-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="dp-main">
        {/* TOP NAVBAR */}
        <nav className="dp-topnav">
          <div className="dp-topnav-left">
            <button className="dp-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="dp-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="dp-topnav-right">
            <button className="dp-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="dp-bell-dot" />
            </button>

            <div className="dp-user-block">
              <div className="dp-user-name-top">Administrator</div>
              <div className="dp-user-role">Admin</div>
            </div>

            <div className="dp-avatar-top">A</div>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <div className="dp-body">
          <div className="dp-page-heading">
            <h3 className="dp-title">Manage Departments</h3>
            <p className="dp-subtitle">Add and manage public service departments</p>
          </div>

          <div className="dp-grid">
            {/* ================= ADD DEPARTMENT ================= */}
            <div className="dp-card">
              <div className="dp-card-body">
                <h5 className="dp-card-title">
                  <span className="dp-card-title-icon"><IconPlus /></span>
                  Add Department
                </h5>

                <form onSubmit={handleAdd}>
                  {/* NAME */}
                  <div className="dp-field">
                    <label className="dp-label" htmlFor="dp-name">Department Name</label>
                    <input
                      id="dp-name"
                      type="text"
                      className="dp-input"
                      placeholder="Enter department name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="dp-field">
                    <label className="dp-label" htmlFor="dp-desc">Description</label>
                    <textarea
                      id="dp-desc"
                      className="dp-textarea"
                      rows="4"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="dp-btn dp-btn-green dp-btn-block">
                    <IconPlus />
                    Add Department
                  </button>
                </form>
              </div>
            </div>

            {/* ================= DEPARTMENT LIST ================= */}
            <div className="dp-card">
              <div className="dp-card-body">
                <div className="dp-list-head-row">
                  <h5 className="dp-card-title" style={{ marginBottom: "2px" }}>Department List</h5>
                  <span className="dp-count-badge">{departments.length} Departments</span>
                </div>

                <div className="dp-table-wrap">
                  <table className="dp-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Department</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {departments.length === 0 ? (
                        <tr className="dp-empty-row">
                          <td colSpan="4">No departments found</td>
                        </tr>
                      ) : (
                        departments.map((department, index) => (
                          <tr key={department.id}>
                            <td>{index + 1}</td>

                            <td><strong>{department.name}</strong></td>

                            <td>
                              <span className="dp-desc-cell">
                                {department.description || "No description"}
                              </span>
                            </td>

                            <td>
                              <button
                                className="dp-btn dp-btn-outline-danger dp-btn-sm"
                                onClick={() => handleDelete(department.id)}
                              >
                                <IconTrash />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDepartment;