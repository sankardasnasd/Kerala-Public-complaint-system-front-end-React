


import React, { useState } from "react";
import API from "../services/Api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await API.post("login_page/", formData);

    console.log(response.data);

    if (response.data.status === "success") {

      alert(response.data.message || "Login successful");

      // Store logged-in user details
      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      console.log("Logged User ID:", response.data.user_id);

      // Redirect according to role
      if (response.data.role === "admin") {

        window.location.href = "/admin";

      } else if (response.data.role === "staff") {

        window.location.href = "/staff";

      } else if (response.data.role === "user") {

        window.location.href = "/user";

      }

    } else {

      alert(
        response.data.message || "Login failed"
      );
    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Unable to connect to Django server"
    );

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

        /* ---------- RIGHT: form panel ---------- */
        .pcs-form-panel {
          flex: 1 1 54%;
          background: #FFFFFF;
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
          margin: 0 0 30px;
        }

        .pcs-field {
          margin-bottom: 20px;
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

        .pcs-input {
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

        .pcs-input::placeholder { color: #9AA79E; }

        .pcs-input:focus {
          outline: none;
          border-color: var(--pcs-gold);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(201, 154, 59, 0.18);
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

        @media (max-width: 760px) {
          .pcs-panel-wrap { flex-direction: column; border-radius: 0; min-height: 100vh; }
          .pcs-brand { padding: 40px 30px; }
          .pcs-form-panel { padding: 40px 28px; }
        }
      `}</style>

      <div className="pcs-panel-wrap">
        {/* Identity / trust panel */}
        <div className="pcs-brand">
          <div className="pcs-frond-pattern" aria-hidden="true" />

          <div className="pcs-eyebrow">Government of Kerala &middot; Citizen Services</div>

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
              A single window to raise, track, and resolve civic grievances
              across Kerala &mdash; sign in to continue as an admin, staff
              member, or citizen.
            </p>
          </div>

          <p className="pcs-foot-note">
            Your login is routed to the right dashboard automatically based on your role.
          </p>
        </div>

        {/* Form panel */}
        <div className="pcs-form-panel">
          <h2 className="pcs-form-heading">Welcome back</h2>
          <p className="pcs-form-sub">Login to your account to continue</p>

          <form onSubmit={handleLogin}>
            <div className="pcs-field">
              <label className="pcs-label" htmlFor="pcs-username">Username</label>
              <input
                id="pcs-username"
                type="text"
                className="pcs-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="pcs-field">
              <label className="pcs-label" htmlFor="pcs-password">Password</label>
              <input
                id="pcs-password"
                type="password"
                className="pcs-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="pcs-submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="pcs-divider" />
          <p className="pcs-help">
            Trouble signing in? Contact your ward office or system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;