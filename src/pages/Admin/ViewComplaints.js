


// import React, { useEffect, useState } from "react";
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

// const ViewComplaints = () => {
//   const navigate = useNavigate();

//   const [complaints, setComplaints] = useState([]);
//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Assign staff
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaffId, setSelectedStaffId] = useState("");
//   const [assignNote, setAssignNote] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   // ==============================
//   // GET ALL COMPLAINTS
//   // ==============================
//   const getComplaints = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("view_complaints/");

//       if (response.data.status === "success") {
//         setComplaints(response.data.data || []);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Unable to load complaints");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // GET SINGLE COMPLAINT
//   // ==============================
//   const getComplaintDetails = async (id) => {
//     try {
//       setLoading(true);
//       setSelectedStaffId("");
//       setAssignNote("");
//       setStaffList([]);

//       const response = await API.get(`view_complaint/${id}/`);

//       if (response.data.status === "success") {
//         const data = response.data.data;
//         setComplaint(data);

//         // Load staff of the same department
//         if (data.department?.id) {
//           loadStaffByDepartment(data.department.id);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Unable to load complaint details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==============================
//   // LOAD STAFF BY DEPARTMENT
//   // ==============================
//   const loadStaffByDepartment = async (departmentId) => {
//     try {
//       const response = await API.get(
//         `staff_by_department/?department_id=${departmentId}`
//       );

//       if (response.data.status === "success") {
//         const available = (response.data.data || []).filter(
//           (s) => s.is_available !== false
//         );
//         setStaffList(available);
//       }
//     } catch (error) {
//       console.log("Staff load error:", error);
//       // Fallback
//       try {
//         const res = await API.get("view_staff/");
//         if (res.data.status === "success") {
//           const filtered = (res.data.data || []).filter(
//             (s) =>
//               s.department?.id === departmentId &&
//               s.is_available !== false
//           );
//           setStaffList(filtered);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };

//   // ==============================
//   // ASSIGN STAFF
//   // ==============================
//   const handleAssignStaff = async () => {
//     if (!selectedStaffId) {
//       alert("Please select a staff member");
//       return;
//     }

//     try {
//       setAssigning(true);

//       const formData = new FormData();
//       formData.append("complaint_id", complaint.id);
//       formData.append("staff_id", selectedStaffId);
//       if (assignNote) formData.append("admin_note", assignNote);

//       const response = await API.post("assign_complaint/", formData);

//       if (response.data.status === "success") {
//         alert(response.data.message || "Staff assigned successfully");
//         await getComplaintDetails(complaint.id);
//         getComplaints();
//       } else {
//         alert(response.data.message || "Assignment failed");
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Failed to assign staff");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   useEffect(() => {
//     getComplaints();
//   }, []);

//   // ==============================
//   // COLORS
//   // ==============================
//   const statusColor = (status) => {
//     const s = (status || "").toUpperCase();
//     if (["RESOLVED", "CLOSED"].includes(s)) return "var(--pcs-mid-green)";
//     if (["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(s)) return "var(--pcs-gold)";
//     if (s === "REJECTED") return "var(--pcs-laterite)";
//     return "var(--pcs-deep-green)";
//   };

//   const priorityColor = (priority) => {
//     const p = (priority || "").toUpperCase();
//     if (p === "CRITICAL") return "var(--pcs-laterite)";
//     if (p === "HIGH") return "#D97706";
//     if (p === "LOW") return "var(--pcs-mid-green)";
//     return "var(--pcs-gold)";
//   };

//   // Stats
//   const total = complaints.length;
//   const submitted = complaints.filter((c) => c.status === "SUBMITTED").length;
//   const inProgress = complaints.filter((c) =>
//     ["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(c.status)
//   ).length;
//   const resolved = complaints.filter((c) =>
//     ["RESOLVED", "CLOSED"].includes(c.status)
//   ).length;

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

//         .pcs-page {
//           font-family: 'Work Sans', sans-serif;
//           color: var(--pcs-ink);
//           background: var(--pcs-cream);
//           min-height: 100vh;
//         }

//         .pcs-page a { text-decoration: none; color: inherit; }

//         .pcs-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px;
//         }

//         h1, h2, h3, h4, h5 {
//           font-family: 'Fraunces', serif;
//         }

//         .pcs-nav {
//           background: var(--pcs-deep-green);
//           padding: 14px 0;
//           position: sticky;
//           top: 0;
//           z-index: 50;
//           box-shadow: 0 2px 14px rgba(16, 51, 31, 0.18);
//         }

//         .pcs-nav-row {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .pcs-brand-link {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           color: var(--pcs-cream);
//           font-family: 'Fraunces', serif;
//           font-weight: 600;
//           font-size: 17px;
//         }

//         .pcs-nav-links {
//           display: flex;
//           align-items: center;
//           gap: 22px;
//         }

//         .pcs-nav-links a, .pcs-nav-links button {
//           color: rgba(251, 246, 236, 0.82);
//           font-size: 14px;
//           font-weight: 500;
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: inherit;
//         }

//         .pcs-nav-links a:hover, .pcs-nav-links button:hover {
//           color: var(--pcs-gold-soft);
//         }

//         .pcs-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 9px 18px;
//           border-radius: 8px;
//           font-size: 13.5px;
//           font-weight: 600;
//           border: 1.5px solid transparent;
//           cursor: pointer;
//           transition: all 0.15s ease;
//           font-family: inherit;
//         }

//         .pcs-btn-gold {
//           background: var(--pcs-gold);
//           color: var(--pcs-deep-green);
//         }
//         .pcs-btn-gold:hover { background: var(--pcs-gold-soft); }

//         .pcs-btn-primary {
//           background: var(--pcs-deep-green);
//           color: var(--pcs-gold-soft);
//         }
//         .pcs-btn-primary:hover { background: var(--pcs-mid-green); }

//         .pcs-btn-outline {
//           background: transparent;
//           color: var(--pcs-deep-green);
//           border-color: var(--pcs-deep-green);
//         }
//         .pcs-btn-outline:hover {
//           background: var(--pcs-deep-green);
//           color: var(--pcs-gold-soft);
//         }

//         .pcs-btn-sm {
//           padding: 6px 12px;
//           font-size: 12.5px;
//         }

//         .pcs-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .pcs-content-wrap {
//           padding: 32px 0 60px;
//         }

//         .pcs-page-title {
//           font-size: 26px;
//           font-weight: 700;
//           color: var(--pcs-deep-green);
//           margin-bottom: 4px;
//         }

//         .pcs-page-sub {
//           font-size: 14px;
//           color: var(--pcs-muted);
//           margin-bottom: 24px;
//         }

//         .pcs-stats-row {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 14px;
//           margin-bottom: 28px;
//         }

//         .pcs-stat {
//           background: #FFFFFF;
//           border: 1px solid #ECE7D9;
//           border-radius: 12px;
//           padding: 18px 16px;
//           text-align: center;
//         }

//         .pcs-stat-num {
//           font-family: 'Fraunces', serif;
//           font-size: 26px;
//           font-weight: 700;
//           margin-bottom: 2px;
//         }

//         .pcs-stat-label {
//           font-size: 12.5px;
//           color: var(--pcs-muted);
//         }

