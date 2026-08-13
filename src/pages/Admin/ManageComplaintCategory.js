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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4v4.6h4.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 13a8 8 0 0 0 13.7 4.7l2.3-2.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 20v-4.6h-4.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M5 4h11l3 3v13H5z" strokeLinejoin="round" />
    <path d="M8 4v5h7V4M8 20v-6h8v6" strokeLinejoin="round" />
  </svg>
);
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M4 20h4.5L19 9.5a2.1 2.1 0 0 0-4.5-4.5L4 15.5V20Z" strokeLinejoin="round" />
    <path d="M13 6.5 17.5 11" strokeLinecap="round" />
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
  { href: "/admin/department", label: "Departments", icon: IconBuilding },
  { href: "/admin/categories", label: "Categories", icon: IconFolder, active: true },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const ManageComplaintCategory = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await API.get("view_complaint_categories/");

      if (response.data.status === "success") {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load complaint categories");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PAGE LOAD
  // =====================================================

  useEffect(() => {
    loadCategories();
  }, []);

  // =====================================================
  // CLEAR FORM
  // =====================================================

  const clearForm = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  // =====================================================
  // ADD / EDIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    try {
      let response;

      // EDIT
      if (editId) {
        response = await API.post(`edit_complaint_category/${editId}/`, formData);
      }
      // ADD
      else {
        response = await API.post("add_complaint_category/", formData);
      }

      if (response.data.status === "success") {
        alert(response.data.message);

        clearForm();
        loadCategories();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (category) => {
    setEditId(category.id);
    setName(category.name);
    setDescription(category.description || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.post(`delete_complaint_category/${id}/`);

      if (response.data.status === "success") {
        alert(response.data.message);
        loadCategories();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Unable to delete category");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="mc-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --mc-green: #1E7A4C;
          --mc-green-deep: #145636;
          --mc-green-bg: #E6F3EC;
          --mc-slate-900: #14162B;
          --mc-slate-600: #565A78;
          --mc-slate-400: #9195AE;
          --mc-bg: #F3F4F9;
          --mc-line: #E4E5F0;
          --mc-white: #FFFFFF;
          --mc-red: #C6403A;
          --mc-red-bg: #FBE1DF;
        }

        * { box-sizing: border-box; }

        .mc-shell {
          min-height: 100vh;
          background: var(--mc-bg);
          font-family: 'Inter', sans-serif;
          color: var(--mc-slate-900);
          display: flex;
        }

        .mc-shell h2, .mc-shell h3, .mc-shell h4, .mc-shell h5 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        .mc-shell a { text-decoration: none; }
        .mc-shell button { font-family: 'Inter', sans-serif; cursor: pointer; }

        /* ---------------- SIDEBAR ---------------- */
        .mc-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--mc-white);
          border-right: 1px solid var(--mc-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .mc-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .mc-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--mc-green);
          color: var(--mc-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .mc-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .mc-brand-sub { font-size: 10.5px; color: var(--mc-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .mc-sidebar-rule { height: 1px; background: var(--mc-line); margin: 18px 0 12px; }

        .mc-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .mc-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--mc-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .mc-nav-link:hover { background: var(--mc-bg); color: var(--mc-slate-900); }

        .mc-nav-link.active {
          background: var(--mc-green-bg);
          color: var(--mc-green-deep);
          font-weight: 600;
        }
        .mc-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--mc-green);
        }

        .mc-nav-link svg { flex: 0 0 auto; }

        .mc-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--mc-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .mc-logout-link:hover { background: var(--mc-red-bg); }

        .mc-sidebar-close {
          display: none;
          background: var(--mc-bg);
          border: none;
          color: var(--mc-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        .mc-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .mc-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .mc-topnav {
          background: var(--mc-white);
          border-bottom: 1px solid var(--mc-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .mc-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .mc-menu-btn {
          display: none;
          background: var(--mc-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--mc-slate-900);
        }

        .mc-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--mc-bg);
          border: 1px solid var(--mc-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--mc-slate-400);
        }
        .mc-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--mc-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .mc-search input::placeholder { color: var(--mc-slate-400); }

        .mc-topnav-right { display: flex; align-items: center; gap: 16px; }

        .mc-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--mc-bg);
          border: 1px solid var(--mc-line);
          color: var(--mc-slate-900);
          display: flex; align-items: center; justify-content: center;
        }
        .mc-bell-btn:hover { background: var(--mc-line); }
        .mc-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--mc-red);
          border: 1.5px solid var(--mc-white);
        }

        .mc-user-block { text-align: right; line-height: 1.25; }
        .mc-user-name-top { font-size: 13px; font-weight: 700; }
        .mc-user-role { font-size: 11px; color: var(--mc-slate-400); }

        .mc-avatar-top {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--mc-green);
          color: var(--mc-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- BODY ---------------- */
        .mc-body { padding: 26px 30px 60px; }

        .mc-page-heading { margin-bottom: 22px; }
        .mc-title { font-size: 21px; font-weight: 700; color: var(--mc-slate-900); }
        .mc-subtitle { font-size: 13px; color: var(--mc-slate-600); margin: 4px 0 0; }

        .mc-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 20px;
          align-items: start;
        }

        /* ---------------- CARD ---------------- */
        .mc-card {
          background: var(--mc-white);
          border: 1px solid var(--mc-line);
          border-radius: 12px;
        }

        .mc-card-body { padding: 22px; }

        .mc-card-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--mc-slate-900);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }

        .mc-card-title-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--mc-green-bg);
          color: var(--mc-green-deep);
          display: flex; align-items: center; justify-content: center;
        }

        /* ---------------- FORM ---------------- */
        .mc-field { margin-bottom: 16px; }
        .mc-label { display: block; font-size: 12.5px; font-weight: 600; color: var(--mc-slate-900); margin-bottom: 6px; }

        .mc-input, .mc-textarea {
          width: 100%;
          padding: 10px 13px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          border: 1px solid var(--mc-line);
          border-radius: 8px;
          background: var(--mc-bg);
          color: var(--mc-slate-900);
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }
        .mc-input::placeholder, .mc-textarea::placeholder { color: var(--mc-slate-400); }

        .mc-input:focus, .mc-textarea:focus {
          outline: none;
          border-color: var(--mc-green);
          background: var(--mc-white);
          box-shadow: 0 0 0 3px rgba(30, 122, 76, 0.14);
        }

        /* ---------------- BUTTONS ---------------- */
        .mc-btn {
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
        .mc-btn:active { transform: translateY(1px); }
        .mc-btn-block { width: 100%; }

        .mc-btn-green { background: var(--mc-green); color: var(--mc-white); }
        .mc-btn-green:hover { background: var(--mc-green-deep); }

        .mc-btn-outline {
          background: var(--mc-white);
          border-color: var(--mc-line);
          color: var(--mc-slate-900);
        }
        .mc-btn-outline:hover { border-color: var(--mc-green); color: var(--mc-green-deep); }

        .mc-btn-sm { padding: 6px 12px; font-size: 12px; }

        .mc-btn-outline-danger {
          background: transparent;
          border-color: var(--mc-red);
          color: var(--mc-red);
        }
        .mc-btn-outline-danger:hover { background: var(--mc-red); color: var(--mc-white); }

        /* ---------------- LIST HEADER ---------------- */
        .mc-list-head-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .mc-count-pill {
          font-size: 12px;
          color: var(--mc-slate-600);
        }
        .mc-count-pill strong { color: var(--mc-slate-900); }

        /* ---------------- TABLE ---------------- */
        .mc-table-wrap { overflow-x: auto; }
        .mc-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .mc-table thead th {
          text-align: left;
          color: var(--mc-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--mc-line);
        }
        .mc-table thead th.mc-center { text-align: center; }

        .mc-table tbody tr { border-bottom: 1px solid var(--mc-line); transition: background 0.12s ease; }
        .mc-table tbody tr:hover { background: var(--mc-bg); }
        .mc-table td { padding: 12px 14px; vertical-align: middle; }
        .mc-table td.mc-center { text-align: center; }

        .mc-cat-cell { display: flex; align-items: center; gap: 10px; }

        .mc-cat-avatar {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--mc-green);
          color: var(--mc-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          flex: 0 0 auto;
        }

        .mc-desc-cell { color: var(--mc-slate-600); }

        .mc-empty-row td { text-align: center; padding: 56px 14px; color: var(--mc-slate-400); }

        .mc-row-actions { display: flex; gap: 8px; justify-content: center; }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 1080px) {
          .mc-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 900px) {
          .mc-sidebar { transform: translateX(-100%); }
          .mc-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .mc-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .mc-main { margin-left: 0; }
          .mc-menu-btn { display: inline-flex; }
          .mc-search { display: none; }
          .mc-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
        }

        @media (max-width: 640px) {
          .mc-topnav, .mc-body { padding-left: 18px; padding-right: 18px; }
          .mc-user-block { display: none; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`mc-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="mc-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="mc-brand-row">
          <div className="mc-brand-mark">PC</div>
          <div>
            <div className="mc-brand-name">Public Complaint</div>
            <div className="mc-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="mc-sidebar-rule" />

        <ul className="mc-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`mc-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mc-sidebar-rule" />

        <a href="/admin/settings" className="mc-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="mc-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`mc-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="mc-main">
        {/* TOP NAVBAR */}
        <nav className="mc-topnav">
          <div className="mc-topnav-left">
            <button className="mc-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="mc-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="mc-topnav-right">
            <button className="mc-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="mc-bell-dot" />
            </button>

            <div className="mc-user-block">
              <div className="mc-user-name-top">Administrator</div>
              <div className="mc-user-role">Admin</div>
            </div>

            <div className="mc-avatar-top">A</div>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <div className="mc-body">
          <div className="mc-page-heading">
            <h3 className="mc-title">Manage Complaint Categories</h3>
            <p className="mc-subtitle">Add, view, edit and delete complaint categories</p>
          </div>

          <div className="mc-grid">
            {/* ================= FORM ================= */}
            <div className="mc-card">
              <div className="mc-card-body">
                <h5 className="mc-card-title">
                  <span className="mc-card-title-icon">
                    {editId ? <IconEdit /> : <IconPlus />}
                  </span>
                  {editId ? "Edit Category" : "Add Category"}
                </h5>

                <form onSubmit={handleSubmit}>
                  {/* NAME */}
                  <div className="mc-field">
                    <label className="mc-label" htmlFor="mc-name">Category Name</label>
                    <input
                      id="mc-name"
                      type="text"
                      className="mc-input"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mc-field">
                    <label className="mc-label" htmlFor="mc-desc">Description</label>
                    <textarea
                      id="mc-desc"
                      className="mc-textarea"
                      rows="5"
                      placeholder="Enter category description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* SUBMIT */}
                  <button type="submit" className="mc-btn mc-btn-green mc-btn-block" style={{ marginBottom: "10px" }}>
                    {editId ? <IconSave /> : <IconPlus />}
                    {editId ? "Update Category" : "Add Category"}
                  </button>

                  {/* CANCEL */}
                  {editId && (
                    <button type="button" className="mc-btn mc-btn-outline mc-btn-block" onClick={clearForm}>
                      Cancel
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* ================= LIST ================= */}
            <div className="mc-card">
              <div className="mc-card-body">
                <div className="mc-list-head-row">
                  <div>
                    <h5 className="mc-card-title" style={{ marginBottom: "2px" }}>Complaint Categories</h5>
                    <span className="mc-count-pill">Total: <strong>{categories.length}</strong></span>
                  </div>

                  <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={loadCategories}>
                    <IconRefresh />
                    Refresh
                  </button>
                </div>

                <div className="mc-table-wrap">
                  <table className="mc-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th className="mc-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr className="mc-empty-row">
                          <td colSpan="4">Loading...</td>
                        </tr>
                      ) : categories.length === 0 ? (
                        <tr className="mc-empty-row">
                          <td colSpan="4">No complaint categories found.</td>
                        </tr>
                      ) : (
                        categories.map((category, index) => (
                          <tr key={category.id}>
                            <td>{index + 1}</td>

                            <td>
                              <div className="mc-cat-cell">
                                <div className="mc-cat-avatar">
                                  {category.name.charAt(0).toUpperCase()}
                                </div>
                                <strong>{category.name}</strong>
                              </div>
                            </td>

                            <td>
                              <span className="mc-desc-cell">
                                {category.description || "No description"}
                              </span>
                            </td>

                            <td className="mc-center">
                              <div className="mc-row-actions">
                                <button className="mc-btn mc-btn-outline mc-btn-sm" onClick={() => handleEdit(category)}>
                                  <IconEdit />
                                  Edit
                                </button>

                                <button
                                  className="mc-btn mc-btn-outline-danger mc-btn-sm"
                                  onClick={() => handleDelete(category.id)}
                                >
                                  <IconTrash />
                                  Delete
                                </button>
                              </div>
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

export default ManageComplaintCategory;