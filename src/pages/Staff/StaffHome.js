// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../../services/Api";

// const LampMark = ({ size = 22 }) => (
//   <svg width={size} height={size * 1.26} viewBox="0 0 46 58" fill="none" aria-hidden="true">
//     <path d="M23 4C23 4 15 14 15 22C15 27.5 18.5 31 23 31C27.5 31 31 27.5 31 22C31 14 23 4 23 4Z" fill="var(--pcs-gold-soft)" />
//     <path d="M23 10C23 10 19 16 19 21C19 24 20.8 26 23 26C25.2 26 27 24 27 21C27 16 23 10 23 10Z" fill="#FFE8A3" />
//     <rect x="21.4" y="30" width="3.2" height="14" fill="var(--pcs-gold)" />
//     <path d="M10 44C10 40 15.5 38 23 38C30.5 38 36 40 36 44C36 48 30.5 47 23 47C15.5 47 10 48 10 44Z" fill="var(--pcs-gold)" />
//     <ellipse cx="23" cy="44" rx="13" ry="3" fill="var(--pcs-deep-green)" opacity="0.35" />
//   </svg>
// );

// const StaffHome = () => {
//   const navigate = useNavigate();
//   const [navOpen, setNavOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);

//   const [complaints, setComplaints] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   const [staffNote, setStaffNote] = useState("");
//   const [statusUpdate, setStatusUpdate] = useState("");
//   const [requestInfo, setRequestInfo] = useState("");
//   const [proofFile, setProofFile] = useState(null);

//   const userId = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");
//   const staffId = localStorage.getItem("staff_id") || sessionStorage.getItem("staff_id");

//   // ==============================
//   // FETCH ASSIGNED COMPLAINTS
//   // ==============================
//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get(
//         `staff_complaints/?${staffId ? `staff_id=${staffId}` : `user_id=${userId}`}`
//       );
//       if (res.data.status === "success") {
//         setComplaints(res.data.data || []);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // FETCH NOTIFICATIONS
//   // ==============================
//   const fetchNotifications = async () => {
//     try {
//       const res = await API.get(`my_notifications/?user_id=${userId}`);
//       if (res.data.status === "success") {
//         setNotifications(res.data.data || []);
//         setUnreadCount(res.data.unread_count || 0);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//     fetchNotifications();
//   }, []);

//   // ==============================
//   // VIEW COMPLAINT DETAIL
//   // ==============================
//   const viewComplaint = async (id) => {
//     try {
//       setActionLoading(true);
//       const res = await API.get(`view_complaint/${id}/`);
//       if (res.data.status === "success") {
//         setSelectedComplaint(res.data.data);
//         setStaffNote(res.data.data.staff_note || "");
//         setStatusUpdate(res.data.data.status || "IN_PROGRESS");
//         setActiveTab("detail");
//       }
//     } catch (err) {
//       alert("Unable to load complaint");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // ACCEPT
//   // ==============================
//   const handleAccept = async () => {
//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("action", "ACCEPT");

//       const res = await API.post("staff_complaint_action/", formData);
//       if (res.data.status === "success") {
//         alert("Complaint accepted");
//         await viewComplaint(selectedComplaint.id);
//         fetchComplaints();
//       } else {
//         alert(res.data.message || "Failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to accept");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // REJECT
//   // ==============================
//   const handleReject = async () => {
//     const reason = prompt("Reason for rejection:");
//     if (!reason) return;

//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("action", "REJECT");
//       formData.append("note", reason);

//       const res = await API.post("staff_complaint_action/", formData);
//       if (res.data.status === "success") {
//         alert("Complaint rejected");
//         setSelectedComplaint(null);
//         setActiveTab("assigned");
//         fetchComplaints();
//       } else {
//         alert(res.data.message || "Failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to reject");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // UPDATE STATUS + NOTE
//   // ==============================
//   const handleUpdateStatus = async () => {
//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("status", statusUpdate);
//       formData.append("staff_note", staffNote);

//       const res = await API.post("staff_update_complaint/", formData);
//       if (res.data.status === "success") {
//         alert("Updated successfully");
//         await viewComplaint(selectedComplaint.id);
//         fetchComplaints();
//       } else {
//         alert(res.data.message || "Update failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Update failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // MARK RESOLVED
//   // ==============================
//   const handleMarkResolved = async () => {
//     if (!window.confirm("Mark this complaint as Resolved?")) return;

//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("status", "RESOLVED");
//       formData.append("staff_note", staffNote || "Work completed");

//       const res = await API.post("staff_update_complaint/", formData);
//       if (res.data.status === "success") {
//         alert("Complaint marked as Resolved");
//         await viewComplaint(selectedComplaint.id);
//         fetchComplaints();
//       } else {
//         alert(res.data.message || "Failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // REQUEST ADDITIONAL INFO
//   // ==============================
//   const handleRequestInfo = async () => {
//     if (!requestInfo.trim()) {
//       alert("Please write what information you need");
//       return;
//     }

//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("message", requestInfo);

//       const res = await API.post("staff_request_info/", formData);
//       if (res.data.status === "success") {
//         alert("Request sent to citizen");
//         setRequestInfo("");
//       } else {
//         alert(res.data.message || "Failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // ==============================
//   // UPLOAD PROOF
//   // ==============================
//   const handleUploadProof = async () => {
//     if (!proofFile) {
//       alert("Please select a file");
//       return;
//     }

//     try {
//       setActionLoading(true);
//       const formData = new FormData();
//       formData.append("complaint_id", selectedComplaint.id);
//       formData.append("file", proofFile);

//       const res = await API.post("staff_upload_proof/", formData);
//       if (res.data.status === "success") {
//         alert("Proof uploaded");
//         setProofFile(null);
//         await viewComplaint(selectedComplaint.id);
//       } else {
//         alert(res.data.message || "Upload failed");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Upload failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Helpers
//   const statusColor = (status) => {
//     const s = (status || "").toUpperCase();
//     if (["RESOLVED", "CLOSED"].includes(s)) return "var(--pcs-mid-green)";
//     if (["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(s)) return "var(--pcs-gold)";
//     if (s === "REJECTED") return "var(--pcs-laterite)";
//     return "var(--pcs-deep-green)";
//   };

//   const formatTime = (dateStr) => {
//     if (!dateStr) return "";
//     const date = new Date(dateStr);
//     const now = new Date();
//     const diffMins = Math.floor((now - date) / 60000);
//     if (diffMins < 60) return `${diffMins} min ago`;
//     const diffHours = Math.floor(diffMins / 60);
//     if (diffHours < 24) return `${diffHours}h ago`;
//     return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
//   };