//         .pcs-card {
//           background: #FFFFFF;
//           border: 1px solid #ECE7D9;
//           border-radius: 14px;
//           padding: 22px;
//           margin-bottom: 20px;
//         }

//         .pcs-card-title {
//           font-size: 17px;
//           font-weight: 600;
//           color: var(--pcs-deep-green);
//           margin-bottom: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .pcs-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .pcs-table th {
//           text-align: left;
//           font-size: 12px;
//           text-transform: uppercase;
//           letter-spacing: 0.04em;
//           color: var(--pcs-muted);
//           padding: 10px 12px;
//           border-bottom: 1px solid #ECE7D9;
//         }

//         .pcs-table td {
//           padding: 14px 12px;
//           border-bottom: 1px solid #F0EBE0;
//           font-size: 13.5px;
//           vertical-align: middle;
//         }

//         .pcs-table tr:hover td {
//           background: rgba(251, 246, 236, 0.5);
//         }

//         .pcs-badge {
//           display: inline-block;
//           padding: 4px 10px;
//           border-radius: 999px;
//           font-size: 11.5px;
//           font-weight: 600;
//           color: #fff;
//         }

//         .pcs-modal-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(16, 51, 31, 0.55);
//           z-index: 100;
//           overflow-y: auto;
//           padding: 40px 16px;
//         }

//         .pcs-modal {
//           max-width: 900px;
//           margin: 0 auto;
//           background: #FFFFFF;
//           border-radius: 16px;
//           border: 1px solid #ECE7D9;
//           overflow: hidden;
//         }

//         .pcs-modal-header {
//           background: var(--pcs-deep-green);
//           color: var(--pcs-cream);
//           padding: 18px 24px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .pcs-modal-body {
//           padding: 24px;
//         }

//         .pcs-detail-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 14px 20px;
//           margin-bottom: 16px;
//         }

//         .pcs-detail-label {
//           font-size: 11.5px;
//           text-transform: uppercase;
//           letter-spacing: 0.04em;
//           color: var(--pcs-muted);
//           margin-bottom: 3px;
//         }

//         .pcs-detail-value {
//           font-size: 14.5px;
//           font-weight: 500;
//         }

//         .pcs-section-title {
//           font-size: 16px;
//           font-weight: 600;
//           color: var(--pcs-deep-green);
//           margin: 22px 0 12px;
//           padding-bottom: 8px;
//           border-bottom: 1px solid #ECE7D9;
//         }

//         .pcs-input, .pcs-select, .pcs-textarea {
//           width: 100%;
//           padding: 11px 13px;
//           font-size: 14px;
//           font-family: 'Work Sans', sans-serif;
//           border: 1.5px solid #DDE3DB;
//           border-radius: 9px;
//           background: #FFFEF9;
//           color: var(--pcs-ink);
//         }

//         .pcs-input:focus, .pcs-select:focus, .pcs-textarea:focus {
//           outline: none;
//           border-color: var(--pcs-gold);
//           box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.15);
//         }

//         .pcs-field {
//           margin-bottom: 14px;
//         }

//         .pcs-label {
//           display: block;
//           font-size: 12.5px;
//           font-weight: 600;
//           letter-spacing: 0.03em;
//           text-transform: uppercase;
//           color: var(--pcs-deep-green);
//           margin-bottom: 6px;
//         }

//         .pcs-empty, .pcs-loading {
//           text-align: center;
//           padding: 40px 20px;
//           color: var(--pcs-muted);
//           font-size: 14px;
//         }

//         .pcs-assign-box {
//           background: var(--pcs-cream);
//           border: 1px solid #ECE7D9;
//           border-radius: 12px;
//           padding: 18px;
//           margin-top: 8px;
//         }

//         .pcs-update-card {
//           background: var(--pcs-cream);
//           border-left: 4px solid var(--pcs-gold);
//           border-radius: 8px;
//           padding: 14px;
//           margin-bottom: 10px;
//         }

//         @media (max-width: 900px) {
//           .pcs-stats-row { grid-template-columns: repeat(2, 1fr); }
//           .pcs-detail-grid { grid-template-columns: 1fr; }
//         }
//       `}</style>

//       {/* NAV */}
//       <nav className="pcs-nav">
//         <div className="pcs-container pcs-nav-row">
//           <Link className="pcs-brand-link" to="/">
//             <LampMark />
//             Public Complaint System
//           </Link>

//           <div className="pcs-nav-links">
//             <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
//             <button style={{ color: "var(--pcs-gold-soft)" }}>Complaints</button>
//             <button onClick={() => navigate("/admin/staff")}>Staff</button>
//             <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">Logout</Link>
//           </div>
//         </div>
//       </nav>

//       {/* CONTENT */}
//       <div className="pcs-container pcs-content-wrap">
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
//           <div>
//             <h1 className="pcs-page-title">Complaint Management</h1>
//             <p className="pcs-page-sub">View, monitor and allocate public complaints to staff</p>
//           </div>
//           <button className="pcs-btn pcs-btn-primary" onClick={getComplaints}>
//             🔄 Refresh
//           </button>
//         </div>

//         {/* STATS */}
//         <div className="pcs-stats-row">
//           <div className="pcs-stat">
//             <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{total}</div>
//             <div className="pcs-stat-label">Total</div>
//           </div>
//           <div className="pcs-stat">
//             <div className="pcs-stat-num" style={{ color: "var(--pcs-deep-green)" }}>{submitted}</div>
//             <div className="pcs-stat-label">Submitted</div>
//           </div>
//           <div className="pcs-stat">
//             <div className="pcs-stat-num" style={{ color: "var(--pcs-gold)" }}>{inProgress}</div>
//             <div className="pcs-stat-label">In Progress</div>
//           </div>
//           <div className="pcs-stat">
//             <div className="pcs-stat-num" style={{ color: "var(--pcs-mid-green)" }}>{resolved}</div>
//             <div className="pcs-stat-label">Resolved</div>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="pcs-card">
//           <div className="pcs-card-title">All Complaints</div>

//           {loading && !complaint ? (
//             <div className="pcs-loading">Loading complaints...</div>
//           ) : complaints.length === 0 ? (
//             <div className="pcs-empty">No complaints found.</div>
//           ) : (
//             <div style={{ overflowX: "auto" }}>
//               <table className="pcs-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>Citizen</th>
//                     <th>Category</th>
//                     <th>Department</th>
//                     <th>Priority</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {complaints.map((item) => (
//                     <tr key={item.id}>
//                       <td>#{item.id}</td>
//                       <td>
//                         <strong>{item.title}</strong>
//                         <div style={{ fontSize: "12px", color: "var(--pcs-muted)", marginTop: "2px" }}>
//                           📍 {item.location}
//                         </div>
//                       </td>
//                       <td>
//                         {item.user?.name || item.user?.username || "N/A"}
//                       </td>
//                       <td>{item.category?.name || "N/A"}</td>
//                       <td>{item.department?.name || "N/A"}</td>
//                       <td>
//                         <span className="pcs-badge" style={{ background: priorityColor(item.priority) }}>
//                           {item.priority}
//                         </span>
//                       </td>
//                       <td>
//                         <span className="pcs-badge" style={{ background: statusColor(item.status) }}>
//                           {item.status}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="pcs-btn pcs-btn-primary pcs-btn-sm"
//                           onClick={() => getComplaintDetails(item.id)}
//                         >
//                           👁 View / Assign
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ===================== DETAIL MODAL ===================== */}
//       {complaint && (
//         <div className="pcs-modal-overlay">
//           <div className="pcs-modal">
//             <div className="pcs-modal-header">
//               <div>
//                 <h3 style={{ margin: 0, fontSize: "18px" }}>{complaint.title}</h3>
//                 <small style={{ opacity: 0.85 }}>Complaint #{complaint.id}</small>
//               </div>
//               <button
//                 className="pcs-btn pcs-btn-gold pcs-btn-sm"
//                 onClick={() => setComplaint(null)}
//               >
//                 ✕ Close
//               </button>
//             </div>

