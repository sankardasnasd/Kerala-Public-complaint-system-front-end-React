import React, { useEffect, useState } from "react";
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

const ManageNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Add Notification states
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    user_id: "",
    title: "",
    message: "",
    notification_type: "GENERAL",
    complaint_id: "",
  });

  
  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.get("admin_notifications/");
      if (res.data.status === "success") {
        setNotifications(res.data.data || []);
        setUnreadCount(res.data.unread_count || 0);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOAD USERS (for dropdown)
  // ==============================
  const loadUsers = async () => {
    try {
      const res = await API.get("view_users/"); // change if your endpoint is different
      if (res.data.status === "success") {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.log("Users load error:", err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // ==============================
  // VIEW DETAIL
  // ==============================
  const viewNotification = async (id) => {
    try {
      const res = await API.get(`admin_notification/${id}/`);
      if (res.data.status === "success") {
        setSelected(res.data.data);

        if (!res.data.data.is_read) {
          try {
            await API.post(`mark_notification_read/${id}/`);
            loadNotifications();
          } catch (e) {}
        }
      }
    } catch (err) {
      console.error(err);
      alert("Unable to load notification details");
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    try {
      setDeleting(true);
      const res = await API.post(`delete_notification/${id}/`);

      if (res.data.status === "success") {
        alert("Notification deleted successfully");
        setSelected(null);
        loadNotifications();
      } else {
        alert(res.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // ==============================
  // OPEN ADD MODAL
  // ==============================
  const openAddModal = () => {
    setForm({
      user_id: "",
      title: "",
      message: "",
      notification_type: "GENERAL",
      complaint_id: "",
    });
    setShowAddModal(true);
    loadUsers();
  };

  // ==============================
  // CREATE NOTIFICATION
  // ==============================
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.user_id || !form.title || !form.message) {
      alert("Please fill User, Title and Message");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("user_id", form.user_id);
      formData.append("title", form.title);
      formData.append("message", form.message);
      formData.append("notification_type", form.notification_type);
      if (form.complaint_id) {
        formData.append("complaint_id", form.complaint_id);
      }

      const res = await API.post("create_notification/", formData);

      if (res.data.status === "success") {
        alert("Notification created successfully");
        setShowAddModal(false);
        loadNotifications();
      } else {
        alert(res.data.message || "Failed to create notification");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create notification");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // TYPE COLOR
  // ==============================
  const typeColor = (type) => {
    const t = (type || "").toUpperCase();
    if (t === "COMPLAINT") return "var(--pcs-deep-green)";
    if (t === "ASSIGNMENT") return "var(--pcs-gold)";
    if (t === "STATUS") return "var(--pcs-mid-green)";
    if (t === "ESCALATION") return "var(--pcs-laterite)";
    return "var(--pcs-muted)";
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
          max-width: 1100px;
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
          color: var(--pcs-cream);
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 17px;
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

        .pcs-btn-danger {
          background: var(--pcs-laterite);
          color: white;
        }
        .pcs-btn-danger:hover { background: #8f3f22; }

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

        .pcs-content-wrap {
          padding: 32px 0 60px;
        }

        .pcs-page-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--pcs-deep-green);
          margin-bottom: 4px;
        }

        .pcs-page-sub {
          font-size: 14px;
          color: var(--pcs-muted);
          margin-bottom: 24px;
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

        .pcs-notif-item {
          display: flex;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid #F0EBE0;
          cursor: pointer;
          transition: background 0.1s;
          align-items: flex-start;
        }

        .pcs-notif-item:last-child { border-bottom: none; }
        .pcs-notif-item:hover { background: rgba(251, 246, 236, 0.5); }

        .pcs-notif-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--pcs-laterite);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .pcs-notif-dot.read { background: #C5CFC8; }

        .pcs-notif-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          margin-bottom: 3px;
        }

        .pcs-notif-msg {
          font-size: 13.5px;
          color: var(--pcs-ink);
          line-height: 1.45;
        }

        .pcs-notif-meta {
          font-size: 12px;
          color: var(--pcs-muted);
          margin-top: 5px;
        }

        .pcs-badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          margin-left: 8px;
        }

        .pcs-empty, .pcs-loading {
          text-align: center;
          padding: 50px 20px;
          color: var(--pcs-muted);
          font-size: 14px;
        }

        /* Modal */
        .pcs-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16, 51, 31, 0.55);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .pcs-modal {
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid #ECE7D9;
          max-width: 560px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .pcs-modal-header {
          background: var(--pcs-deep-green);
          color: var(--pcs-cream);
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pcs-modal-body {
          padding: 22px;
        }

        .pcs-detail-row {
          margin-bottom: 16px;
        }

        .pcs-detail-label {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--pcs-muted);
          margin-bottom: 3px;
        }

        .pcs-detail-value {
          font-size: 14.5px;
          font-weight: 500;
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
      `}</style>

      {/* ================= NAV ================= */}
      <nav className="pcs-nav">
        <div className="pcs-container pcs-nav-row">
          <Link className="pcs-brand-link" to="/">
            <LampMark />
            Public Complaint System
          </Link>

          <div className="pcs-nav-links">
            <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/admin/complaints")}>Complaints</button>
            <button style={{ color: "var(--pcs-gold-soft)" }}>Notifications</button>
            <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div className="pcs-container pcs-content-wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "8px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1 className="pcs-page-title">Manage Notifications</h1>
            <p className="pcs-page-sub">
              View, create and delete system notifications
              {unreadCount > 0 && (
                <span style={{ color: "var(--pcs-laterite)", fontWeight: 600 }}>
                  {" "}• {unreadCount} unread
                </span>
              )}
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="pcs-btn pcs-btn-primary" onClick={openAddModal}>
              + Add Notification
            </button>
            <button className="pcs-btn pcs-btn-outline" onClick={loadNotifications}>
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="pcs-card">
          <div className="pcs-card-title">
            All Notifications
            <span style={{ fontSize: "13px", color: "var(--pcs-muted)", fontWeight: 500 }}>
              {notifications.length} total
            </span>
          </div>

          {loading ? (
            <div className="pcs-loading">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="pcs-empty">No notifications found.</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="pcs-notif-item"
                onClick={() => viewNotification(n.id)}
              >
                <div className={`pcs-notif-dot ${n.is_read ? "read" : ""}`} />

                <div style={{ flex: 1 }}>
                  <div className="pcs-notif-title">
                    {n.title}
                    <span
                      className="pcs-badge"
                      style={{ background: typeColor(n.notification_type) }}
                    >
                      {n.notification_type}
                    </span>
                  </div>

                  <div className="pcs-notif-msg">{n.message}</div>

                  <div className="pcs-notif-meta">
                    To: {n.user?.name || n.user?.username || "—"}
                    {n.complaint_id && ` · Complaint #${n.complaint_id}`}
                    {" · "}
                    {n.created_at}
                  </div>
                </div>

                <button
                  className="pcs-btn pcs-btn-danger pcs-btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(n.id);
                  }}
                  disabled={deleting}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= VIEW DETAIL MODAL ================= */}
      {selected && (
        <div className="pcs-modal-overlay" onClick={() => setSelected(null)}>
          <div className="pcs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pcs-modal-header">
              <strong>{selected.title}</strong>
              <button
                className="pcs-btn pcs-btn-gold pcs-btn-sm"
                onClick={() => setSelected(null)}
              >
                ✕ Close
              </button>
            </div>

            <div className="pcs-modal-body">
              <div className="pcs-detail-row">
                <div className="pcs-detail-label">Type</div>
                <div className="pcs-detail-value">
                  <span
                    className="pcs-badge"
                    style={{ background: typeColor(selected.notification_type) }}
                  >
                    {selected.notification_type}
                  </span>
                </div>
              </div>

              <div className="pcs-detail-row">
                <div className="pcs-detail-label">Message</div>
                <div className="pcs-detail-value" style={{ lineHeight: 1.5 }}>
                  {selected.message}
                </div>
              </div>

              <div className="pcs-detail-row">
                <div className="pcs-detail-label">Sent To</div>
                <div className="pcs-detail-value">
                  {selected.user?.name || selected.user?.username || "—"}
                  {selected.user?.email && ` (${selected.user.email})`}
                </div>
              </div>

              {selected.complaint && (
                <div className="pcs-detail-row">
                  <div className="pcs-detail-label">Related Complaint</div>
                  <div className="pcs-detail-value">
                    #{selected.complaint.id} — {selected.complaint.title}
                    <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--pcs-muted)" }}>
                      ({selected.complaint.status})
                    </span>
                  </div>
                </div>
              )}

              <div className="pcs-detail-row">
                <div className="pcs-detail-label">Status</div>
                <div className="pcs-detail-value">
                  {selected.is_read ? "Read" : "Unread"}
                </div>
              </div>

              <div className="pcs-detail-row">
                <div className="pcs-detail-label">Created At</div>
                <div className="pcs-detail-value">{selected.created_at}</div>
              </div>

              <div style={{ marginTop: "22px", display: "flex", gap: "10px" }}>
                <button
                  className="pcs-btn pcs-btn-danger"
                  onClick={() => handleDelete(selected.id)}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "🗑 Delete Notification"}
                </button>
                <button
                  className="pcs-btn pcs-btn-outline"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD NOTIFICATION MODAL ================= */}
      {showAddModal && (
        <div className="pcs-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="pcs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pcs-modal-header">
              <strong>Add Notification</strong>
              <button
                className="pcs-btn pcs-btn-gold pcs-btn-sm"
                onClick={() => setShowAddModal(false)}
              >
                ✕ Close
              </button>
            </div>

            <div className="pcs-modal-body">
              <form onSubmit={handleCreate}>
                <div className="pcs-field">
                  <label className="pcs-label">Send To User *</label>
                  <select
                    className="pcs-select"
                    value={form.user_id}
                    onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                    required
                  >
                    <option value="">— Select User —</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.first_name || u.username} ({u.email || u.username})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pcs-field">
                  <label className="pcs-label">Title *</label>
                  <input
                    type="text"
                    className="pcs-input"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Notification title"
                    required
                  />
                </div>

                <div className="pcs-field">
                  <label className="pcs-label">Message *</label>
                  <textarea
                    className="pcs-textarea"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write the notification message..."
                    required
                  />
                </div>

                <div className="pcs-field">
                  <label className="pcs-label">Type</label>
                  <select
                    className="pcs-select"
                    value={form.notification_type}
                    onChange={(e) =>
                      setForm({ ...form, notification_type: e.target.value })
                    }
                  >
                    <option value="GENERAL">General</option>
                    <option value="COMPLAINT">Complaint</option>
                    <option value="ASSIGNMENT">Assignment</option>
                    <option value="STATUS">Status</option>
                    <option value="ESCALATION">Escalation</option>
                  </select>
                </div>

                <div className="pcs-field">
                  <label className="pcs-label">Related Complaint ID (optional)</label>
                  <input
                    type="number"
                    className="pcs-input"
                    value={form.complaint_id}
                    onChange={(e) =>
                      setForm({ ...form, complaint_id: e.target.value })
                    }
                    placeholder="e.g. 42"
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="submit"
                    className="pcs-btn pcs-btn-primary"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "✓ Create Notification"}
                  </button>
                  <button
                    type="button"
                    className="pcs-btn pcs-btn-outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;