//   const assigned = complaints.filter((c) =>
//     ["ASSIGNED", "IN_PROGRESS", "VERIFIED"].includes(c.status)
//   ).length;
//   const resolved = complaints.filter((c) =>
//     ["RESOLVED", "CLOSED"].includes(c.status)
//   ).length;
//   const pending = complaints.filter((c) => c.status === "ASSIGNED").length;
//   const total = complaints.length;

//   return (
//     <div className="pcs-page">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
//         :root {
//           --pcs-deep-green: #10331F;
//           --pcs-mid-green: #1E5C3E;
//           --pcs-gold: #C99A3B;
//           --pcs-gold-soft: #E4C878;
//           --pcs-cream: #FBF6EC;
//           --pcs-laterite: #B0512B;
//           --pcs-ink: #16241C;
//           --pcs-muted: #5E6E64;
//         }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         .pcs-page { font-family: 'Work Sans', sans-serif; color: var(--pcs-ink); background: var(--pcs-cream); min-height: 100vh; }
//         .pcs-page a { text-decoration: none; color: inherit; }
//         .pcs-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
//         h1,h2,h3,h4 { font-family: 'Fraunces', serif; }
//         .pcs-nav { background: var(--pcs-deep-green); padding: 14px 0; position: sticky; top: 0; z-index: 50; box-shadow: 0 2px 14px rgba(16,51,31,0.18); }
//         .pcs-nav-row { display: flex; align-items: center; justify-content: space-between; }
//         .pcs-brand-link { display: flex; align-items: center; gap: 10px; color: var(--pcs-cream); font-family: 'Fraunces', serif; font-weight: 600; font-size: 17px; }
//         .pcs-nav-toggle { display: none; background: none; border: 1px solid rgba(228,200,120,0.4); border-radius: 7px; padding: 7px 10px; color: var(--pcs-gold-soft); font-size: 18px; cursor: pointer; }
//         .pcs-nav-links { display: flex; align-items: center; gap: 22px; }
//         .pcs-nav-links a, .pcs-nav-links button { color: rgba(251,246,236,0.82); font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer; font-family: inherit; }
//         .pcs-nav-links a:hover, .pcs-nav-links button:hover { color: var(--pcs-gold-soft); }
//         .pcs-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 600; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease; font-family: inherit; }
//         .pcs-btn-gold { background: var(--pcs-gold); color: var(--pcs-deep-green); }
//         .pcs-btn-gold:hover { background: var(--pcs-gold-soft); }
//         .pcs-btn-primary { background: var(--pcs-deep-green); color: var(--pcs-gold-soft); }
//         .pcs-btn-primary:hover { background: var(--pcs-mid-green); }
//         .pcs-btn-outline { background: transparent; color: var(--pcs-deep-green); border-color: var(--pcs-deep-green); }
//         .pcs-btn-outline:hover { background: var(--pcs-deep-green); color: var(--pcs-gold-soft); }
//         .pcs-btn-danger { background: var(--pcs-laterite); color: white; }
//         .pcs-btn-danger:hover { background: #8f3f22; }
//         .pcs-btn-sm { padding: 6px 12px; font-size: 12.5px; }
//         .pcs-btn:disabled { opacity: 0.6; cursor: not-allowed; }
//         .pcs-main { display: grid; grid-template-columns: 240px 1fr; gap: 28px; padding: 28px 0 48px; min-height: calc(100vh - 60px); }
//         .pcs-sidebar { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 14px; padding: 20px 14px; height: fit-content; position: sticky; top: 80px; }
//         .pcs-user-card { text-align: center; padding: 12px 8px 18px; border-bottom: 1px solid #ECE7D9; margin-bottom: 14px; }
//         .pcs-avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--pcs-cream); border: 2.5px solid var(--pcs-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 26px; }
//         .pcs-user-name { font-weight: 600; font-size: 15px; color: var(--pcs-deep-green); }
//         .pcs-user-role { font-size: 12px; color: var(--pcs-muted); margin-top: 2px; }
//         .pcs-side-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; font-size: 13.5px; font-weight: 500; color: var(--pcs-ink); cursor: pointer; transition: background 0.12s ease; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
//         .pcs-side-link:hover { background: rgba(30,92,62,0.07); }
//         .pcs-side-link.active { background: rgba(30,92,62,0.12); color: var(--pcs-deep-green); font-weight: 600; }
//         .pcs-side-icon { width: 20px; text-align: center; font-size: 15px; }
//         .pcs-badge-count { background: var(--pcs-laterite); color: white; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 999px; margin-left: auto; }
//         .pcs-content { min-width: 0; }
//         .pcs-page-title { font-size: 26px; font-weight: 700; color: var(--pcs-deep-green); margin-bottom: 6px; }
//         .pcs-page-sub { font-size: 14px; color: var(--pcs-muted); margin-bottom: 24px; }
//         .pcs-stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 28px; }
//         .pcs-stat { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 12px; padding: 18px 16px; text-align: center; }
//         .pcs-stat-num { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; margin-bottom: 2px; }
//         .pcs-stat-label { font-size: 12.5px; color: var(--pcs-muted); }
//         .pcs-card { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 14px; padding: 22px; margin-bottom: 20px; }
//         .pcs-card-title { font-size: 17px; font-weight: 600; color: var(--pcs-deep-green); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
//         .pcs-complaint-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 14px 0; border-bottom: 1px solid #F0EBE0; cursor: pointer; }
//         .pcs-complaint-item:last-child { border-bottom: none; }
//         .pcs-complaint-item:hover { background: rgba(251,246,236,0.6); }
//         .pcs-cmp-id { font-size: 12.5px; font-weight: 600; color: var(--pcs-mid-green); margin-bottom: 3px; }
//         .pcs-cmp-desc { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
//         .pcs-cmp-meta { font-size: 12.5px; color: var(--pcs-muted); }
//         .pcs-status-badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 600; color: #fff; }
//         .pcs-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; margin-bottom: 16px; }
//         .pcs-detail-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--pcs-muted); margin-bottom: 3px; }
//         .pcs-detail-value { font-size: 14.5px; font-weight: 500; }
//         .pcs-field { margin-bottom: 16px; }
//         .pcs-label { display: block; font-size: 12.5px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; color: var(--pcs-deep-green); margin-bottom: 6px; }
//         .pcs-input, .pcs-select, .pcs-textarea { width: 100%; padding: 11px 13px; font-size: 14px; font-family: 'Work Sans', sans-serif; border: 1.5px solid #DDE3DB; border-radius: 9px; background: #FFFEF9; color: var(--pcs-ink); }
//         .pcs-input:focus, .pcs-select:focus, .pcs-textarea:focus { outline: none; border-color: var(--pcs-gold); box-shadow: 0 0 0 3px rgba(201,154,59,0.15); }
//         .pcs-textarea { resize: vertical; min-height: 90px; }
//         .pcs-actions-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
//         .pcs-notif-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #F0EBE0; }
//         .pcs-notif-item:last-child { border-bottom: none; }
//         .pcs-notif-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pcs-laterite); margin-top: 6px; flex-shrink: 0; }
//         .pcs-notif-dot.read { background: #C5CFC8; }
//         .pcs-empty, .pcs-loading { text-align: center; padding: 40px 20px; color: var(--pcs-muted); font-size: 14px; }
//         @media (max-width: 900px) {
//           .pcs-main { grid-template-columns: 1fr; }
//           .pcs-sidebar { position: static; display: flex; flex-wrap: wrap; gap: 6px; padding: 14px; }
//           .pcs-user-card { display: none; }
//           .pcs-side-link { width: auto; padding: 8px 12px; font-size: 13px; }
//           .pcs-stats-row { grid-template-columns: repeat(2,1fr); }
//           .pcs-detail-grid { grid-template-columns: 1fr; }
//         }
//         @media (max-width: 640px) {
//           .pcs-nav-toggle { display: inline-block; }
//           .pcs-nav-links { position: absolute; top: 56px; left: 0; right: 0; background: var(--pcs-deep-green); flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px 20px 18px; display: none; border-top: 1px solid rgba(228,200,120,0.2); }
//           .pcs-nav-links.open { display: flex; }
//         }
//       `}</style>