//             <div className="pcs-modal-body">

//               {/* BASIC INFO */}
//               <div className="pcs-section-title">📋 Complaint Details</div>
//               <div className="pcs-detail-grid">
//                 <div>
//                   <div className="pcs-detail-label">Category</div>
//                   <div className="pcs-detail-value">{complaint.category?.name || "N/A"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Department</div>
//                   <div className="pcs-detail-value">{complaint.department?.name || "N/A"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Location</div>
//                   <div className="pcs-detail-value">📍 {complaint.location}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Priority</div>
//                   <div className="pcs-detail-value">
//                     <span className="pcs-badge" style={{ background: priorityColor(complaint.priority) }}>
//                       {complaint.priority}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Status</div>
//                   <div className="pcs-detail-value">
//                     <span className="pcs-badge" style={{ background: statusColor(complaint.status) }}>
//                       {complaint.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Submitted</div>
//                   <div className="pcs-detail-value">{complaint.submitted_at || "—"}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "16px" }}>
//                 <div className="pcs-detail-label">Description</div>
//                 <div className="pcs-detail-value" style={{ lineHeight: 1.55 }}>
//                   {complaint.description}
//                 </div>
//               </div>

//               {complaint.image && (
//                 <div style={{ marginBottom: "16px" }}>
//                   <div className="pcs-detail-label">Image</div>
//                   <img
//                     src={complaint.image}
//                     alt="Complaint"
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "280px",
//                       borderRadius: "10px",
//                       border: "1px solid #ECE7D9",
//                       marginTop: "6px",
//                     }}
//                   />
//                 </div>
//               )}

//               {/* CITIZEN */}
//               <div className="pcs-section-title">👤 Citizen Details</div>
//               {complaint.user ? (
//                 <div className="pcs-detail-grid">
//                   <div>
//                     <div className="pcs-detail-label">Name</div>
//                     <div className="pcs-detail-value">
//                       {complaint.user.profile?.name ||
//                         complaint.user.first_name ||
//                         complaint.user.username ||
//                         "—"}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Username</div>
//                     <div className="pcs-detail-value">@{complaint.user.username}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Email</div>
//                     <div className="pcs-detail-value">
//                       {complaint.user.profile?.email || complaint.user.email || "—"}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Phone</div>
//                     <div className="pcs-detail-value">
//                       {complaint.user.profile?.phone || "—"}
//                     </div>
//                   </div>
//                   <div style={{ gridColumn: "1 / -1" }}>
//                     <div className="pcs-detail-label">Address</div>
//                     <div className="pcs-detail-value">
//                       {complaint.user.profile?.address || "Not provided"}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p style={{ color: "var(--pcs-muted)" }}>User details not available</p>
//               )}

//               {/* ASSIGNED STAFF */}
//               <div className="pcs-section-title">👨‍💼 Assigned Staff</div>
//               {complaint.assigned_staff ? (
//                 <div className="pcs-detail-grid">
//                   <div>
//                     <div className="pcs-detail-label">Name</div>
//                     <div className="pcs-detail-value">{complaint.assigned_staff.name || "—"}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Email</div>
//                     <div className="pcs-detail-value">{complaint.assigned_staff.email || "—"}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Phone</div>
//                     <div className="pcs-detail-value">{complaint.assigned_staff.phone || "—"}</div>
//                   </div>
//                   <div>
//                     <div className="pcs-detail-label">Available</div>
//                     <div className="pcs-detail-value">
//                       {complaint.assigned_staff.is_available ? "Yes" : "No"}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p style={{ color: "var(--pcs-muted)", marginBottom: "10px" }}>
//                   No staff assigned yet.
//                 </p>
//               )}

//               {/* ========== ASSIGN STAFF ========== */}
//               {complaint.department?.id && (
//                 <div className="pcs-assign-box">
//                   <div style={{ fontWeight: 600, color: "var(--pcs-deep-green)", marginBottom: "12px" }}>
//                     Allocate Staff → Department: {complaint.department.name}
//                   </div>

//                   {staffList.length === 0 ? (
//                     <p style={{ color: "var(--pcs-muted)", fontSize: "13.5px" }}>
//                       No available staff found in this department.
//                     </p>
//                   ) : (
//                     <>
//                       <div className="pcs-field">
//                         <label className="pcs-label">Select Staff</label>
//                         <select
//                           className="pcs-select"
//                           value={selectedStaffId}
//                           onChange={(e) => setSelectedStaffId(e.target.value)}
//                         >
//                           <option value="">— Choose staff —</option>
//                           {staffList.map((s) => (
//                             <option key={s.id} value={s.id}>
//                               {s.name || s.username}
//                               {s.phone ? ` · ${s.phone}` : ""}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="pcs-field">
//                         <label className="pcs-label">Admin Note (optional)</label>
//                         <textarea
//                           className="pcs-textarea"
//                           rows={2}
//                           value={assignNote}
//                           onChange={(e) => setAssignNote(e.target.value)}
//                           placeholder="Instruction for the staff..."
//                         />
//                       </div>

//                       <button
//                         className="pcs-btn pcs-btn-primary"
//                         onClick={handleAssignStaff}
//                         disabled={assigning || !selectedStaffId}
//                       >
//                         {assigning ? "Assigning..." : "✓ Assign Staff"}
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* NOTES */}
//               <div className="pcs-section-title">📝 Notes</div>
//               <div className="pcs-detail-grid">
//                 <div>
//                   <div className="pcs-detail-label">Admin Note</div>
//                   <div className="pcs-detail-value">{complaint.admin_note || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Staff Note</div>
//                   <div className="pcs-detail-value">{complaint.staff_note || "—"}</div>
//                 </div>
//               </div>

//               {/* TIMELINE */}
//               <div className="pcs-section-title">🕒 Timeline</div>
//               <div className="pcs-detail-grid">
//                 <div>
//                   <div className="pcs-detail-label">Submitted</div>
//                   <div className="pcs-detail-value">{complaint.submitted_at || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Assigned</div>
//                   <div className="pcs-detail-value">{complaint.assigned_at || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Resolved</div>
//                   <div className="pcs-detail-value">{complaint.resolved_at || "—"}</div>
//                 </div>
//                 <div>
//                   <div className="pcs-detail-label">Closed</div>
//                   <div className="pcs-detail-value">{complaint.closed_at || "—"}</div>
//                 </div>
//               </div>

