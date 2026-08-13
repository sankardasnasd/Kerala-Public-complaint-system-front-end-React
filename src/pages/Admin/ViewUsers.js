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
const IconRefresh = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4v4.6h4.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 13a8 8 0 0 0 13.7 4.7l2.3-2.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 20v-4.6h-4.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
  </svg>
);
const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M7 3.5c1 0 1.9.6 2.3 1.6l.7 1.8a2.3 2.3 0 0 1-.5 2.5l-1 1a13 13 0 0 0 5.1 5.1l1-1a2.3 2.3 0 0 1 2.5-.5l1.8.7c1 .4 1.6 1.3 1.6 2.3v1.6c0 1.4-1.3 2.5-2.7 2.2C10.9 19.6 4.4 13.1 3.2 6.2 3 4.8 4 3.5 5.4 3.5H7Z" strokeLinejoin="round" />
  </svg>
);
const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);
const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" strokeLinecap="round" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome },
  { href: "/admin/complaints", label: "Complaints", icon: IconClipboard },
  { href: "/admin/view_user_details", label: "Users", icon: IconUsers, active: true },
  { href: "/admin/staff", label: "Staff", icon: IconBriefcase },
  { href: "/admin/department", label: "Departments", icon: IconBuilding },
  { href: "/admin/categories", label: "Categories", icon: IconFolder },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==========================================
  // LOAD USERS
  // ==========================================

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await API.get("view_users/");

      if (response.data.status === "success") {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  const handleView = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="vu-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --vu-green: #1E7A4C;
          --vu-green-deep: #145636;
          --vu-green-bg: #E6F3EC;
          --vu-slate-900: #14162B;
          --vu-slate-600: #565A78;
          --vu-slate-400: #9195AE;
          --vu-bg: #F3F4F9;
          --vu-line: #E4E5F0;
          --vu-white: #FFFFFF;
          --vu-red: #C6403A;
          --vu-red-bg: #FBE1DF;
        }

        * { box-sizing: border-box; }

        .vu-shell {
          min-height: 100vh;
          background: var(--vu-bg);
          font-family: 'Inter', sans-serif;
          color: var(--vu-slate-900);
          display: flex;
        }

        .vu-shell h2, .vu-shell h3, .vu-shell h4, .vu-shell h5 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        .vu-shell a { text-decoration: none; }
        .vu-shell button { font-family: 'Inter', sans-serif; cursor: pointer; }

        /* ---------------- SIDEBAR ---------------- */
        .vu-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--vu-white);
          border-right: 1px solid var(--vu-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .vu-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .vu-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--vu-green);
          color: var(--vu-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .vu-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .vu-brand-sub { font-size: 10.5px; color: var(--vu-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .vu-sidebar-rule { height: 1px; background: var(--vu-line); margin: 18px 0 12px; }

        .vu-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .vu-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--vu-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .vu-nav-link:hover { background: var(--vu-bg); color: var(--vu-slate-900); }

        .vu-nav-link.active {
          background: var(--vu-green-bg);
          color: var(--vu-green-deep);
          font-weight: 600;
        }
        .vu-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--vu-green);
        }

        .vu-nav-link svg { flex: 0 0 auto; }

        .vu-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--vu-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .vu-logout-link:hover { background: var(--vu-red-bg); }

        .vu-sidebar-close {
          display: none;
          background: var(--vu-bg);
          border: none;
          color: var(--vu-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        .vu-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .vu-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .vu-topnav {
          background: var(--vu-white);
          border-bottom: 1px solid var(--vu-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .vu-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .vu-menu-btn {
          display: none;
          background: var(--vu-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--vu-slate-900);
        }

        .vu-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--vu-bg);
          border: 1px solid var(--vu-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--vu-slate-400);
        }
        .vu-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--vu-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .vu-search input::placeholder { color: var(--vu-slate-400); }

        .vu-topnav-right { display: flex; align-items: center; gap: 16px; }

        .vu-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--vu-bg);
          border: 1px solid var(--vu-line);
          color: var(--vu-slate-900);
          display: flex; align-items: center; justify-content: center;
        }
        .vu-bell-btn:hover { background: var(--vu-line); }
        .vu-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--vu-red);
          border: 1.5px solid var(--vu-white);
        }

        .vu-user-block { text-align: right; line-height: 1.25; }
        .vu-user-name-top { font-size: 13px; font-weight: 700; }
        .vu-user-role { font-size: 11px; color: var(--vu-slate-400); }

        .vu-avatar-top {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--vu-green);
          color: var(--vu-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- BODY ---------------- */
        .vu-body { padding: 26px 30px 60px; }

        .vu-page-heading { margin-bottom: 22px; }
        .vu-title { font-size: 21px; font-weight: 700; color: var(--vu-slate-900); }
        .vu-subtitle { font-size: 13px; color: var(--vu-slate-600); margin: 4px 0 0; }

        /* ---------------- BUTTONS ---------------- */
        .vu-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: transform 0.12s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }
        .vu-btn:active { transform: translateY(1px); }

        .vu-btn-outline {
          background: var(--vu-white);
          border-color: var(--vu-line);
          color: var(--vu-slate-900);
        }
        .vu-btn-outline:hover { border-color: var(--vu-green); color: var(--vu-green-deep); }

        .vu-btn-green { background: var(--vu-green); color: var(--vu-white); }
        .vu-btn-green:hover { background: var(--vu-green-deep); }

        .vu-btn-sm { padding: 6px 13px; font-size: 12.5px; }

        /* ---------------- CARD ---------------- */
        .vu-card {
          background: var(--vu-white);
          border: 1px solid var(--vu-line);
          border-radius: 12px;
        }

        /* ---------------- STAT ---------------- */
        .vu-stat-card {
          position: relative;
          overflow: hidden;
          padding: 18px 20px;
          margin-bottom: 22px;
          max-width: 260px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .vu-stat-card::before {
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--vu-green);
        }

        .vu-stat-icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: var(--vu-green-bg);
          color: var(--vu-green-deep);
          display: flex; align-items: center; justify-content: center;
          flex: 0 0 auto;
        }

        .vu-stat-label { font-size: 11.5px; color: var(--vu-slate-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 4px; }
        .vu-stat-num { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 24px; color: var(--vu-slate-900); }

        /* ---------------- TABLE SECTION ---------------- */
        .vu-section-body { padding: 24px; }
        .vu-section-title { font-size: 16px; font-weight: 700; color: var(--vu-slate-900); margin-bottom: 16px; }

        .vu-table-wrap { overflow-x: auto; }
        .vu-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .vu-table thead th {
          text-align: left;
          color: var(--vu-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--vu-line);
        }

        .vu-table tbody tr { border-bottom: 1px solid var(--vu-line); transition: background 0.12s ease; }
        .vu-table tbody tr:hover { background: var(--vu-bg); }
        .vu-table td { padding: 12px 14px; vertical-align: middle; }

        .vu-user-cell { display: flex; align-items: center; gap: 10px; }

        .vu-avatar {
          width: 42px; height: 42px;
          border-radius: 50%;
          object-fit: cover;
          flex: 0 0 auto;
        }

        .vu-avatar-fallback {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: var(--vu-green);
          color: var(--vu-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          flex: 0 0 auto;
        }

        .vu-user-name { font-weight: 700; font-size: 13.5px; display: block; }
        .vu-user-handle { font-size: 12px; color: var(--vu-slate-400); }

        .vu-address-cell {
          display: block;
          max-width: 200px;
          color: var(--vu-slate-600);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vu-empty-row td { text-align: center; padding: 56px 14px; color: var(--vu-slate-400); }

        /* ---------------- MODAL ---------------- */
        .vu-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 22, 43, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 100;
          animation: vu-fade 0.15s ease;
        }
        @keyframes vu-fade { from { opacity: 0; } to { opacity: 1; } }

        .vu-modal {
          background: var(--vu-white);
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(20, 22, 43, 0.4);
          animation: vu-pop 0.18s ease;
        }
        @keyframes vu-pop { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .vu-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--vu-line);
        }

        .vu-modal-title { font-size: 15.5px; font-weight: 700; }

        .vu-modal-close {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--vu-bg);
          border: none;
          color: var(--vu-slate-600);
          display: flex; align-items: center; justify-content: center;
        }
        .vu-modal-close:hover { background: var(--vu-line); color: var(--vu-slate-900); }

        .vu-modal-body { padding: 26px 24px; text-align: center; }

        .vu-modal-avatar {
          width: 92px; height: 92px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 14px;
          display: block;
        }

        .vu-modal-avatar-fallback {
          width: 92px; height: 92px;
          border-radius: 50%;
          background: var(--vu-green);
          color: var(--vu-white);
          display: flex; align-items: center; justify-content: center;
          font-size: 34px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          margin: 0 auto 14px;
        }

        .vu-modal-name { font-size: 19px; font-weight: 700; }
        .vu-modal-handle { font-size: 13px; color: var(--vu-slate-400); margin: 3px 0 18px; }

        .vu-detail-list { text-align: left; display: flex; flex-direction: column; gap: 12px; }

        .vu-detail-row { display: flex; align-items: flex-start; gap: 12px; }

        .vu-detail-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: var(--vu-bg);
          color: var(--vu-green-deep);
          display: flex; align-items: center; justify-content: center;
          flex: 0 0 auto;
        }

        .vu-detail-label { font-size: 11px; color: var(--vu-slate-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; margin: 0 0 2px; }
        .vu-detail-value { font-size: 13.5px; color: var(--vu-slate-900); word-break: break-word; }

        .vu-modal-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--vu-line);
          display: flex;
          justify-content: flex-end;
        }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 900px) {
          .vu-sidebar { transform: translateX(-100%); }
          .vu-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .vu-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .vu-main { margin-left: 0; }
          .vu-menu-btn { display: inline-flex; }
          .vu-search { display: none; }
          .vu-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
        }

        @media (max-width: 640px) {
          .vu-topnav, .vu-body { padding-left: 18px; padding-right: 18px; }
          .vu-user-block { display: none; }
          .vu-stat-card { max-width: none; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`vu-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="vu-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="vu-brand-row">
          <div className="vu-brand-mark">PC</div>
          <div>
            <div className="vu-brand-name">Public Complaint</div>
            <div className="vu-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="vu-sidebar-rule" />

        <ul className="vu-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`vu-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="vu-sidebar-rule" />

        <a href="/admin/settings" className="vu-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="vu-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`vu-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="vu-main">
        {/* TOP NAVBAR */}
        <nav className="vu-topnav">
          <div className="vu-topnav-left">
            <button className="vu-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="vu-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="vu-topnav-right">
            <button className="vu-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="vu-bell-dot" />
            </button>

            <div className="vu-user-block">
              <div className="vu-user-name-top">Administrator</div>
              <div className="vu-user-role">Admin</div>
            </div>

            <div className="vu-avatar-top">A</div>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <div className="vu-body">
          <div className="vu-page-heading" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <h3 className="vu-title">User Details</h3>
              <p className="vu-subtitle">View registered public users</p>
            </div>

            <button className="vu-btn vu-btn-outline" onClick={loadUsers}>
              <IconRefresh />
              Refresh
            </button>
          </div>

          {/* ================= STATISTICS ================= */}
          <div className="vu-card vu-stat-card">
            <div className="vu-stat-icon"><IconUsers /></div>
            <div>
              <p className="vu-stat-label">Total Users</p>
              <h2 className="vu-stat-num">{users.length}</h2>
            </div>
          </div>

          {/* ================= USER TABLE ================= */}
          <div className="vu-card">
            <div className="vu-section-body">
              <h5 className="vu-section-title">Registered Users</h5>

              <div className="vu-table-wrap">
                <table className="vu-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Registered</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr className="vu-empty-row">
                        <td colSpan="7">Loading users...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr className="vu-empty-row">
                        <td colSpan="7">No users found</td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>

                          <td>
                            <div className="vu-user-cell">
                              {user.profile_image ? (
                                <img src={user.profile_image} alt={user.name} className="vu-avatar" />
                              ) : (
                                <div className="vu-avatar-fallback">
                                  {user.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <span className="vu-user-name">{user.name}</span>
                                <span className="vu-user-handle">@{user.username}</span>
                              </div>
                            </div>
                          </td>

                          <td>{user.email}</td>
                          <td>{user.phone}</td>

                          <td>
                            <span className="vu-address-cell">
                              {user.address || "Not provided"}
                            </span>
                          </td>

                          <td>{user.created_at}</td>

                          <td>
                            <button
                              className="vu-btn vu-btn-green vu-btn-sm"
                              onClick={() => handleView(user)}
                            >
                              <IconEye />
                              View
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

      {/* ================= USER DETAILS MODAL ================= */}
      {selectedUser && (
        <div className="vu-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="vu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="vu-modal-header">
              <h5 className="vu-modal-title">User Profile</h5>
              <button
                type="button"
                className="vu-modal-close"
                onClick={() => setSelectedUser(null)}
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>

            <div className="vu-modal-body">
              {selectedUser.profile_image ? (
                <img src={selectedUser.profile_image} alt={selectedUser.name} className="vu-modal-avatar" />
              ) : (
                <div className="vu-modal-avatar-fallback">
                  {selectedUser.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="vu-modal-name">{selectedUser.name}</div>
              <div className="vu-modal-handle">@{selectedUser.username}</div>

              <div className="vu-detail-list">
                <div className="vu-detail-row">
                  <div className="vu-detail-icon"><IconMail /></div>
                  <div>
                    <p className="vu-detail-label">Email</p>
                    <p className="vu-detail-value">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="vu-detail-row">
                  <div className="vu-detail-icon"><IconPhone /></div>
                  <div>
                    <p className="vu-detail-label">Phone</p>
                    <p className="vu-detail-value">{selectedUser.phone}</p>
                  </div>
                </div>

                <div className="vu-detail-row">
                  <div className="vu-detail-icon"><IconPin /></div>
                  <div>
                    <p className="vu-detail-label">Address</p>
                    <p className="vu-detail-value">{selectedUser.address || "Not provided"}</p>
                  </div>
                </div>

                <div className="vu-detail-row">
                  <div className="vu-detail-icon"><IconCalendar /></div>
                  <div>
                    <p className="vu-detail-label">Registered</p>
                    <p className="vu-detail-value">{selectedUser.created_at}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="vu-modal-footer">
              <button className="vu-btn vu-btn-outline" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;