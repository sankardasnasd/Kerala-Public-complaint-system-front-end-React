import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("username", form.username);
    formData.append("password", form.password);
    if (profileImage) formData.append("profile_image", profileImage);

    try {
      const response = await API.post("user_register/", formData);

     if (response.data.status === "success") {
    alert(response.data.message);

    setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        password: "",
    });

    setProfileImage(null);
    setPreview(null);

    navigate("/");
} else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pcs-shell">
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
        }

        * { box-sizing: border-box; }

        .pcs-shell {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: stretch;
          justify-content: center;
          background: var(--pcs-cream);
          font-family: 'Work Sans', sans-serif;
          color: var(--pcs-ink);
        }

        .pcs-panel-wrap {
          display: flex;
          width: 100%;
          max-width: 980px;
          margin: auto;
          min-height: 600px;
          box-shadow: 0 30px 60px -20px rgba(16, 51, 31, 0.35);
          border-radius: 18px;
          overflow: hidden;
        }

        /* ---------- LEFT: identity panel ---------- */
        .pcs-brand {
          position: relative;
          flex: 1 1 46%;
          background:
            radial-gradient(circle at 20% 15%, rgba(228, 200, 120, 0.10), transparent 55%),
            linear-gradient(165deg, var(--pcs-deep-green) 0%, var(--pcs-mid-green) 100%);
          color: var(--pcs-cream);
          padding: 56px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .pcs-frond-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image: repeating-linear-gradient(
            115deg,
            var(--pcs-gold-soft) 0px,
            var(--pcs-gold-soft) 1px,
            transparent 1px,
            transparent 26px
          );
          pointer-events: none;
        }

        .pcs-eyebrow {
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--pcs-gold-soft);
          font-weight: 600;
          z-index: 1;
        }

        .pcs-lamp {
          margin: 28px 0 22px;
          z-index: 1;
        }

        .pcs-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 34px;
          line-height: 1.15;
          margin: 0 0 6px;
          z-index: 1;
        }

        .pcs-title-ml {
          font-family: 'Fraunces', serif;
          font-size: 17px;
          color: var(--pcs-gold-soft);
          margin: 0 0 18px;
          z-index: 1;
        }

        .pcs-tagline {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(251, 246, 236, 0.78);
          max-width: 340px;
          z-index: 1;
        }

        .pcs-foot-note {
          font-size: 12px;
          color: rgba(251, 246, 236, 0.55);
          border-top: 1px solid rgba(228, 200, 120, 0.25);
          padding-top: 14px;
          z-index: 1;
        }

        .pcs-foot-note a {
          color: var(--pcs-gold-soft);
          font-weight: 600;
          text-decoration: none;
        }

        /* ---------- RIGHT: form panel ---------- */
        .pcs-form-panel {
          flex: 1 1 54%;
          background: #FFFFFF;
          padding: 40px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
        }

        .pcs-form-heading {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 4px;
          color: var(--pcs-deep-green);
        }

        .pcs-form-sub {
          font-size: 13.5px;
          color: #6B7A70;
          margin: 0 0 26px;
        }

        /* Profile photo */
        .pcs-photo-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .pcs-photo-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid var(--pcs-gold);
          overflow: hidden;
          background: var(--pcs-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pcs-photo-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pcs-photo-placeholder {
          font-size: 26px;
          opacity: 0.4;
        }

        .pcs-photo-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--pcs-mid-green);
          cursor: pointer;
        }
        .pcs-photo-label:hover { color: var(--pcs-deep-green); }

        .pcs-photo-hint {
          font-size: 12px;
          color: #8A968C;
          margin-top: 2px;
        }

        .pcs-photo-input { display: none; }

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
          margin-bottom: 7px;
        }

        .pcs-input,
        .pcs-textarea {
          width: 100%;
          padding: 12px 14px;
          font-size: 14.5px;
          font-family: 'Work Sans', sans-serif;
          border: 1.5px solid #DDE3DB;
          border-radius: 9px;
          background: #FBF6EC;
          color: var(--pcs-ink);
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .pcs-input::placeholder,
        .pcs-textarea::placeholder { color: #9AA79E; }

        .pcs-input:focus,
        .pcs-textarea:focus {
          outline: none;
          border-color: var(--pcs-gold);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.18);
        }

        .pcs-textarea {
          resize: vertical;
          min-height: 70px;
        }

        .pcs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .pcs-submit {
          width: 100%;
          margin-top: 8px;
          padding: 13px 14px;
          border: none;
          border-radius: 9px;
          background: var(--pcs-deep-green);
          color: var(--pcs-gold-soft);
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }

        .pcs-submit:hover:not(:disabled) { background: var(--pcs-mid-green); }
        .pcs-submit:active:not(:disabled) { transform: translateY(1px); }
        .pcs-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .pcs-submit:focus-visible {
          outline: 3px solid var(--pcs-gold);
          outline-offset: 2px;
        }

        .pcs-divider {
          margin: 22px 0 16px;
          height: 1px;
          background: #ECE7D9;
        }

        .pcs-help {
          font-size: 12.5px;
          color: #8A968C;
          text-align: center;
        }

        .pcs-help a {
          color: var(--pcs-mid-green);
          font-weight: 600;
          text-decoration: none;
        }
        .pcs-help a:hover { color: var(--pcs-deep-green); }

        @media (max-width: 760px) {
          .pcs-panel-wrap {
            flex-direction: column;
            border-radius: 0;
            min-height: 100vh;
            max-width: 100%;
          }
          .pcs-brand { padding: 40px 30px; }
          .pcs-form-panel { padding: 36px 24px 40px; }
          .pcs-row { grid-template-columns: 1fr; gap: 0; }
          .pcs-title { font-size: 28px; }
        }
      `}</style>

      <div className="pcs-panel-wrap">
        {/* LEFT — Identity panel (same structure as Login) */}
        <div className="pcs-brand">
          <div className="pcs-frond-pattern" aria-hidden="true" />

          <div className="pcs-eyebrow">Government of Kerala · Citizen Services</div>

          <div>
            <div className="pcs-lamp" aria-hidden="true">
              <svg width="46" height="58" viewBox="0 0 46 58" fill="none">
                <ellipse cx="23" cy="52" rx="15" ry="4" fill="var(--pcs-gold)" opacity="0.25" />
                <path d="M23 4C23 4 15 14 15 22C15 27.5 18.5 31 23 31C27.5 31 31 27.5 31 22C31 14 23 4 23 4Z" fill="var(--pcs-gold-soft)" />
                <path d="M23 10C23 10 19 16 19 21C19 24 20.8 26 23 26C25.2 26 27 24 27 21C27 16 23 10 23 10Z" fill="#FFE8A3" />
                <rect x="21.4" y="30" width="3.2" height="14" fill="var(--pcs-gold)" />
                <path d="M10 44C10 40 15.5 38 23 38C30.5 38 36 40 36 44C36 48 30.5 47 23 47C15.5 47 10 48 10 44Z" fill="var(--pcs-gold)" />
                <ellipse cx="23" cy="44" rx="13" ry="3" fill="var(--pcs-deep-green)" opacity="0.35" />
              </svg>
            </div>

            <h1 className="pcs-title">Public Complaint System</h1>
            <p className="pcs-title-ml">പൊതു പരാതി സംവിധാനം</p>
            <p className="pcs-tagline">
              Create your citizen account to raise, track, and resolve civic
              grievances across Kerala from a single window.
            </p>
          </div>

          <p className="pcs-foot-note">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        {/* RIGHT — Form panel (same structure as Login) */}
        <div className="pcs-form-panel">
          <h2 className="pcs-form-heading">Create account</h2>
          <p className="pcs-form-sub">Register to start submitting complaints</p>

          <form onSubmit={handleSubmit}>
            {/* Profile photo */}
            <div className="pcs-photo-row">
              <div className="pcs-photo-circle">
                {preview ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <span className="pcs-photo-placeholder">👤</span>
                )}
              </div>
              <div>
                <label className="pcs-photo-label" htmlFor="profileImage">
                  {preview ? "Change photo" : "Upload profile photo"}
                </label>
                <div className="pcs-photo-hint">Optional · JPG / PNG</div>
                <input
                  type="file"
                  id="profileImage"
                  className="pcs-photo-input"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
            </div>

            <div className="pcs-field">
              <label className="pcs-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="pcs-input"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pcs-row">
              <div className="pcs-field">
                <label className="pcs-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="pcs-input"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pcs-field">
                <label className="pcs-label" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  className="pcs-input"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pcs-field">
              <label className="pcs-label" htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                className="pcs-textarea"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                rows={2}
              />
            </div>

            <div className="pcs-row">
              <div className="pcs-field">
                <label className="pcs-label" htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  className="pcs-input"
                  placeholder="Choose username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pcs-field">
                <label className="pcs-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="pcs-input"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="pcs-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="pcs-divider" />
          <p className="pcs-help">
            Already registered? <Link to="/login">Sign in instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;