//               {/* UPDATES */}
//               <div className="pcs-section-title">🔄 Status Updates</div>
//               {complaint.updates && complaint.updates.length > 0 ? (
//                 complaint.updates.map((u) => (
//                   <div key={u.id} className="pcs-update-card">
//                     <div style={{ marginBottom: "6px" }}>
//                       <span className="pcs-badge" style={{ background: statusColor(u.old_status) }}>
//                         {u.old_status}
//                       </span>
//                       <span style={{ margin: "0 8px" }}>→</span>
//                       <span className="pcs-badge" style={{ background: statusColor(u.new_status) }}>
//                         {u.new_status}
//                       </span>
//                     </div>
//                     <div style={{ fontSize: "13.5px" }}>{u.message || "Status updated"}</div>
//                     <div style={{ fontSize: "12px", color: "var(--pcs-muted)", marginTop: "4px" }}>
//                       {u.updated_by?.name || u.updated_by?.username || "System"} · {u.created_at}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p style={{ color: "var(--pcs-muted)" }}>No updates yet.</p>
//               )}

//               {/* ATTACHMENTS */}
//               <div className="pcs-section-title">📎 Attachments</div>
//               {complaint.attachments && complaint.attachments.length > 0 ? (
//                 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                   {complaint.attachments.map((a) => (
//                     <a
//                       key={a.id}
//                       href={a.file}
//                       target="_blank"
//                       rel="noreferrer"
//                       style={{
//                         display: "block",
//                         padding: "10px 14px",
//                         background: "var(--pcs-cream)",
//                         borderRadius: "8px",
//                         border: "1px solid #ECE7D9",
//                         fontSize: "13.5px",
//                       }}
//                     >
//                       📎 Attachment #{a.id}
//                       <span style={{ float: "right", color: "var(--pcs-muted)" }}>
//                         {a.uploaded_at}
//                       </span>
//                     </a>
//                   ))}
//                 </div>
//               ) : (
//                 <p style={{ color: "var(--pcs-muted)" }}>No attachments.</p>
//               )}

//               {/* FEEDBACK */}
//               <div className="pcs-section-title">⭐ User Feedback</div>
//               {complaint.feedback ? (
//                 <div style={{ background: "var(--pcs-cream)", borderRadius: "10px", padding: "16px" }}>
//                   <div style={{ fontSize: "22px", marginBottom: "6px" }}>
//                     {"★".repeat(complaint.feedback.rating)}
//                     {"☆".repeat(5 - complaint.feedback.rating)}
//                   </div>
//                   <div style={{ fontSize: "14px" }}>
//                     {complaint.feedback.comment || "No comment"}
//                   </div>
//                   <div style={{ fontSize: "12px", color: "var(--pcs-muted)", marginTop: "6px" }}>
//                     {complaint.feedback.user?.username || "User"} · {complaint.feedback.created_at}
//                   </div>
//                 </div>
//               ) : (
//                 <p style={{ color: "var(--pcs-muted)" }}>No feedback submitted yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewComplaints;


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
const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
  </svg>
);
const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);
const IconImage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M20 16l-5-5-4 4-2-2-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconNote = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 3h9l5 5v13H6z" strokeLinejoin="round" />
    <path d="M15 3v5h5M9 12h6M9 16h6" strokeLinecap="round" />
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconPaperclip = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M8 12.5 15 5.5a3.2 3.2 0 0 1 4.5 4.5L11 18.5a4.5 4.5 0 0 1-6.4-6.4L13 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" />
  </svg>
);
const IconStarOutline = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5Z" strokeLinejoin="round" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconUserCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.5c1-2.4 3-3.6 5.5-3.6s4.5 1.2 5.5 3.6" strokeLinecap="round" />
  </svg>
);
const IconUserPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.3 2.9-5.2 5.5-5.2s5.5 1.9 5.5 5.2" strokeLinecap="round" />
    <path d="M18 8v5M20.5 10.5h-5" strokeLinecap="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4.5 12.5l4.5 4.5 10-10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: IconHome },
  { href: "/admin/complaints", label: "Complaints", icon: IconClipboard, active: true },
  { href: "/admin/view_user_details", label: "Users", icon: IconUsers },
  { href: "/admin/staff", label: "Staff", icon: IconBriefcase },
  { href: "/admin/department", label: "Departments", icon: IconBuilding },
  { href: "/admin/categories", label: "Categories", icon: IconFolder },
  { href: "/admin/reports", label: "Reports", icon: IconChart },
  // { href: "/admin/notifications", label: "Notifications", icon: IconBell },
];

const STATUS_STYLE = {
  SUBMITTED: "vc-badge-blue",
  ASSIGNED: "vc-badge-sage",
  VERIFIED: "vc-badge-sage",
  IN_PROGRESS: "vc-badge-amber",
  RESOLVED: "vc-badge-green",
  CLOSED: "vc-badge-dark",
  REJECTED: "vc-badge-red",
};

const PRIORITY_STYLE = {
  CRITICAL: "vc-badge-red",
  HIGH: "vc-badge-amber",
  LOW: "vc-badge-green",
};

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Assign staff
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [assignNote, setAssignNote] = useState("");
  const [assigning, setAssigning] = useState(false);

  // ==============================
  // GET ALL COMPLAINTS
  // ==============================
  const getComplaints = async () => {
    try {
      setLoading(true);
      const response = await API.get("view_complaints/");

      if (response.data.status === "success") {
        setComplaints(response.data.data || []);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // GET SINGLE COMPLAINT
  // ==============================
  const getComplaintDetails = async (id) => {
    try {
      setLoading(true);
      setSelectedStaffId("");
      setAssignNote("");
      setStaffList([]);

      const response = await API.get(`view_complaint/${id}/`);

      if (response.data.status === "success") {
        const data = response.data.data;
        setComplaint(data);

        // Load staff of the same department
        if (data.department?.id) {
          loadStaffByDepartment(data.department.id);
        }
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD STAFF BY DEPARTMENT
  // ==============================
  const loadStaffByDepartment = async (departmentId) => {
    try {
      const response = await API.get(
        `staff_by_department/?department_id=${departmentId}`
      );

      if (response.data.status === "success") {
        const available = (response.data.data || []).filter(
          (s) => s.is_available !== false
        );
        setStaffList(available);
      }
    } catch (error) {
      console.log("Staff load error:", error);
      // Fallback
      try {
        const res = await API.get("view_staff/");
        if (res.data.status === "success") {
          const filtered = (res.data.data || []).filter(
            (s) =>
              s.department?.id === departmentId &&
              s.is_available !== false
          );
          setStaffList(filtered);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // ==============================
  // ASSIGN STAFF
  // ==============================
  const handleAssignStaff = async () => {
    if (!selectedStaffId) {
      alert("Please select a staff member");
      return;
    }

    try {
      setAssigning(true);

      const formData = new FormData();
      formData.append("complaint_id", complaint.id);
      formData.append("staff_id", selectedStaffId);
      if (assignNote) formData.append("admin_note", assignNote);

      const response = await API.post("assign_complaint/", formData);

      if (response.data.status === "success") {
        alert(response.data.message || "Staff assigned successfully");
        await getComplaintDetails(complaint.id);
        getComplaints();
      } else {
        alert(response.data.message || "Assignment failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to assign staff");
    } finally {
      setAssigning(false);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  // ==============================
  // STATUS / PRIORITY BADGE CLASS
  // ==============================
  const getStatusClass = (status) => STATUS_STYLE[(status || "").toUpperCase()] || "vc-badge-blue";
  const getPriorityClass = (priority) => PRIORITY_STYLE[(priority || "").toUpperCase()] || "vc-badge-blue";

  // Stats
  const total = complaints.length;
  const submitted = complaints.filter((c) => c.status === "SUBMITTED").length;
  const inProgress = complaints.filter((c) =>
    ["IN_PROGRESS", "ASSIGNED", "VERIFIED"].includes(c.status)
  ).length;
  const resolved = complaints.filter((c) =>
    ["RESOLVED", "CLOSED"].includes(c.status)
  ).length;

  return (
    <div className="vc-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --vc-green: #1E7A4C;
          --vc-green-deep: #145636;
          --vc-green-bg: #E6F3EC;
          --vc-slate-900: #14162B;
          --vc-slate-600: #565A78;
          --vc-slate-400: #9195AE;
          --vc-bg: #F3F4F9;
          --vc-line: #E4E5F0;
          --vc-white: #FFFFFF;
          --vc-red: #C6403A;
          --vc-red-bg: #FBE1DF;
          --vc-amber: #B5790A;
          --vc-amber-bg: #FBEDD3;
          --vc-blue: #2E7FD1;
          --vc-blue-bg: #E1EEFB;
          --vc-sage: #4E8C6B;
          --vc-sage-bg: #E4EEDC;
          --vc-dark-bg: #E4E5EC;
          --vc-dark-fg: #3A3D52;
        }

        * { box-sizing: border-box; }

        .vc-shell {
          min-height: 100vh;
          background: var(--vc-bg);
          font-family: 'Inter', sans-serif;
          color: var(--vc-slate-900);
          display: flex;
        }

        .vc-shell h2, .vc-shell h3, .vc-shell h4, .vc-shell h5, .vc-shell h6 {
          font-family: 'Sora', sans-serif;
          margin: 0;
        }

        .vc-shell a { text-decoration: none; }
        .vc-shell button { font-family: 'Inter', sans-serif; cursor: pointer; }

        /* ---------------- SIDEBAR ---------------- */
        .vc-sidebar {
          width: 246px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: var(--vc-white);
          border-right: 1px solid var(--vc-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform 0.25s ease;
        }

        .vc-brand-row { display: flex; align-items: center; gap: 10px; padding: 4px 6px 0; }

        .vc-brand-mark {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--vc-green);
          color: var(--vc-white);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 14px;
          flex: 0 0 auto;
        }

        .vc-brand-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 14.5px; line-height: 1.2; }
        .vc-brand-sub { font-size: 10.5px; color: var(--vc-slate-400); letter-spacing: 0.06em; font-weight: 600; }

        .vc-sidebar-rule { height: 1px; background: var(--vc-line); margin: 18px 0 12px; }

        .vc-nav-list { list-style: none; margin: 0; padding: 0; flex: 1; }

        .vc-nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--vc-slate-600);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 2px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .vc-nav-link:hover { background: var(--vc-bg); color: var(--vc-slate-900); }

        .vc-nav-link.active {
          background: var(--vc-green-bg);
          color: var(--vc-green-deep);
          font-weight: 600;
        }
        .vc-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 6px;
          width: 3px;
          border-radius: 3px;
          background: var(--vc-green);
        }

        .vc-nav-link svg { flex: 0 0 auto; }

        .vc-logout-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 9px 12px 9px 16px;
          border-radius: 8px;
          color: var(--vc-red);
          font-size: 13.5px;
          font-weight: 600;
        }
        .vc-logout-link:hover { background: var(--vc-red-bg); }

        .vc-sidebar-close {
          display: none;
          background: var(--vc-bg);
          border: none;
          color: var(--vc-slate-900);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          align-self: flex-end;
          margin-bottom: 6px;
        }

        .vc-sidebar-overlay { display: none; }

        /* ---------------- MAIN ---------------- */
        .vc-main { flex: 1; margin-left: 246px; min-width: 0; }

        /* ---------------- TOP NAV ---------------- */
        .vc-topnav {
          background: var(--vc-white);
          border-bottom: 1px solid var(--vc-line);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .vc-topnav-left { display: flex; align-items: center; gap: 14px; flex: 1; }

        .vc-menu-btn {
          display: none;
          background: var(--vc-bg);
          border: none;
          border-radius: 8px;
          width: 34px; height: 34px;
          align-items: center; justify-content: center;
          color: var(--vc-slate-900);
        }

        .vc-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--vc-bg);
          border: 1px solid var(--vc-line);
          border-radius: 9px;
          padding: 8px 14px;
          max-width: 320px;
          width: 100%;
          color: var(--vc-slate-400);
        }
        .vc-search input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: var(--vc-slate-900);
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
        .vc-search input::placeholder { color: var(--vc-slate-400); }

        .vc-topnav-right { display: flex; align-items: center; gap: 16px; }

        .vc-bell-btn {
          position: relative;
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--vc-bg);
          border: 1px solid var(--vc-line);
          color: var(--vc-slate-900);
          display: flex; align-items: center; justify-content: center;
        }
        .vc-bell-btn:hover { background: var(--vc-line); }
        .vc-bell-dot {
          position: absolute;
          top: 7px; right: 8px;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--vc-red);
          border: 1.5px solid var(--vc-white);
        }

        .vc-user-block { text-align: right; line-height: 1.25; }
        .vc-user-name-top { font-size: 13px; font-weight: 700; }
        .vc-user-role { font-size: 11px; color: var(--vc-slate-400); }

        .vc-avatar-top {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--vc-green);
          color: var(--vc-white);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
        }

        /* ---------------- BODY ---------------- */
        .vc-body { padding: 26px 30px 60px; }

        .vc-page-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 22px;
        }

        .vc-title { font-size: 21px; font-weight: 700; color: var(--vc-slate-900); }
        .vc-subtitle { font-size: 13px; color: var(--vc-slate-600); margin: 4px 0 0; }

        /* ---------------- BUTTONS ---------------- */
        .vc-btn {
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
        .vc-btn:active { transform: translateY(1px); }
        .vc-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .vc-btn-outline {
          background: var(--vc-white);
          border-color: var(--vc-line);
          color: var(--vc-slate-900);
        }
        .vc-btn-outline:hover { border-color: var(--vc-green); color: var(--vc-green-deep); }

        .vc-btn-green { background: var(--vc-green); color: var(--vc-white); }
        .vc-btn-green:hover { background: var(--vc-green-deep); }

        .vc-btn-sm { padding: 6px 13px; font-size: 12.5px; }

        /* ---------------- CARD ---------------- */
        .vc-card { background: var(--vc-white); border: 1px solid var(--vc-line); border-radius: 12px; }
        .vc-card-body { padding: 22px; }

        /* ---------------- STATS ---------------- */
        .vc-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 22px; }

        .vc-stat-card { position: relative; overflow: hidden; padding: 18px 20px; }
        .vc-stat-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
        .vc-stat-card.total::before { background: var(--vc-slate-900); }
        .vc-stat-card.blue::before { background: var(--vc-blue); }
        .vc-stat-card.amber::before { background: var(--vc-amber); }
        .vc-stat-card.green::before { background: var(--vc-green); }

        .vc-stat-label { font-size: 11.5px; color: var(--vc-slate-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 6px; }
        .vc-stat-num { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 26px; }
        .vc-stat-num.ink { color: var(--vc-slate-900); }
        .vc-stat-num.blue { color: var(--vc-blue); }
        .vc-stat-num.amber { color: var(--vc-amber); }
        .vc-stat-num.green { color: var(--vc-green); }

        /* ---------------- TABLE ---------------- */
        .vc-table-wrap { overflow-x: auto; }
        .vc-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .vc-table thead th {
          text-align: left;
          color: var(--vc-slate-400);
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 10px 14px;
          border-bottom: 1px solid var(--vc-line);
        }

        .vc-table tbody tr { border-bottom: 1px solid var(--vc-line); transition: background 0.12s ease; }
        .vc-table tbody tr:hover { background: var(--vc-bg); }
        .vc-table td { padding: 12px 14px; vertical-align: middle; }

        .vc-loc-line {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--vc-slate-400);
          font-size: 12px;
          margin-top: 2px;
        }

        .vc-empty-state {
          text-align: center;
          padding: 56px 14px;
          color: var(--vc-slate-400);
        }

        .vc-spinner-wrap { display: flex; justify-content: center; padding: 50px 0; }
        .vc-spinner {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 3px solid var(--vc-line);
          border-top-color: var(--vc-green);
          animation: vc-spin 0.7s linear infinite;
        }
        @keyframes vc-spin { to { transform: rotate(360deg); } }

        /* ---------------- BADGES ---------------- */
        .vc-badge { display: inline-block; padding: 4px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; }
        .vc-badge-green { background: var(--vc-green-bg); color: var(--vc-green-deep); }
        .vc-badge-red { background: var(--vc-red-bg); color: var(--vc-red); }
        .vc-badge-amber { background: var(--vc-amber-bg); color: var(--vc-amber); }
        .vc-badge-blue { background: var(--vc-blue-bg); color: var(--vc-blue); }
        .vc-badge-sage { background: var(--vc-sage-bg); color: var(--vc-sage); }
        .vc-badge-dark { background: var(--vc-dark-bg); color: var(--vc-dark-fg); }

        /* ---------------- DETAIL OVERLAY ---------------- */
        .vc-overlay {
          position: fixed;
          inset: 0;
          background: rgba(20, 22, 43, 0.55);
          z-index: 100;
          overflow-y: auto;
          padding: 32px 16px;
          animation: vc-fade 0.15s ease;
        }
        @keyframes vc-fade { from { opacity: 0; } to { opacity: 1; } }

        .vc-detail-card {
          max-width: 900px;
          margin: 0 auto;
          background: var(--vc-white);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(20,22,43,0.5);
          animation: vc-pop 0.18s ease;
        }
        @keyframes vc-pop { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

        .vc-detail-header {
          background: linear-gradient(135deg, var(--vc-green), var(--vc-green-deep));
          color: var(--vc-white);
          padding: 22px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .vc-detail-header h4 { font-size: 18px; font-weight: 700; }
        .vc-detail-header small { font-size: 12.5px; opacity: 0.8; }

        .vc-detail-close {
          background: rgba(255,255,255,0.16);
          border: none;
          color: var(--vc-white);
          width: 34px; height: 34px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex: 0 0 auto;
        }
        .vc-detail-close:hover { background: rgba(255,255,255,0.28); }

        .vc-detail-body { padding: 26px; }

        .vc-section { margin-bottom: 28px; }
        .vc-section:last-child { margin-bottom: 0; }

        .vc-section-head {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--vc-line);
        }

        .vc-section-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: var(--vc-green-bg);
          color: var(--vc-green-deep);
          display: flex; align-items: center; justify-content: center;
          flex: 0 0 auto;
        }

        .vc-section-title { font-size: 14.5px; font-weight: 700; color: var(--vc-slate-900); }

        .vc-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .vc-detail-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
        .vc-detail-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }

        .vc-detail-item.full { grid-column: 1 / -1; }

        .vc-detail-item-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--vc-slate-400);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin: 0 0 4px;
        }

        .vc-detail-item-value { font-size: 13.5px; color: var(--vc-slate-900); line-height: 1.6; }

        /* user profile block */
        .vc-user-block-card {
          background: var(--vc-bg);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .vc-alert {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
        }
        .vc-alert-warn { background: var(--vc-amber-bg); color: var(--vc-amber); }
        .vc-alert-muted { background: var(--vc-bg); color: var(--vc-slate-600); }

        .vc-complaint-image { max-width: 100%; max-height: 360px; border-radius: 10px; border: 1px solid var(--vc-line); display: block; }

        /* ---------------- ASSIGN STAFF BOX ---------------- */
        .vc-assign-box {
          background: var(--vc-green-bg);
          border: 1px solid #CCE5D8;
          border-radius: 12px;
          padding: 20px;
        }

        .vc-assign-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 13.5px;
          color: var(--vc-green-deep);
          margin-bottom: 14px;
        }

        .vc-field { margin-bottom: 14px; }
        .vc-field:last-child { margin-bottom: 0; }

        .vc-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--vc-slate-900);
          margin-bottom: 6px;
        }

        .vc-select, .vc-textarea {
          width: 100%;
          padding: 10px 13px;
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          border: 1px solid var(--vc-line);
          border-radius: 8px;
          background: var(--vc-white);
          color: var(--vc-slate-900);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .vc-select:focus, .vc-textarea:focus {
          outline: none;
          border-color: var(--vc-green);
          box-shadow: 0 0 0 3px rgba(30, 122, 76, 0.14);
        }

        .vc-note-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .vc-note-card { background: var(--vc-bg); border-radius: 12px; padding: 16px; }
        .vc-note-card h6 { font-size: 13px; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 7px; }
        .vc-note-card p { font-size: 13px; color: var(--vc-slate-600); margin: 0; line-height: 1.55; }

        .vc-update-card {
          background: var(--vc-bg);
          border-left: 3px solid var(--vc-green);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 10px;
        }
        .vc-update-card:last-child { margin-bottom: 0; }

        .vc-update-transition { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--vc-slate-400); }
        .vc-update-message { font-size: 13.5px; color: var(--vc-slate-900); margin: 0 0 6px; }
        .vc-update-meta { font-size: 12px; color: var(--vc-slate-400); }

        .vc-attachment-list { display: flex; flex-direction: column; gap: 8px; }
        .vc-attachment-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: var(--vc-bg);
          border-radius: 9px;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--vc-slate-900);
        }
        .vc-attachment-item:hover { background: var(--vc-green-bg); color: var(--vc-green-deep); }
        .vc-attachment-left { display: flex; align-items: center; gap: 8px; }
        .vc-attachment-date { font-size: 11.5px; color: var(--vc-slate-400); }

        .vc-feedback-card { background: var(--vc-bg); border-radius: 12px; padding: 18px; }
        .vc-stars { display: flex; gap: 3px; color: var(--vc-amber); margin-bottom: 8px; }

        /* ---------------- RESPONSIVE ---------------- */
        @media (max-width: 1080px) {
          .vc-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .vc-sidebar { transform: translateX(-100%); }
          .vc-sidebar.open { transform: translateX(0); box-shadow: 20px 0 40px -20px rgba(20,22,43,0.35); }
          .vc-sidebar-close { display: inline-flex; align-items: center; justify-content: center; }
          .vc-main { margin-left: 0; }
          .vc-menu-btn { display: inline-flex; }
          .vc-search { display: none; }
          .vc-sidebar-overlay.open {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 22, 43, 0.35);
            z-index: 45;
          }
          .vc-detail-grid, .vc-detail-grid.cols-3, .vc-detail-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
          .vc-note-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .vc-stats-grid { grid-template-columns: 1fr; }
          .vc-topnav, .vc-body { padding-left: 18px; padding-right: 18px; }
          .vc-user-block { display: none; }
          .vc-detail-grid, .vc-detail-grid.cols-3, .vc-detail-grid.cols-4 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ================= SIDEBAR ================= */}
      <div className={`vc-sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="vc-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">×</button>

        <div className="vc-brand-row">
          <div className="vc-brand-mark">PC</div>
          <div>
            <div className="vc-brand-name">Public Complaint</div>
            <div className="vc-brand-sub">ADMIN PANEL</div>
          </div>
        </div>

        <div className="vc-sidebar-rule" />

        <ul className="vc-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a href={item.href} className={`vc-nav-link ${item.active ? "active" : ""}`}>
                  <Icon />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="vc-sidebar-rule" />

        <a href="/admin/settings" className="vc-nav-link">
          <IconGear />
          Settings
        </a>
        <a href="/" className="vc-logout-link">
          <IconLogout />
          Logout
        </a>
      </div>

      <div className={`vc-sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ================= MAIN ================= */}
      <div className="vc-main">
        {/* TOP NAVBAR */}
        <nav className="vc-topnav">
          <div className="vc-topnav-left">
            <button className="vc-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>

            <div className="vc-search">
              <IconSearch />
              <input type="text" placeholder="Search complaints, users, staff..." />
            </div>
          </div>

          <div className="vc-topnav-right">
            {/* <button className="vc-bell-btn" aria-label="Notifications">
              <IconBell />
              <span className="vc-bell-dot" />
            </button> */}

            <div className="vc-user-block">
              <div className="vc-user-name-top">Administrator</div>
              <div className="vc-user-role">Admin</div>
            </div>

            <div className="vc-avatar-top">A</div>
          </div>
        </nav>

        {/* ================= PAGE CONTENT ================= */}
        <div className="vc-body">
          <div className="vc-page-heading">
            <div>
              <h2 className="vc-title">Complaint Management</h2>
              <p className="vc-subtitle">View, monitor and allocate public complaints to staff</p>
            </div>

            <button className="vc-btn vc-btn-outline" onClick={getComplaints}>
              <IconRefresh />
              Refresh
            </button>
          </div>

          {/* ================= STATS ================= */}
          <div className="vc-stats-grid">
            <div className="vc-card vc-stat-card total">
              <p className="vc-stat-label">Total</p>
              <h3 className="vc-stat-num ink">{total}</h3>
            </div>

            <div className="vc-card vc-stat-card blue">
              <p className="vc-stat-label">Submitted</p>
              <h3 className="vc-stat-num blue">{submitted}</h3>
            </div>

            <div className="vc-card vc-stat-card amber">
              <p className="vc-stat-label">In Progress</p>
              <h3 className="vc-stat-num amber">{inProgress}</h3>
            </div>

            <div className="vc-card vc-stat-card green">
              <p className="vc-stat-label">Resolved</p>
              <h3 className="vc-stat-num green">{resolved}</h3>
            </div>
          </div>

          {/* ================= COMPLAINT TABLE ================= */}
          <div className="vc-card">
            <div className="vc-card-body">
              <h5 style={{ fontSize: "15.5px", fontWeight: 700, marginBottom: "16px" }}>All Complaints</h5>

              {loading && !complaint ? (
                <div className="vc-spinner-wrap">
                  <div className="vc-spinner" />
                </div>
              ) : complaints.length === 0 ? (
                <div className="vc-empty-state">No complaints found.</div>
              ) : (
                <div className="vc-table-wrap">
                  <table className="vc-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Citizen</th>
                        <th>Category</th>
                        <th>Department</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {complaints.map((item) => (
                        <tr key={item.id}>
                          <td>#{item.id}</td>

                          <td>
                            <strong>{item.title}</strong>
                            <div className="vc-loc-line">
                              <IconPin />
                              {item.location}
                            </div>
                          </td>

                          <td>{item.user?.name || item.user?.username || "N/A"}</td>
                          <td>{item.category?.name || "N/A"}</td>
                          <td>{item.department?.name || "N/A"}</td>

                          <td>
                            <span className={`vc-badge ${getPriorityClass(item.priority)}`}>{item.priority}</span>
                          </td>

                          <td>
                            <span className={`vc-badge ${getStatusClass(item.status)}`}>{item.status}</span>
                          </td>

                          <td>
                            <button
                              className="vc-btn vc-btn-green vc-btn-sm"
                              onClick={() => getComplaintDetails(item.id)}
                            >
                              <IconEye />
                              View / Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPLAINT DETAILS ================= */}
      {complaint && (
        <div className="vc-overlay" onClick={() => setComplaint(null)}>
          <div className="vc-detail-card" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className="vc-detail-header">
              <div>
                <h4>{complaint.title}</h4>
                <small>Complaint #{complaint.id}</small>
              </div>

              <button className="vc-detail-close" onClick={() => setComplaint(null)} aria-label="Close">
                <IconClose />
              </button>
            </div>

            <div className="vc-detail-body">
              {/* BASIC COMPLAINT INFORMATION */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconClipboard /></span>
                  <span className="vc-section-title">Complaint Details</span>
                </div>

                <div className="vc-detail-grid" style={{ marginBottom: "16px" }}>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Category</p>
                    <p className="vc-detail-item-value">{complaint.category?.name || "N/A"}</p>
                  </div>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Department</p>
                    <p className="vc-detail-item-value">{complaint.department?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="vc-detail-grid cols-3" style={{ marginBottom: "16px" }}>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Location</p>
                    <p className="vc-detail-item-value">
                      <IconPin /> {complaint.location}
                    </p>
                  </div>

                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Priority</p>
                    <span className={`vc-badge ${getPriorityClass(complaint.priority)}`}>{complaint.priority}</span>
                  </div>

                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Status</p>
                    <span className={`vc-badge ${getStatusClass(complaint.status)}`}>{complaint.status}</span>
                  </div>
                </div>

                <div className="vc-detail-item full" style={{ marginBottom: "16px" }}>
                  <p className="vc-detail-item-label">Submitted</p>
                  <p className="vc-detail-item-value">{complaint.submitted_at || "—"}</p>
                </div>

                <div className="vc-detail-item full" style={{ marginBottom: complaint.image ? "16px" : 0 }}>
                  <p className="vc-detail-item-label">Description</p>
                  <p className="vc-detail-item-value">{complaint.description}</p>
                </div>

                {complaint.image && (
                  <div className="vc-detail-item full">
                    <p className="vc-detail-item-label">Image</p>
                    <img src={complaint.image} alt="Complaint" className="vc-complaint-image" style={{ marginTop: "6px" }} />
                  </div>
                )}
              </div>

              {/* CITIZEN */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconUserCircle /></span>
                  <span className="vc-section-title">Citizen Details</span>
                </div>

                {complaint.user ? (
                  <div className="vc-detail-grid">
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Name</p>
                      <p className="vc-detail-item-value">
                        {complaint.user.profile?.name || complaint.user.first_name || complaint.user.username || "—"}
                      </p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Username</p>
                      <p className="vc-detail-item-value">@{complaint.user.username}</p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Email</p>
                      <p className="vc-detail-item-value">{complaint.user.profile?.email || complaint.user.email || "—"}</p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Phone</p>
                      <p className="vc-detail-item-value">{complaint.user.profile?.phone || "—"}</p>
                    </div>
                    <div className="vc-detail-item full">
                      <p className="vc-detail-item-label">Address</p>
                      <p className="vc-detail-item-value">{complaint.user.profile?.address || "Not provided"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="vc-alert vc-alert-muted">User details not available</div>
                )}
              </div>

              {/* ASSIGNED STAFF */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconBriefcase /></span>
                  <span className="vc-section-title">Assigned Staff</span>
                </div>

                {complaint.assigned_staff ? (
                  <div className="vc-detail-grid cols-4">
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Name</p>
                      <p className="vc-detail-item-value">{complaint.assigned_staff.name || "—"}</p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Email</p>
                      <p className="vc-detail-item-value">{complaint.assigned_staff.email || "—"}</p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Phone</p>
                      <p className="vc-detail-item-value">{complaint.assigned_staff.phone || "—"}</p>
                    </div>
                    <div className="vc-detail-item">
                      <p className="vc-detail-item-label">Available</p>
                      <p className="vc-detail-item-value">{complaint.assigned_staff.is_available ? "Yes" : "No"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="vc-alert vc-alert-muted" style={{ marginBottom: complaint.department?.id ? "14px" : 0 }}>
                    No staff assigned yet.
                  </div>
                )}

                {/* ========== ASSIGN STAFF ========== */}
                {complaint.department?.id && (
                  <div className="vc-assign-box" style={{ marginTop: "14px" }}>
                    <div className="vc-assign-head">
                      <IconUserPlus />
                      Allocate Staff — Department: {complaint.department.name}
                    </div>

                    {staffList.length === 0 ? (
                      <p style={{ color: "var(--vc-slate-600)", fontSize: "13px", margin: 0 }}>
                        No available staff found in this department.
                      </p>
                    ) : (
                      <>
                        <div className="vc-field">
                          <label className="vc-label" htmlFor="vc-staff-select">Select Staff</label>
                          <select
                            id="vc-staff-select"
                            className="vc-select"
                            value={selectedStaffId}
                            onChange={(e) => setSelectedStaffId(e.target.value)}
                          >
                            <option value="">— Choose staff —</option>
                            {staffList.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name || s.username}
                                {s.phone ? ` · ${s.phone}` : ""}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="vc-field">
                          <label className="vc-label" htmlFor="vc-assign-note">Admin Note (optional)</label>
                          <textarea
                            id="vc-assign-note"
                            className="vc-textarea"
                            rows={2}
                            value={assignNote}
                            onChange={(e) => setAssignNote(e.target.value)}
                            placeholder="Instruction for the staff..."
                          />
                        </div>

                        <button
                          className="vc-btn vc-btn-green"
                          onClick={handleAssignStaff}
                          disabled={assigning || !selectedStaffId}
                        >
                          <IconCheck />
                          {assigning ? "Assigning..." : "Assign Staff"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* NOTES */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconNote /></span>
                  <span className="vc-section-title">Notes</span>
                </div>

                <div className="vc-note-grid">
                  <div className="vc-note-card">
                    <h6><IconNote /> Admin Note</h6>
                    <p>{complaint.admin_note || "—"}</p>
                  </div>
                  <div className="vc-note-card">
                    <h6><IconNote /> Staff Note</h6>
                    <p>{complaint.staff_note || "—"}</p>
                  </div>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconClock /></span>
                  <span className="vc-section-title">Timeline</span>
                </div>

                <div className="vc-detail-grid cols-4">
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Submitted</p>
                    <p className="vc-detail-item-value">{complaint.submitted_at || "—"}</p>
                  </div>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Assigned</p>
                    <p className="vc-detail-item-value">{complaint.assigned_at || "—"}</p>
                  </div>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Resolved</p>
                    <p className="vc-detail-item-value">{complaint.resolved_at || "—"}</p>
                  </div>
                  <div className="vc-detail-item">
                    <p className="vc-detail-item-label">Closed</p>
                    <p className="vc-detail-item-value">{complaint.closed_at || "—"}</p>
                  </div>
                </div>
              </div>

              {/* STATUS UPDATES */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconRefresh /></span>
                  <span className="vc-section-title">Status Updates</span>
                </div>

                {complaint.updates && complaint.updates.length > 0 ? (
                  complaint.updates.map((u) => (
                    <div key={u.id} className="vc-update-card">
                      <div className="vc-update-transition">
                        <span className={`vc-badge ${getStatusClass(u.old_status)}`}>{u.old_status}</span>
                        <IconArrow />
                        <span className={`vc-badge ${getStatusClass(u.new_status)}`}>{u.new_status}</span>
                      </div>

                      <p className="vc-update-message">{u.message || "Status updated"}</p>

                      <p className="vc-update-meta">
                        {u.updated_by?.name || u.updated_by?.username || "System"} · {u.created_at}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="vc-detail-item-value" style={{ color: "var(--vc-slate-400)" }}>No updates yet.</p>
                )}
              </div>

              {/* ATTACHMENTS */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconPaperclip /></span>
                  <span className="vc-section-title">Attachments</span>
                </div>

                {complaint.attachments && complaint.attachments.length > 0 ? (
                  <div className="vc-attachment-list">
                    {complaint.attachments.map((a) => (
                      <a key={a.id} href={a.file} target="_blank" rel="noreferrer" className="vc-attachment-item">
                        <span className="vc-attachment-left">
                          <IconPaperclip />
                          Attachment #{a.id}
                        </span>
                        <span className="vc-attachment-date">{a.uploaded_at}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="vc-detail-item-value" style={{ color: "var(--vc-slate-400)" }}>No attachments.</p>
                )}
              </div>

              {/* FEEDBACK */}
              <div className="vc-section">
                <div className="vc-section-head">
                  <span className="vc-section-icon"><IconStarOutline /></span>
                  <span className="vc-section-title">User Feedback</span>
                </div>

                {complaint.feedback ? (
                  <div className="vc-feedback-card">
                    <div className="vc-stars">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < complaint.feedback.rating ? <IconStar key={i} /> : <IconStarOutline key={i} />
                      )}
                    </div>
                    <p className="vc-detail-item-value" style={{ marginBottom: "8px" }}>
                      {complaint.feedback.comment || "No comment"}
                    </p>
                    <p className="vc-update-meta">
                      {complaint.feedback.user?.username || "User"} · {complaint.feedback.created_at}
                    </p>
                  </div>
                ) : (
                  <p className="vc-detail-item-value" style={{ color: "var(--vc-slate-400)" }}>No feedback submitted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewComplaints;