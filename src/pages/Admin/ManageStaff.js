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

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome },
  { href: "/admin/complaints", label: "Complaints", icon: IconClipboard },
  { href: "/admin/view_user_details", label: "Users", icon: IconUsers },
  { href: "/admin/staff", label: "Staff", icon: IconBriefcase, active: true },
  { href: "/admin/department", label: "Departments", icon: IconBuilding },
  { href: "/admin/categories", label: "Categories", icon: IconFolder },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    dept: "",
    address: "",
    image: null,
    is_available: true,
  });

  // ==========================================
  // LOAD STAFF
  // ==========================================

  const loadStaff = async () => {
    try {
      const response = await API.get("view_staff/");

      if (response.data.status === "success") {
        setStaffList(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load staff");
    }
  };

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

  // ==========================================
  // PAGE LOAD
  // ==========================================

  useEffect(() => {
    loadStaff();
    loadDepartments();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm({
      ...form,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      phone: "",
      dept: "",
      address: "",
      image: null,
      is_available: true,
    });

    setEditId(null);
    setShowForm(false);
  };

  // ==========================================
  // ADD STAFF
  // ==========================================

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  // ==========================================
  // EDIT STAFF
  // ==========================================

  const openEdit = (staff) => {
    setEditId(staff.id);

    setForm({
      username: staff.username || "",
      email: staff.email || "",
      password: "",
      phone: staff.phone || "",
      dept: staff.department_id || "",
      address: staff.address || "",
      image: null,
      is_available: staff.is_available,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // SUBMIT ADD / EDIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!editId) {
      formData.append("username", form.username);
      formData.append("password", form.password);
    }

    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("dept", form.dept);
    formData.append("address", form.address);
    formData.append("is_available", form.is_available);

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      let response;

      if (editId) {
        response = await API.post(`edit_staff/${editId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post("add_staff/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.status === "success") {
        alert(response.data.message);

        resetForm();
        loadStaff();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ==========================================
  // DELETE STAFF
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.post(`delete_staff/${id}/`);

      if (response.data.status === "success") {
        alert(response.data.message);
        loadStaff();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Unable to delete staff");
    }
  };

  const availableCount = staffList.filter((staff) => staff.is_available).length;
  const unavailableCount = staffList.filter((staff) => !staff.is_available).length;

  return (
    <div className="ms-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --ms-green: #1E7A4C;
          --ms-green-deep: #145636;
          --ms-green-bg: #E6F3EC;
          --ms-slate-900: #14162B;
          --ms-slate-600: #565A78;
          --ms-slate-400: #9195AE;
          --ms-bg: #F3F4F9;
          --ms-line: #E4E5F0;
          --ms-white: #FFFFFF;
          --ms-red: #C6403A;
          --ms-red-bg: #FBE1DF;
        }

        * { box-sizing: border-box; }

        .ms-shell {
          min-height: 100vh;
          background: var(--ms-bg);
          font-family: 'Inter', sans-serif;
          color: var(--ms-slate-900);
          display: flex;
        }

        .ms-shell h2, .ms-shell h3, .ms-shell h5 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        .ms-shell a { text-decoration: none; }
        .ms-shell button { font-family: 'Inter', sans-serif; cursor: pointer; }

        /* ---------------- SIDEBAR ---------------- */
        .ms-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--ms-white);
          border-right: 1px solid var(--ms-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .ms-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .ms-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--ms-green);
          color: var(--ms-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .ms-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .ms-brand-sub { font-size: 10.5px; color: var(--ms-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .ms-sidebar-rule { height: 1px; background: var(--ms-line); margin: 18px 0 12px; }

        .ms-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .ms-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--ms-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .ms-nav-link:hover { background: var(--ms-bg); color: var(--ms-slate-900); }

        .ms-nav-link.active {
          background: var(--ms-green-bg);
          color: var(--ms-green-deep);
          font-weight: 600;
        }
        .ms-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--ms-green);
        }

        .ms-nav-link svg { flex: 0 0 auto; }

        .ms-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--ms-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .ms-logout-link:hover { background: var(--ms-red-bg); }

        .ms-sidebar-close {
          display: none;
          background: var(--ms-bg);
          border: none;
          color: var(--ms-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        .ms-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .ms-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .ms-topnav {
          background: var(--ms-white);
          border-bottom: 1px solid var(--ms-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ms-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .ms-menu-btn {
          display: none;
          background: var(--ms-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--ms-slate-900);
        }

        .ms-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--ms-bg);
          border: 1px solid var(--ms-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--ms-slate-400);
        }
        .ms-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--ms-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .ms-search input::placeholder { color: var(--ms-slate-400); }

        .ms-topnav-right { display: flex; align-items: center; gap: 16px; }

        .ms-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--ms-bg);
          border: 1px solid var(--ms-line);
          color: var(--ms-slate-900);
          display: flex; align-items: center; justify-content: center;
        }
        .ms-bell-btn:hover { background: var(--ms-line); }
        .ms-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--ms-red);
          border: 1.5px solid var(--ms-white);
        }

        .ms-user-block { text-align: right; line-height: 1.25; }
        .ms-user-name-top { font-size: 13px; font-weight: 700; }
        .ms-user-role { font-size: 11px; color: var(--ms-slate-400); }

        .ms-avatar-top {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--ms-green);
          color: var(--ms-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- BODY ---------------- */
        .ms-body {
          padding: 26px 30px 60px;
        }

        .ms-page-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
        }

        .ms-title {
          font-size: 21px;
          font-weight: 700;
          color: var(--ms-slate-900);
        }

        .ms-subtitle {
          font-size: 13px;
          color: var(--ms-slate-600);
          margin: 4px 0 0;
        }

        /* ---------------- BUTTONS ---------------- */
        .ms-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: transform 0.12s ease, background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .ms-btn:active { transform: translateY(1px); }

        .ms-btn-green { background: var(--ms-green); color: var(--ms-white); }
        .ms-btn-green:hover { background: var(--ms-green-deep); }

        .ms-btn-ghost { background: transparent; color: var(--ms-slate-600); border-color: var(--ms-line); }
        .ms-btn-ghost:hover { background: var(--ms-bg); color: var(--ms-slate-900); }

        .ms-btn-sm { padding: 6px 12px; font-size: 12.5px; }

        .ms-btn-outline-green {
          background: var(--ms-white);
          color: var(--ms-green-deep);
          border-color: var(--ms-line);
        }
        .ms-btn-outline-green:hover { border-color: var(--ms-green); }

        .ms-btn-outline-danger {
          background: var(--ms-white);
          color: var(--ms-red);
          border-color: var(--ms-line);
        }
        .ms-btn-outline-danger:hover { border-color: var(--ms-red); background: var(--ms-red-bg); }

        /* ---------------- CARD ---------------- */
        .ms-card {
          background: var(--ms-white);
          border: 1px solid var(--ms-line);
          border-radius: 12px;
        }

        .ms-card-body { padding: 22px; }

        /* ---------------- STATS ---------------- */
        .ms-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 22px;
        }

        .ms-stat-label {
          font-size: 11.5px;
          color: var(--ms-slate-400);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 6px;
        }

        .ms-stat-num {
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: var(--ms-slate-900);
        }

        .ms-stat-num.available { color: var(--ms-green); }
        .ms-stat-num.unavailable { color: var(--ms-red); }

        /* ---------------- FORM ---------------- */
        .ms-form-card { margin-bottom: 22px; }

        .ms-form-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .ms-form-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--ms-slate-900);
        }

        .ms-close-btn {
          background: var(--ms-bg);
          border: none;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          font-size: 15px;
          color: var(--ms-slate-600);
          line-height: 1;
        }
        .ms-close-btn:hover { background: var(--ms-line); color: var(--ms-slate-900); }

        .ms-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ms-field { display: flex; flex-direction: column; gap: 6px; }
        .ms-field.full { grid-column: span 2; }

        .ms-label {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ms-slate-900);
        }

        .ms-input, .ms-select, .ms-textarea {
          width: 100%;
          padding: 10px 13px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          border: 1px solid var(--ms-line);
          border-radius: 8px;
          background: var(--ms-bg);
          color: var(--ms-slate-900);
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .ms-input::placeholder, .ms-textarea::placeholder { color: var(--ms-slate-400); }

        .ms-input:focus, .ms-select:focus, .ms-textarea:focus {
          outline: none;
          border-color: var(--ms-green);
          background: var(--ms-white);
          box-shadow: 0 0 0 3px rgba(30, 122, 76, 0.14);
        }

        .ms-input:disabled {
          background: var(--ms-line);
          color: var(--ms-slate-600);
          cursor: not-allowed;
        }

        .ms-hint { font-size: 11.5px; color: var(--ms-slate-400); }

        .ms-checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 0;
        }

        .ms-checkbox-row input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--ms-green);
          cursor: pointer;
        }

        .ms-checkbox-row label {
          font-size: 13.5px;
          color: var(--ms-slate-900);
          cursor: pointer;
        }

        .ms-form-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        /* ---------------- TABLE ---------------- */
        .ms-table-head-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .ms-count-badge {
          background: var(--ms-green-bg);
          color: var(--ms-green-deep);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 13px;
          border-radius: 999px;
        }

        .ms-table-wrap { overflow-x: auto; }

        .ms-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .ms-table thead th {
          text-align: left;
          color: var(--ms-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--ms-line);
        }

        .ms-table tbody tr {
          border-bottom: 1px solid var(--ms-line);
          transition: background 0.12s ease;
        }
        .ms-table tbody tr:hover { background: var(--ms-bg); }

        .ms-table td { padding: 12px 14px; vertical-align: middle; }

        .ms-empty-row td {
          text-align: center;
          padding: 56px 14px;
          color: var(--ms-slate-400);
        }

        .ms-staff-cell { display: flex; align-items: center; gap: 10px; }

        .ms-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex: 0 0 auto;
        }

        .ms-avatar-fallback {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--ms-green);
          color: var(--ms-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          flex: 0 0 auto;
        }

        .ms-badge {
          display: inline-block;
          padding: 4px 11px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 700;
        }

        .ms-badge-dept { background: var(--ms-bg); color: var(--ms-slate-600); }
        .ms-badge-available { background: var(--ms-green-bg); color: var(--ms-green-deep); }
        .ms-badge-unavailable { background: var(--ms-red-bg); color: var(--ms-red); }

        .ms-actions { display: flex; gap: 8px; }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 900px) {
          .ms-sidebar { transform: translateX(-100%); }
          .ms-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .ms-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .ms-main { margin-left: 0; }
          .ms-menu-btn { display: inline-flex; }
          .ms-search { display: none; }
          .ms-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
        }

        @media (max-width: 860px) {
          .ms-stats-grid { grid-template-columns: 1fr; }
          .ms-form-grid { grid-template-columns: 1fr; }
          .ms-field.full { grid-column: span 1; }
        }

        @media (max-width: 640px) {
          .ms-topnav, .ms-body { padding-left: 18px; padding-right: 18px; }
          .ms-user-block { display: none; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`ms-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="ms-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="ms-brand-row">
          <div className="ms-brand-mark">PC</div>
          <div>
            <div className="ms-brand-name">Public Complaint</div>
            <div className="ms-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="ms-sidebar-rule" />

        <ul className="ms-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`ms-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ms-sidebar-rule" />

        <a href="/admin/settings" className="ms-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="ms-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`ms-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="ms-main">
        {/* TOP NAVBAR */}
        <nav className="ms-topnav">
          <div className="ms-topnav-left">
            <button className="ms-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="ms-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="ms-topnav-right">
            <button className="ms-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="ms-bell-dot" />
            </button>

            <div className="ms-user-block">
              <div className="ms-user-name-top">Administrator</div>
              <div className="ms-user-role">Admin</div>
            </div>

            <div className="ms-avatar-top">A</div>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <div className="ms-body">
          <div className="ms-page-heading">
            <div>
              <h3 className="ms-title">Manage Staff</h3>
              <p className="ms-subtitle">Add, view, edit and delete staff</p>
            </div>

            <button className="ms-btn ms-btn-green" onClick={openAdd}>
              + Add Staff
            </button>
          </div>

          {/* ================= STATISTICS ================= */}
          <div className="ms-stats-grid">
            <div className="ms-card">
              <div className="ms-card-body">
                <p className="ms-stat-label">Total Staff</p>
                <h2 className="ms-stat-num">{staffList.length}</h2>
              </div>
            </div>

            <div className="ms-card">
              <div className="ms-card-body">
                <p className="ms-stat-label">Available</p>
                <h2 className="ms-stat-num available">{availableCount}</h2>
              </div>
            </div>

            <div className="ms-card">
              <div className="ms-card-body">
                <p className="ms-stat-label">Unavailable</p>
                <h2 className="ms-stat-num unavailable">{unavailableCount}</h2>
              </div>
            </div>
          </div>

          {/* ================= ADD / EDIT FORM ================= */}
          {showForm && (
            <div className="ms-card ms-form-card">
              <div className="ms-card-body">
                <div className="ms-form-head">
                  <h5 className="ms-form-title">
                    {editId ? "Edit Staff" : "Add Staff"}
                  </h5>

                  <button
                    type="button"
                    className="ms-close-btn"
                    onClick={resetForm}
                    aria-label="Close form"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="ms-form-grid">
                    {/* USERNAME */}
                    <div className="ms-field">
                      <label className="ms-label" htmlFor="ms-username">Staff Name</label>
                      <input
                        id="ms-username"
                        type="text"
                        className="ms-input"
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                        disabled={!!editId}
                        placeholder="Enter staff name"
                        required={!editId}
                      />
                      {editId && (
                        <span className="ms-hint">Staff name cannot be changed.</span>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="ms-field">
                      <label className="ms-label" htmlFor="ms-email">Email</label>
                      <input
                        id="ms-email"
                        type="email"
                        className="ms-input"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                      />
                    </div>

                    {/* PASSWORD - ONLY ADD */}
                    {!editId && (
                      <div className="ms-field">
                        <label className="ms-label" htmlFor="ms-password">Password</label>
                        <input
                          id="ms-password"
                          type="password"
                          className="ms-input"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    )}

                    {/* PHONE */}
                    <div className="ms-field">
                      <label className="ms-label" htmlFor="ms-phone">Phone</label>
                      <input
                        id="ms-phone"
                        type="text"
                        className="ms-input"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    {/* DEPARTMENT */}
                    <div className="ms-field">
                      <label className="ms-label" htmlFor="ms-dept">Department</label>
                      <select
                        id="ms-dept"
                        className="ms-select"
                        name="dept"
                        value={form.dept}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                          <option key={department.id} value={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* IMAGE */}
                    <div className="ms-field">
                      <label className="ms-label" htmlFor="ms-image">
                        {editId ? "Change Image" : "Staff Image"}
                      </label>
                      <input
                        id="ms-image"
                        type="file"
                        className="ms-input"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required={!editId}
                      />
                    </div>

                    {/* ADDRESS */}
                    <div className="ms-field full">
                      <label className="ms-label" htmlFor="ms-address">Address</label>
                      <textarea
                        id="ms-address"
                        className="ms-textarea"
                        rows="3"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                      />
                    </div>

                    {/* AVAILABLE */}
                    <div className="ms-field full">
                      <div className="ms-checkbox-row">
                        <input
                          type="checkbox"
                          id="available"
                          name="is_available"
                          checked={form.is_available}
                          onChange={handleChange}
                        />
                        <label htmlFor="available">Staff is Available</label>
                      </div>
                    </div>
                  </div>

                  <div className="ms-form-actions">
                    <button type="submit" className="ms-btn ms-btn-green">
                      {editId ? "Update Staff" : "Add Staff"}
                    </button>

                    <button type="button" className="ms-btn ms-btn-ghost" onClick={resetForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ================= STAFF TABLE ================= */}
          <div className="ms-card">
            <div className="ms-card-body">
              <div className="ms-table-head-row">
                <h5 className="ms-form-title">Staff List</h5>
                <span className="ms-count-badge">{staffList.length} Staff</span>
              </div>

              <div className="ms-table-wrap">
                <table className="ms-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Staff</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffList.length === 0 ? (
                      <tr className="ms-empty-row">
                        <td colSpan="7">No staff found</td>
                      </tr>
                    ) : (
                      staffList.map((staff, index) => (
                        <tr key={staff.id}>
                          <td>{index + 1}</td>

                          <td>
                            <div className="ms-staff-cell">
                              {staff.image ? (
                                <img src={staff.image} alt={staff.username} className="ms-avatar" />
                              ) : (
                                <div className="ms-avatar-fallback">
                                  {staff.username?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <strong>{staff.username}</strong>
                            </div>
                          </td>

                          <td>{staff.email}</td>
                          <td>{staff.phone}</td>

                          <td>
                            <span className="ms-badge ms-badge-dept">
                              {staff.department_name || "Not Assigned"}
                            </span>
                          </td>

                          <td>
                            {staff.is_available ? (
                              <span className="ms-badge ms-badge-available">Available</span>
                            ) : (
                              <span className="ms-badge ms-badge-unavailable">Unavailable</span>
                            )}
                          </td>

                          <td>
                            <div className="ms-actions">
                              <button
                                className="ms-btn ms-btn-sm ms-btn-outline-green"
                                onClick={() => openEdit(staff)}
                              >
                                Edit
                              </button>

                              <button
                                className="ms-btn ms-btn-sm ms-btn-outline-danger"
                                onClick={() => handleDelete(staff.id)}
                              >
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
  );
};

export default ManageStaff;