//       {/* NAVBAR */}
//       <nav className="pcs-nav">
//         <div className="pcs-container pcs-nav-row">
//           <Link className="pcs-brand-link" to="/">
//             <LampMark /> Public Complaint System
//           </Link>
//           <button className="pcs-nav-toggle" onClick={() => setNavOpen((o) => !o)}>☰</button>
//           <div className={`pcs-nav-links ${navOpen ? "open" : ""}`}>
//             <button onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}>Dashboard</button>
//             <button onClick={() => { setActiveTab("assigned"); setSelectedComplaint(null); }}>Assigned</button>
//             <button onClick={() => setActiveTab("notifications")}>
//               Notifications {unreadCount > 0 && `(${unreadCount})`}
//             </button>
//             <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">Logout</Link>
//           </div>
//         </div>
//       </nav>

//       <div className="pcs-container pcs-main">
//         {/* SIDEBAR */}
//         <aside className="pcs-sidebar">
//           <div className="pcs-user-card">
//             <div className="pcs-avatar">👷</div>
//             <div className="pcs-user-name">Staff Member</div>
//             <div className="pcs-user-role">Field Staff</div>
//           </div>

//           <button className={`pcs-side-link ${activeTab === "dashboard" ? "active" : ""}`}
//             onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}>
//             <span className="pcs-side-icon">🏠</span> Dashboard
//           </button>

//           <button className={`pcs-side-link ${activeTab === "assigned" ? "active" : ""}`}
//             onClick={() => { setActiveTab("assigned"); setSelectedComplaint(null); }}>
//             <span className="pcs-side-icon">📋</span> Assigned Complaints
//           </button>

//           <button className={`pcs-side-link ${activeTab === "history" ? "active" : ""}`}
//             onClick={() => { setActiveTab("history"); setSelectedComplaint(null); }}>
//             <span className="pcs-side-icon">📂</span> Previous Complaints
//           </button>

//           <button className={`pcs-side-link ${activeTab === "performance" ? "active" : ""}`}
//             onClick={() => setActiveTab("performance")}>
//             <span className="pcs-side-icon">📊</span> Performance
//           </button>

//           <button className={`pcs-side-link ${activeTab === "notifications" ? "active" : ""}`}
//             onClick={() => setActiveTab("notifications")}>
//             <span className="pcs-side-icon">🔔</span> Notifications
//             {unreadCount > 0 && <span className="pcs-badge-count">{unreadCount}</span>}
//           </button>
//         </aside>

//         {/* CONTENT */}
//         <div className="pcs-content">
//           {loading && <div className="pcs-loading">Loading...</div>}

//           {/* DASHBOARD */}
//           {!loading && activeTab === "dashboard" && !selectedComplaint && (
//             <>
//               <h1 className="pcs-page-title">Staff Dashboard</h1>
//               <p className="pcs-page-sub">Overview of your assigned work</p>

//               <div className="pcs-stats-row">
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
//                   <div className="pcs-stat-label">Total Assigned</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{assigned}</div>
//                   <div className="pcs-stat-label">Active</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-laterite)" }}>{pending}</div>
//                   <div className="pcs-stat-label">Pending Accept</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
//                   <div className="pcs-stat-label">Resolved</div>
//                 </div>
//               </div>

//               <div className="pcs-card">
//                 <div className="pcs-card-title">Recent Assigned Complaints</div>
//                 {complaints.length === 0 ? (
//                   <div className="pcs-empty">No complaints assigned yet.</div>
//                 ) : (
//                   complaints.slice(0, 5).map((c) => (
//                     <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
//                       <div>
//                         <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
//                         <div className="pcs-cmp-desc">{c.description?.slice(0, 80)}...</div>
//                         <div className="pcs-cmp-meta">
//                           {c.category?.name || c.category} · {c.location}
//                         </div>
//                       </div>
//                       <span className="pcs-status-badge" style={{ background: statusColor(c.status) }}>
//                         {c.status}
//                       </span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </>
//           )}

//           {/* ASSIGNED LIST */}
//           {!loading && activeTab === "assigned" && !selectedComplaint && (
//             <>
//               <h1 className="pcs-page-title">Assigned Complaints</h1>
//               <p className="pcs-page-sub">Complaints currently assigned to you</p>
//               <div className="pcs-card">
//                 {complaints.filter((c) => !["RESOLVED", "CLOSED", "REJECTED"].includes(c.status)).length === 0 ? (
//                   <div className="pcs-empty">No active assigned complaints.</div>
//                 ) : (
//                   complaints
//                     .filter((c) => !["RESOLVED", "CLOSED", "REJECTED"].includes(c.status))
//                     .map((c) => (
//                       <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
//                         <div>
//                           <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
//                           <div className="pcs-cmp-desc">{c.description?.slice(0, 90)}</div>
//                           <div className="pcs-cmp-meta">{c.category?.name || c.category} · {c.location}</div>
//                         </div>
//                         <span className="pcs-status-badge" style={{ background: statusColor(c.status) }}>
//                           {c.status}
//                         </span>
//                       </div>
//                     ))
//                 )}
//               </div>
//             </>
//           )}

