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

const MyProfile = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // ==============================
  // GET LOGGED-IN USER PROFILE
  // ==============================
  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get("view_my_profile/");

      if (response.data.status === "success") {
        const data = response.data.data;
        setProfile(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);

      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await API.post("edit_my_profile/", formData);

      if (response.data.status === "success") {
        alert(response.data.message || "Profile updated successfully");
        setEditMode(false);
        setProfileImage(null);
        setPreviewImage(null);
        await loadProfile();
      } else {
        alert(response.data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // CANCEL EDIT
  // ==============================
  const handleCancel = () => {
    setEditMode(false);
    setProfileImage(null);
    setPreviewImage(null);
    setForm({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
    });
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
          max-width: 900px;
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

        /* -------- CONTENT -------- */
        .pcs-content-wrap {
          padding: 36px 0 60px;
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
          margin-bottom: 28px;
        }

        /* Card */
        .pcs-card {
          background: #FFFFFF;
          border: 1px solid #ECE7D9;
          border-radius: 14px;
          padding: 28px;
          margin-bottom: 20px;
        }

        .pcs-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #ECE7D9;
        }

        .pcs-card-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--pcs-deep-green);
        }

        /* Profile image */
        .pcs-profile-avatar-wrap {
          text-align: center;
          margin-bottom: 28px;
        }

        .pcs-profile-avatar {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--pcs-gold);
          box-shadow: 0 4px 14px rgba(16, 51, 31, 0.12);
        }

        .pcs-profile-avatar-placeholder {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: var(--pcs-cream);
          border: 3px solid var(--pcs-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 48px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          font-family: 'Fraunces', serif;
        }

        .pcs-profile-name {
          font-size: 20px;
          font-weight: 600;
          color: var(--pcs-deep-green);
          margin-top: 14px;
        }

        .pcs-profile-username {
          font-size: 13.5px;
          color: var(--pcs-muted);
          margin-top: 2px;
        }

        /* Info grid */
        .pcs-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .pcs-info-item {
          background: var(--pcs-cream);
          border: 1px solid #ECE7D9;
          border-radius: 10px;
          padding: 14px 16px;
        }

        .pcs-info-item.full {
          grid-column: 1 / -1;
        }

        .pcs-info-label {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--pcs-muted);
          margin-bottom: 4px;
        }

        .pcs-info-value {
          font-size: 14.5px;
          font-weight: 500;
          color: var(--pcs-ink);
        }

        /* Form */
        .pcs-field {
          margin-bottom: 18px;
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

        .pcs-input, .pcs-textarea {
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

        .pcs-input:focus, .pcs-textarea:focus {
          outline: none;
          border-color: var(--pcs-gold);
          box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.15);
        }

        .pcs-input:disabled {
          background: #F5F2E9;
          color: var(--pcs-muted);
          cursor: not-allowed;
        }

        .pcs-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .pcs-help-text {
          font-size: 12px;
          color: var(--pcs-muted);
          margin-top: 4px;
        }

        .pcs-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }

        /* Loading / Error */
        .pcs-loading, .pcs-error {
          text-align: center;
          padding: 80px 20px;
          color: var(--pcs-muted);
          font-size: 15px;
        }
        .pcs-error { color: var(--pcs-laterite); }

        /* -------- RESPONSIVE -------- */
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
          .pcs-info-grid { grid-template-columns: 1fr; }
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
            <button type="button" onClick={() => navigate("/user/home")}>
              Dashboard
            </button>
            <button type="button" onClick={() => navigate("/user/my-complaints")}>
              My Complaints
            </button>
            <button type="button" onClick={() => navigate("/user/submit-complaint")}>
              Submit Complaint
            </button>
            <button type="button" style={{ color: "var(--pcs-gold-soft)" }}>
              Profile
            </button>
            <Link to="/login" className="pcs-btn pcs-btn-gold pcs-btn-sm">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= CONTENT ================= */}
      <div className="pcs-container pcs-content-wrap">
        {loading && (
          <div className="pcs-loading">Loading your profile...</div>
        )}

        {!loading && !profile && (
          <div className="pcs-error">Profile not found.</div>
        )}

        {!loading && profile && (
          <>
            <h1 className="pcs-page-title">My Profile</h1>
            <p className="pcs-page-sub">
              Manage your account details for the Public Complaint System
            </p>

            <div className="pcs-card">
              <div className="pcs-card-header">
                <div className="pcs-card-title">Personal Information</div>
                {!editMode && (
                  <button
                    className="pcs-btn pcs-btn-primary pcs-btn-sm"
                    onClick={() => setEditMode(true)}
                  >
                    ✎ Edit Profile
                  </button>
                )}
              </div>

              {/* Avatar */}
              <div className="pcs-profile-avatar-wrap">
                {previewImage || profile.profile_image ? (
                  <img
                    src={previewImage || profile.profile_image}
                    alt="Profile"
                    className="pcs-profile-avatar"
                  />
                ) : (
                  <div className="pcs-profile-avatar-placeholder">
                    {profile.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                {!editMode && (
                  <>
                    <div className="pcs-profile-name">{profile.name}</div>
                    <div className="pcs-profile-username">@{profile.username}</div>
                  </>
                )}
              </div>

              {/* ========== VIEW MODE ========== */}
              {!editMode && (
                <div className="pcs-info-grid">
                  <div className="pcs-info-item">
                    <div className="pcs-info-label">Full Name</div>
                    <div className="pcs-info-value">{profile.name || "—"}</div>
                  </div>
                  <div className="pcs-info-item">
                    <div className="pcs-info-label">Username</div>
                    <div className="pcs-info-value">@{profile.username || "—"}</div>
                  </div>
                  <div className="pcs-info-item">
                    <div className="pcs-info-label">Email</div>
                    <div className="pcs-info-value">{profile.email || "—"}</div>
                  </div>
                  <div className="pcs-info-item">
                    <div className="pcs-info-label">Phone</div>
                    <div className="pcs-info-value">{profile.phone || "—"}</div>
                  </div>
                  <div className="pcs-info-item full">
                    <div className="pcs-info-label">Address</div>
                    <div className="pcs-info-value">
                      {profile.address || "Address not provided"}
                    </div>
                  </div>
                  <div className="pcs-info-item">
                    <div className="pcs-info-label">Registered On</div>
                    <div className="pcs-info-value">{profile.created_at || "—"}</div>
                  </div>
                </div>
              )}

              {/* ========== EDIT MODE ========== */}
              {editMode && (
                <form onSubmit={handleUpdate}>
                  <div className="pcs-field">
                    <label className="pcs-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="pcs-input"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Username</label>
                    <input
                      type="text"
                      className="pcs-input"
                      value={profile.username}
                      disabled
                    />
                    <div className="pcs-help-text">Username cannot be changed.</div>
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="pcs-input"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="pcs-input"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Address</label>
                    <textarea
                      name="address"
                      className="pcs-textarea"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <div className="pcs-field">
                    <label className="pcs-label">Change Profile Image</label>
                    <input
                      type="file"
                      className="pcs-input"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="pcs-actions-row">
                    <button
                      type="submit"
                      className="pcs-btn pcs-btn-primary"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "💾 Save Changes"}
                    </button>
                    <button
                      type="button"
                      className="pcs-btn pcs-btn-outline"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;