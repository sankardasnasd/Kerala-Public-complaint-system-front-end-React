import React, { useEffect, useState } from "react";
import API from "../../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profileImage, setProfileImage] = useState(null);
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

  // ==============================
  // IMAGE
  // ==============================
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // ==============================
  // UPDATE PROFILE
  // ==============================
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
        alert(response.data.message);
        setEditMode(false);
        setProfileImage(null);
        await loadProfile();
      } else {
        alert(response.data.message);
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
    setForm({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
    });
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="mt-3 text-muted fw-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ==============================
  // PROFILE NOT FOUND
  // ==============================
  if (!profile) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f0f4f8" }}>
        <div className="alert alert-danger shadow-sm">Profile not found.</div>
      </div>
    );
  }

  // ==============================
  // MAIN PAGE
  // ==============================
  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "#f0f4f8",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      <div className="container">
        {/* PAGE HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
            My Profile
          </h2>
          <p className="text-muted mb-0">Manage your Public Complaint System account</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="card border-0"
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <div
                className="card-header border-0 p-4"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                  color: "white",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-1 fw-semibold">Personal Information</h4>
                    <small style={{ opacity: 0.9 }}>Your registered account details</small>
                  </div>

                  {!editMode && (
                    <button
                      className="btn btn-light btn-sm px-3"
                      style={{
                        borderRadius: "8px",
                        fontWeight: 500,
                      }}
                      onClick={() => setEditMode(true)}
                    >
                      ✎ Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="card-body p-4 p-md-5">
                {/* PROFILE IMAGE */}
                <div className="text-center mb-5">
                  {profile.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt="Profile"
                      className="rounded-circle shadow-sm"
                      style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "cover",
                        border: "4px solid #fff",
                        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm"
                      style={{
                        width: "140px",
                        height: "140px",
                        fontSize: "52px",
                        background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {profile.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}

                  {!editMode && (
                    <h4 className="mt-3 mb-1 fw-semibold" style={{ color: "#1e293b" }}>
                      {profile.name}
                    </h4>
                  )}
                  <p className="text-muted mb-0">@{profile.username}</p>
                </div>

                {/* ==========================
                    VIEW PROFILE
                ========================== */}
                {!editMode && (
                  <div className="row g-3">
                    {[
                      { label: "Full Name", value: profile.name },
                      { label: "Username", value: profile.username },
                      { label: "Email", value: profile.email },
                      { label: "Phone", value: profile.phone },
                      {
                        label: "Address",
                        value: profile.address || "Address not provided",
                        fullWidth: true,
                      },
                      { label: "Registered On", value: profile.created_at },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={item.fullWidth ? "col-12" : "col-md-6"}
                      >
                        <div
                          className="p-3 h-100"
                          style={{
                            backgroundColor: "#f8fafc",
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <small className="text-muted d-block mb-1">{item.label}</small>
                          <h6 className="mb-0 fw-medium" style={{ color: "#1e293b" }}>
                            {item.value}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ==========================
                    EDIT PROFILE
                ========================== */}
                {editMode && (
                  <form onSubmit={handleUpdate}>
                    {/* NAME */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: "8px", padding: "10px 14px" }}
                      />
                    </div>

                    {/* USERNAME */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.username}
                        disabled
                        style={{ borderRadius: "8px", padding: "10px 14px", backgroundColor: "#f1f5f9" }}
                      />
                      <small className="text-muted">Username cannot be changed.</small>
                    </div>

                    {/* EMAIL */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: "8px", padding: "10px 14px" }}
                      />
                    </div>

                    {/* PHONE */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: "8px", padding: "10px 14px" }}
                      />
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Address
                      </label>
                      <textarea
                        name="address"
                        className="form-control"
                        rows="3"
                        value={form.address}
                        onChange={handleChange}
                        style={{ borderRadius: "8px", padding: "10px 14px" }}
                      />
                    </div>

                    {/* IMAGE */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: "#334155" }}>
                        Change Profile Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ borderRadius: "8px", padding: "10px 14px" }}
                      />
                    </div>

                    {/* BUTTONS */}
                    <div className="d-flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="btn px-4"
                        disabled={saving}
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "white",
                          borderRadius: "8px",
                          fontWeight: 500,
                          border: "none",
                        }}
                      >
                        {saving ? "Saving..." : "💾 Save Changes"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={handleCancel}
                        style={{ borderRadius: "8px", fontWeight: 500 }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;