//           {/* HISTORY */}
//           {!loading && activeTab === "history" && !selectedComplaint && (
//             <>
//               <h1 className="pcs-page-title">Previous Complaints</h1>
//               <p className="pcs-page-sub">Resolved and closed complaints</p>
//               <div className="pcs-card">
//                 {complaints.filter((c) => ["RESOLVED", "CLOSED", "REJECTED"].includes(c.status)).length === 0 ? (
//                   <div className="pcs-empty">No previous complaints.</div>
//                 ) : (
//                   complaints
//                     .filter((c) => ["RESOLVED", "CLOSED", "REJECTED"].includes(c.status))
//                     .map((c) => (
//                       <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
//                         <div>
//                           <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
//                           <div className="pcs-cmp-desc">{c.description?.slice(0, 90)}</div>
//                         </div>
//                         <span className="pcs-status-badge" style={{ background: statusColor(c.status) }}>
//                           {c.status}
//                         </span>
//                       </div>
//                     ))
//                 )}
//               </div>
//             </>
//           )}

//           {/* PERFORMANCE */}
//           {activeTab === "performance" && (
//             <>
//               <h1 className="pcs-page-title">My Performance</h1>
//               <p className="pcs-page-sub">Summary of your work</p>
//               <div className="pcs-stats-row">
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
//                   <div className="pcs-stat-label">Total Handled</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
//                   <div className="pcs-stat-label">Resolved</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{assigned}</div>
//                   <div className="pcs-stat-label">Currently Active</div>
//                 </div>
//                 <div className="pcs-stat">
//                   <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>
//                     {total > 0 ? Math.round((resolved / total) * 100) : 0}%
//                   </div>
//                   <div className="pcs-stat-label">Resolution Rate</div>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* NOTIFICATIONS */}
//           {activeTab === "notifications" && (
//             <>
//               <h1 className="pcs-page-title">Notifications</h1>
//               <p className="pcs-page-sub">
//                 Updates related to your work
//                 {unreadCount > 0 && (
//                   <span style={{ color: "var(--pcs-laterite)", fontWeight: 600 }}> • {unreadCount} unread</span>
//                 )}
//               </p>
//               <div className="pcs-card">
//                 {notifications.length === 0 ? (
//                   <div className="pcs-empty">No notifications yet.</div>
//                 ) : (
//                   notifications.map((n) => (
//                     <div key={n.id} className="pcs-notif-item">
//                       <div className={`pcs-notif-dot ${n.is_read ? "read" : ""}`} />
//                       <div>
//                         <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--pcs-deep-green)" }}>{n.title}</div>
//                         <div style={{ fontSize: "13.5px" }}>{n.message}</div>
//                         <div style={{ fontSize: "12px", color: "var(--pcs-muted)", marginTop: "4px" }}>
//                           {formatTime(n.created_at)}
//                           {n.complaint_id && ` · Complaint #${n.complaint_id}`}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </>
//           )}

//           {/* COMPLAINT DETAIL */}
//           {selectedComplaint && (
//             <>
//               <button
//                 className="pcs-btn pcs-btn-outline pcs-btn-sm"
//                 style={{ marginBottom: "16px" }}
//                 onClick={() => { setSelectedComplaint(null); setActiveTab("assigned"); }}
//               >
//                 ← Back to list
//               </button>

//               <h1 className="pcs-page-title">#{selectedComplaint.id} · {selectedComplaint.title}</h1>
//               <p className="pcs-page-sub">{selectedComplaint.description}</p>

//               <div className="pcs-card">
//                 <div className="pcs-card-title">
//                   Complaint Details
//                   <span className="pcs-status-badge" style={{ background: statusColor(selectedComplaint.status) }}>
//                     {selectedComplaint.status}
//                   </span>
//                 </div>

//                 <div className="pcs-detail-grid">
//                   <div>
//                     <div className="pcs-detail-label">Category</div>
//                     <div className="pcs-detail-value">{selectedComplaint.category?.name || "—"}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Location</div>
//                     <div className="pcs-detail-value">📍 {selectedComplaint.location}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Priority</div>
//                     <div className="pcs-detail-value">{selectedComplaint.priority}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Submitted</div>
//                     <div className="pcs-detail-value">{selectedComplaint.submitted_at}</div>
//                   </div>
//                 </div>

//                 {selectedComplaint.image && (
//                   <div style={{ marginTop: "12px" }}>
//                     <div className="pcs-detail-label">Complaint Image</div>
//                     <img
//                       src={selectedComplaint.image}
//                       alt="Complaint"
//                       style={{ maxWidth: "100%", maxHeight: "260px", borderRadius: "10px", border: "1px solid #ECE7D9", marginTop: "6px" }}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* ACCEPT / REJECT */}
//               {selectedComplaint.status === "ASSIGNED" && (
//                 <div className="pcs-card">
//                   <div className="pcs-card-title">Accept / Reject</div>
//                   <p style={{ fontSize: "13.5px", color: "var(--pcs-muted)", marginBottom: "14px" }}>
//                     Accept to start working or reject with a reason.
//                   </p>
//                   <div className="pcs-actions-row">
//                     <button className="pcs-btn pcs-btn-primary" onClick={handleAccept} disabled={actionLoading}>
//                       ✓ Accept Complaint
//                     </button>
//                     <button className="pcs-btn pcs-btn-danger" onClick={handleReject} disabled={actionLoading}>
//                       ✕ Reject
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* UPDATE STATUS */}
//               {["IN_PROGRESS", "VERIFIED", "ASSIGNED"].includes(selectedComplaint.status) && (
//                 <div className="pcs-card">
//                   <div className="pcs-card-title">Update Status & Notes</div>

//                   <div className="pcs-field">
//                     <label className="pcs-label">Status</label>
//                     <select className="pcs-select" value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)}>
//                       <option value="IN_PROGRESS">In Progress</option>
//                       <option value="RESOLVED">Resolved</option>
//                     </select>
//                   </div>

//                   <div className="pcs-field">
//                     <label className="pcs-label">Work / Resolution Notes</label>
//                     <textarea
//                       className="pcs-textarea"
//                       value={staffNote}
//                       onChange={(e) => setStaffNote(e.target.value)}
//                       placeholder="Describe the work done..."
//                     />
//                   </div>

//                   <div className="pcs-actions-row">
//                     <button className="pcs-btn pcs-btn-primary" onClick={handleUpdateStatus} disabled={actionLoading}>
//                       Save Update
//                     </button>
//                     <button className="pcs-btn pcs-btn-gold" onClick={handleMarkResolved} disabled={actionLoading}>
//                       ✓ Mark as Resolved
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* REQUEST INFO */}
//               {["IN_PROGRESS", "ASSIGNED"].includes(selectedComplaint.status) && (
//                 <div className="pcs-card">
//                   <div className="pcs-card-title">Request Additional Information</div>
//                   <div className="pcs-field">
//                     <label className="pcs-label">Message to Citizen</label>
//                     <textarea
//                       className="pcs-textarea"
//                       value={requestInfo}
//                       onChange={(e) => setRequestInfo(e.target.value)}
//                       placeholder="What extra information do you need?"
//                     />
//                   </div>
//                   <button className="pcs-btn pcs-btn-outline" onClick={handleRequestInfo} disabled={actionLoading}>
//                     Send Request
//                   </button>
//                 </div>
//               )}

//               {/* UPLOAD PROOF */}
//               {["IN_PROGRESS", "ASSIGNED"].includes(selectedComplaint.status) && (
//                 <div className="pcs-card">
//                   <div className="pcs-card-title">Upload Proof / Documents</div>
//                   <div className="pcs-field">
//                     <label className="pcs-label">Select File</label>
//                     <input
//                       type="file"
//                       className="pcs-input"
//                       accept="image/*,.pdf"
//                       onChange={(e) => setProofFile(e.target.files[0])}
//                     />
//                   </div>
//                   <button
//                     className="pcs-btn pcs-btn-primary"
//                     onClick={handleUploadProof}
//                     disabled={actionLoading || !proofFile}
//                   >
//                     Upload Proof
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffHome;













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

const StaffHome = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [staffProfile, setStaffProfile] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [staffNote, setStaffNote] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [requestInfo, setRequestInfo] = useState("");
  const [proofFile, setProofFile] = useState(null);

  const userId = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");
  const staffId = localStorage.getItem("staff_id") || sessionStorage.getItem("staff_id");

  // ==============================
  // FETCH STAFF PROFILE
  // ==============================
  const fetchStaffProfile = async () => {
    try {
      const res = await API.get(
        `view_staff_profile/?${staffId ? `staff_id=${staffId}` : `user_id=${userId}`}`
      );
      if (res.data.status === "success") {
        setStaffProfile(res.data.data);
      }
    } catch (err) {
      console.error("Staff profile error:", err);
    }
  };

  // ==============================
  // FETCH ASSIGNED COMPLAINTS
  // ==============================
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `staff_complaints/?${staffId ? `staff_id=${staffId}` : `user_id=${userId}`}`
      );
      if (res.data.status === "success") {
        setComplaints(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH NOTIFICATIONS
  // ==============================
  const fetchNotifications = async () => {
    try {
      const res = await API.get(`my_notifications/?user_id=${userId}`);
      if (res.data.status === "success") {
        setNotifications(res.data.data || []);
        setUnreadCount(res.data.unread_count || 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaffProfile();
    fetchComplaints();
    fetchNotifications();
  }, []);

  // ==============================
  // VIEW COMPLAINT DETAIL
  // ==============================
  const viewComplaint = async (id) => {
    try {
      setActionLoading(true);
      const res = await API.get(`view_complaint/${id}/`);
      if (res.data.status === "success") {
        setSelectedComplaint(res.data.data);
        setStaffNote(res.data.data.staff_note || "");
        setStatusUpdate(res.data.data.status || "IN_PROGRESS");
        setActiveTab("detail");
      }
    } catch (err) {
      alert("Unable to load complaint");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // ACCEPT
  // ==============================
  const handleAccept = async () => {
    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("action", "ACCEPT");

      const res = await API.post("staff_complaint_action/", formData);
      if (res.data.status === "success") {
        alert("Complaint accepted");
        await viewComplaint(selectedComplaint.id);
        fetchComplaints();
      } else {
        alert(res.data.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // REJECT
  // ==============================
  const handleReject = async () => {
    const reason = prompt("Reason for rejection:");
    if (!reason) return;

    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("action", "REJECT");
      formData.append("note", reason);

      const res = await API.post("staff_complaint_action/", formData);
      if (res.data.status === "success") {
        alert("Complaint rejected");
        setSelectedComplaint(null);
        setActiveTab("assigned");
        fetchComplaints();
      } else {
        alert(res.data.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // UPDATE STATUS + NOTE
  // ==============================
  const handleUpdateStatus = async () => {
    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("status", statusUpdate);
      formData.append("staff_note", staffNote);

      const res = await API.post("staff_update_complaint/", formData);
      if (res.data.status === "success") {
        alert("Updated successfully");
        await viewComplaint(selectedComplaint.id);
        fetchComplaints();
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // MARK RESOLVED
  // ==============================
  const handleMarkResolved = async () => {
    if (!window.confirm("Mark this complaint as Resolved?")) return;

    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("status", "RESOLVED");
      formData.append("staff_note", staffNote || "Work completed");

      const res = await API.post("staff_update_complaint/", formData);
      if (res.data.status === "success") {
        alert("Complaint marked as Resolved");
        await viewComplaint(selectedComplaint.id);
        fetchComplaints();
      } else {
        alert(res.data.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // REQUEST ADDITIONAL INFO
  // ==============================
  const handleRequestInfo = async () => {
    if (!requestInfo.trim()) {
      alert("Please write what information you need");
      return;
    }

    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("message", requestInfo);

      const res = await API.post("staff_request_info/", formData);
      if (res.data.status === "success") {
        alert("Request sent to citizen");
        setRequestInfo("");
      } else {
        alert(res.data.message || "Failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ==============================
  // UPLOAD PROOF
  // ==============================
  const handleUploadProof = async () => {
    if (!proofFile) {
      alert("Please select a file");
      return;
    }

    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint.id);
      formData.append("file", proofFile);

      const res = await API.post("staff_upload_proof/", formData);
      if (res.data.status === "success") {
        alert("Proof uploaded");
        setProofFile(null);
        await viewComplaint(selectedComplaint.id);
      } else {
        alert(res.data.message || "Upload failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setActionLoading(false);
    }
  };

  // Helpers
  const statusColor = (status) => {
    const s = (status || "").toUpperCase();
    if (["RESOLVED", "CLOSED"].includes(s)) return "var(--pcs-mid-green)";
    if (["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(s)) return "var(--pcs-gold)";
    if (s === "REJECTED") return "var(--pcs-laterite)";
    return "var(--pcs-deep-green)";
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  };

  const assigned = complaints.filter((c) =>
    ["ASSIGNED", "IN_PROGRESS", "VERIFIED"].includes(c.status)
  ).length;
  const resolved = complaints.filter((c) =>
    ["RESOLVED", "CLOSED"].includes(c.status)
  ).length;
  const pending = complaints.filter((c) => c.status === "ASSIGNED").length;
  const total = complaints.length;

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
        .pcs-page { font-family: 'Work Sans', sans-serif; color: var(--pcs-ink); background: var(--pcs-cream); min-height: 100vh; }
        .pcs-page a { text-decoration: none; color: inherit; }
        .pcs-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        h1,h2,h3,h4 { font-family: 'Fraunces', serif; }
        .pcs-nav { background: var(--pcs-deep-green); padding: 14px 0; position: sticky; top: 0; z-index: 50; box-shadow: 0 2px 14px rgba(16,51,31,0.18); }
        .pcs-nav-row { display: flex; align-items: center; justify-content: space-between; }
        .pcs-brand-link { display: flex; align-items: center; gap: 10px; color: #fff; font-family: 'Fraunces', serif; font-weight: 600; font-size: 17px; }
        .pcs-nav-toggle { display: none; background: none; border: 1px solid rgba(228,200,120,0.4); border-radius: 7px; padding: 7px 10px; color: var(--pcs-gold-soft); font-size: 18px; cursor: pointer; }
        .pcs-nav-links { display: flex; align-items: center; gap: 22px; }
        .pcs-nav-links a, .pcs-nav-links button { color: rgba(251,246,236,0.82); font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer; font-family: inherit; }
        .pcs-nav-links a:hover, .pcs-nav-links button:hover { color: var(--pcs-gold-soft); }
        .pcs-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 600; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease; font-family: inherit; }
        .pcs-btn-gold { background: var(--pcs-gold); color: var(--pcs-deep-green); }
        .pcs-btn-gold:hover { background: var(--pcs-gold-soft); }
        .pcs-btn-primary { background: var(--pcs-deep-green); color: var(--pcs-gold-soft); }
        .pcs-btn-primary:hover { background: var(--pcs-mid-green); }
        .pcs-btn-outline { background: transparent; color: var(--pcs-deep-green); border-color: var(--pcs-deep-green); }
        .pcs-btn-outline:hover { background: var(--pcs-deep-green); color: var(--pcs-gold-soft); }
        .pcs-btn-danger { background: var(--pcs-laterite); color: white; }
        .pcs-btn-danger:hover { background: #8f3f22; }
        .pcs-btn-sm { padding: 6px 12px; font-size: 12.5px; }
        .pcs-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .pcs-main { display: grid; grid-template-columns: 240px 1fr; gap: 28px; padding: 28px 0 48px; min-height: calc(100vh - 60px); }
        .pcs-sidebar { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 14px; padding: 20px 14px; height: fit-content; position: sticky; top: 80px; }
        .pcs-user-card { text-align: center; padding: 12px 8px 18px; border-bottom: 1px solid #ECE7D9; margin-bottom: 14px; }
        .pcs-avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--pcs-cream); border: 2.5px solid var(--pcs-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-size: 22px; font-weight: 600; color: var(--pcs-deep-green); overflow: hidden; }
        .pcs-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .pcs-user-name { font-weight: 600; font-size: 15px; color: var(--pcs-deep-green); }
        .pcs-user-role { font-size: 12px; color: var(--pcs-muted); margin-top: 2px; }
        .pcs-side-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; font-size: 13.5px; font-weight: 500; color: var(--pcs-ink); cursor: pointer; transition: background 0.12s ease; border: none; background: none; width: 100%; text-align: left; font-family: inherit; }
        .pcs-side-link:hover { background: rgba(30,92,62,0.07); }
        .pcs-side-link.active { background: rgba(30,92,62,0.12); color: var(--pcs-deep-green); font-weight: 600; }
        .pcs-side-icon { width: 20px; text-align: center; font-size: 15px; }
        .pcs-badge-count { background: var(--pcs-laterite); color: white; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 999px; margin-left: auto; }
        .pcs-content { min-width: 0; }
        .pcs-page-title { font-size: 26px; font-weight: 700; color: var(--pcs-deep-green); margin-bottom: 6px; }
        .pcs-page-sub { font-size: 14px; color: var(--pcs-muted); margin-bottom: 24px; }
        .pcs-stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 28px; }
        .pcs-stat { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 12px; padding: 18px 16px; text-align: center; }
        .pcs-stat-num { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 700; margin-bottom: 2px; }
        .pcs-stat-label { font-size: 12.5px; color: var(--pcs-muted); }
        .pcs-card { background: #FFFFFF; border: 1px solid #ECE7D9; border-radius: 14px; padding: 22px; margin-bottom: 20px; }
        .pcs-card-title { font-size: 17px; font-weight: 600; color: var(--pcs-deep-green); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
        .pcs-complaint-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 14px 0; border-bottom: 1px solid #F0EBE0; cursor: pointer; }
        .pcs-complaint-item:last-child { border-bottom: none; }
        .pcs-complaint-item:hover { background: rgba(251,246,236,0.6); }
        .pcs-cmp-id { font-size: 12.5px; font-weight: 600; color: var(--pcs-mid-green); margin-bottom: 3px; }
        .pcs-cmp-desc { font-size: 14px; font-weight: 500; margin-bottom: 4px; }
        .pcs-cmp-meta { font-size: 12.5px; color: var(--pcs-muted); }
        .pcs-status-badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 600; color: #fff; }
        .pcs-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; margin-bottom: 16px; }
        .pcs-detail-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--pcs-muted); margin-bottom: 3px; }
        .pcs-detail-value { font-size: 14.5px; font-weight: 500; }
        .pcs-field { margin-bottom: 16px; }
        .pcs-label { display: block; font-size: 12.5px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; color: var(--pcs-deep-green); margin-bottom: 6px; }
        .pcs-input, .pcs-select, .pcs-textarea { width: 100%; padding: 11px 13px; font-size: 14px; font-family: 'Work Sans', sans-serif; border: 1.5px solid #DDE3DB; border-radius: 9px; background: #FFFEF9; color: var(--pcs-ink); }
        .pcs-input:focus, .pcs-select:focus, .pcs-textarea:focus { outline: none; border-color: var(--pcs-gold); box-shadow: 0 0 0 3px rgba(201,154,59,0.15); }
        .pcs-textarea { resize: vertical; min-height: 90px; }
        .pcs-actions-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
        .pcs-notif-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #F0EBE0; }
        .pcs-notif-item:last-child { border-bottom: none; }
        .pcs-notif-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--pcs-laterite); margin-top: 6px; flex-shrink: 0; }
        .pcs-notif-dot.read { background: #C5CFC8; }
        .pcs-empty, .pcs-loading { text-align: center; padding: 40px 20px; color: var(--pcs-muted); font-size: 14px; }
        @media (max-width: 900px) {
          .pcs-main { grid-template-columns: 1fr; }
          .pcs-sidebar { position: static; display: flex; flex-wrap: wrap; gap: 6px; padding: 14px; }
          .pcs-user-card { display: none; }
          .pcs-side-link { width: auto; padding: 8px 12px; font-size: 13px; }
          .pcs-stats-row { grid-template-columns: repeat(2,1fr); }
          .pcs-detail-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .pcs-nav-toggle { display: inline-block; }
          .pcs-nav-links { position: absolute; top: 56px; left: 0; right: 0; background: var(--pcs-deep-green); flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px 20px 18px; display: none; border-top: 1px solid rgba(228,200,120,0.2); }
          .pcs-nav-links.open { display: flex; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="pcs-nav">
        <div className="pcs-container pcs-nav-row">
          <Link className="pcs-brand-link" to="/" style={{ color: "#fff" }}>
            <LampMark /> Public Complaint System
          </Link>
          <button className="pcs-nav-toggle" onClick={() => setNavOpen((o) => !o)}>☰</button>
          <div className={`pcs-nav-links ${navOpen ? "open" : ""}`}>
            <button onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}>Dashboard</button>
            <button onClick={() => { setActiveTab("assigned"); setSelectedComplaint(null); }}>Assigned</button>
            <button onClick={() => setActiveTab("notifications")}>
              Notifications {unreadCount > 0 && `(${unreadCount})`}
            </button>
            <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">Logout</Link>
          </div>
        </div>
      </nav>

      <div className="pcs-container pcs-main">
        {/* SIDEBAR */}
        <aside className="pcs-sidebar">
          <div className="pcs-user-card">
            <div className="pcs-avatar">
              {staffProfile?.image ? (
                <img src={staffProfile.image} alt="Staff" />
              ) : (
                (staffProfile?.name?.charAt(0) || "S").toUpperCase()
              )}
            </div>
            <div className="pcs-user-name">
              {staffProfile?.name || "Staff"}
            </div>
            <div className="pcs-user-role">
              {staffProfile?.department?.name || "Field Staff"}
            </div>
          </div>

          <button
            className={`pcs-side-link ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => { setActiveTab("dashboard"); setSelectedComplaint(null); }}
          >
            <span className="pcs-side-icon">🏠</span> Dashboard
          </button>

          <button
            className={`pcs-side-link ${activeTab === "assigned" ? "active" : ""}`}
            onClick={() => { setActiveTab("assigned"); setSelectedComplaint(null); }}
          >
            <span className="pcs-side-icon">📋</span> Assigned Complaints
          </button>

          <button
            className={`pcs-side-link ${activeTab === "history" ? "active" : ""}`}
            onClick={() => { setActiveTab("history"); setSelectedComplaint(null); }}
          >
            <span className="pcs-side-icon">📂</span> Previous Complaints
          </button>

          <button
            className={`pcs-side-link ${activeTab === "performance" ? "active" : ""}`}
            onClick={() => setActiveTab("performance")}
          >
            <span className="pcs-side-icon">📊</span> Performance
          </button>

          <button
            className={`pcs-side-link ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="pcs-side-icon">🔔</span> Notifications
            {unreadCount > 0 && <span className="pcs-badge-count">{unreadCount}</span>}
          </button>
        </aside>

        {/* CONTENT */}
        <div className="pcs-content">
          {loading && <div className="pcs-loading">Loading...</div>}

          {/* DASHBOARD */}
          {!loading && activeTab === "dashboard" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">
                Staff Dashboard
                {staffProfile?.name ? ` · ${staffProfile.name.split(" ")[0]}` : ""}
              </h1>
              <p className="pcs-page-sub">Overview of your assigned work</p>

              <div className="pcs-stats-row">
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
                  <div className="pcs-stat-label">Total Assigned</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{assigned}</div>
                  <div className="pcs-stat-label">Active</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-laterite)" }}>{pending}</div>
                  <div className="pcs-stat-label">Pending Accept</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
                  <div className="pcs-stat-label">Resolved</div>
                </div>
              </div>

              <div className="pcs-card">
                <div className="pcs-card-title">Recent Assigned Complaints</div>
                {complaints.length === 0 ? (
                  <div className="pcs-empty">No complaints assigned yet.</div>
                ) : (
                  complaints.slice(0, 5).map((c) => (
                    <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
                      <div>
                        <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
                        <div className="pcs-cmp-desc">{c.description?.slice(0, 80)}...</div>
                        <div className="pcs-cmp-meta">
                          {c.category?.name || c.category} · {c.location}
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

          {/* ASSIGNED LIST */}
          {!loading && activeTab === "assigned" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">Assigned Complaints</h1>
              <p className="pcs-page-sub">Complaints currently assigned to you</p>
              <div className="pcs-card">
                {complaints.filter((c) => !["RESOLVED", "CLOSED", "REJECTED"].includes(c.status)).length === 0 ? (
                  <div className="pcs-empty">No active assigned complaints.</div>
                ) : (
                  complaints
                    .filter((c) => !["RESOLVED", "CLOSED", "REJECTED"].includes(c.status))
                    .map((c) => (
                      <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
                        <div>
                          <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
                          <div className="pcs-cmp-desc">{c.description?.slice(0, 90)}</div>
                          <div className="pcs-cmp-meta">{c.category?.name || c.category} · {c.location}</div>
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

          {/* HISTORY */}
          {!loading && activeTab === "history" && !selectedComplaint && (
            <>
              <h1 className="pcs-page-title">Previous Complaints</h1>
              <p className="pcs-page-sub">Resolved and closed complaints</p>
              <div className="pcs-card">
                {complaints.filter((c) => ["RESOLVED", "CLOSED", "REJECTED"].includes(c.status)).length === 0 ? (
                  <div className="pcs-empty">No previous complaints.</div>
                ) : (
                  complaints
                    .filter((c) => ["RESOLVED", "CLOSED", "REJECTED"].includes(c.status))
                    .map((c) => (
                      <div key={c.id} className="pcs-complaint-item" onClick={() => viewComplaint(c.id)}>
                        <div>
                          <div className="pcs-cmp-id">#{c.id} · {c.title}</div>
                          <div className="pcs-cmp-desc">{c.description?.slice(0, 90)}</div>
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

          {/* PERFORMANCE */}
          {activeTab === "performance" && (
            <>
              <h1 className="pcs-page-title">My Performance</h1>
              <p className="pcs-page-sub">Summary of your work</p>
              <div className="pcs-stats-row">
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
                  <div className="pcs-stat-label">Total Handled</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
                  <div className="pcs-stat-label">Resolved</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{assigned}</div>
                  <div className="pcs-stat-label">Currently Active</div>
                </div>
                <div className="pcs-stat">
                  <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>
                    {total > 0 ? Math.round((resolved / total) * 100) : 0}%
                  </div>
                  <div className="pcs-stat-label">Resolution Rate</div>
                </div>
              </div>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <h1 className="pcs-page-title">Notifications</h1>
              <p className="pcs-page-sub">
                Updates related to your work
                {unreadCount > 0 && (
                  <span style={{ color: "var(--pcs-laterite)", fontWeight: 600 }}> • {unreadCount} unread</span>
                )}
              </p>
              <div className="pcs-card">
                {notifications.length === 0 ? (
                  <div className="pcs-empty">No notifications yet.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="pcs-notif-item">
                      <div className={`pcs-notif-dot ${n.is_read ? "read" : ""}`} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--pcs-deep-green)" }}>{n.title}</div>
                        <div style={{ fontSize: "13.5px" }}>{n.message}</div>
                        <div style={{ fontSize: "12px", color: "var(--pcs-muted)", marginTop: "4px" }}>
                          {formatTime(n.created_at)}
                          {n.complaint_id && ` · Complaint #${n.complaint_id}`}
                        </div>
                      </div>
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
                onClick={() => { setSelectedComplaint(null); setActiveTab("assigned"); }}
              >
                ← Back to list
              </button>

              <h1 className="pcs-page-title">#{selectedComplaint.id} · {selectedComplaint.title}</h1>
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
                    <div className="pcs-detail-value">{selectedComplaint.category?.name || "—"}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Location</div>
                    <div className="pcs-detail-value">📍 {selectedComplaint.location}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Priority</div>
                    <div className="pcs-detail-value">{selectedComplaint.priority}</div>
                  </div>
                  <div>
                    <div className="pcs-detail-label">Submitted</div>
                    <div className="pcs-detail-value">{selectedComplaint.submitted_at}</div>
                  </div>
                </div>

                {selectedComplaint.image && (
                  <div style={{ marginTop: "12px" }}>
                    <div className="pcs-detail-label">Complaint Image</div>
                    <img
                      src={selectedComplaint.image}
                      alt="Complaint"
                      style={{ maxWidth: "100%", maxHeight: "260px", borderRadius: "10px", border: "1px solid #ECE7D9", marginTop: "6px" }}
                    />
                  </div>
                )}
              </div>

              {/* ACCEPT / REJECT */}
              {selectedComplaint.status === "ASSIGNED" && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Accept / Reject</div>
                  <p style={{ fontSize: "13.5px", color: "var(--pcs-muted)", marginBottom: "14px" }}>
                    Accept to start working or reject with a reason.
                  </p>
                  <div className="pcs-actions-row">
                    <button className="pcs-btn pcs-btn-primary" onClick={handleAccept} disabled={actionLoading}>
                      ✓ Accept Complaint
                    </button>
                    <button className="pcs-btn pcs-btn-danger" onClick={handleReject} disabled={actionLoading}>
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}

              {/* UPDATE STATUS */}
              {["IN_PROGRESS", "VERIFIED", "ASSIGNED"].includes(selectedComplaint.status) && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Update Status & Notes</div>

                  <div className="pcs-field">
                    <label className="pcs-label">Status</label>
                    <select className="pcs-select" value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)}>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Work / Resolution Notes</label>
                    <textarea
                      className="pcs-textarea"
                      value={staffNote}
                      onChange={(e) => setStaffNote(e.target.value)}
                      placeholder="Describe the work done..."
                    />
                  </div>

                  <div className="pcs-actions-row">
                    <button className="pcs-btn pcs-btn-primary" onClick={handleUpdateStatus} disabled={actionLoading}>
                      Save Update
                    </button>
                    <button className="pcs-btn pcs-btn-gold" onClick={handleMarkResolved} disabled={actionLoading}>
                      ✓ Mark as Resolved
                    </button>
                  </div>
                </div>
              )}

              {/* REQUEST INFO */}
              {["IN_PROGRESS", "ASSIGNED"].includes(selectedComplaint.status) && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Request Additional Information</div>
                  <div className="pcs-field">
                    <label className="pcs-label">Message to Citizen</label>
                    <textarea
                      className="pcs-textarea"
                      value={requestInfo}
                      onChange={(e) => setRequestInfo(e.target.value)}
                      placeholder="What extra information do you need?"
                    />
                  </div>
                  <button className="pcs-btn pcs-btn-outline" onClick={handleRequestInfo} disabled={actionLoading}>
                    Send Request
                  </button>
                </div>
              )}

              {/* UPLOAD PROOF */}
              {["IN_PROGRESS", "ASSIGNED"].includes(selectedComplaint.status) && (
                <div className="pcs-card">
                  <div className="pcs-card-title">Upload Proof / Documents</div>
                  <div className="pcs-field">
                    <label className="pcs-label">Select File</label>
                    <input
                      type="file"
                      className="pcs-input"
                      accept="image/*,.pdf"
                      onChange={(e) => setProofFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    className="pcs-btn pcs-btn-primary"
                    onClick={handleUploadProof}
                    disabled={actionLoading || !proofFile}
                  >
                    Upload Proof
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffHome;