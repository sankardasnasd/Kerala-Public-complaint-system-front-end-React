import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Adminpage = () => {
  return (
    <div className="d-flex bg-light" style={{ minHeight: "100vh" }}>

      {/* ================= SIDEBAR ================= */}

      <div
        className="bg-dark text-white p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <h4 className="fw-bold mb-1">
          🏛️ Public Complaint
        </h4>

        <small className="text-secondary">
          ADMIN PANEL
        </small>

        <hr />

        <ul className="nav flex-column">

          <li className="nav-item mb-2">
            <a
              href="/admin"
              className="nav-link text-white bg-primary rounded"
            >
              🏠 Dashboard
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/complaints" className="nav-link text-light">
              📋 Complaints
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/users" className="nav-link text-light">
              👥 Users
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/staff" className="nav-link text-light">
              👨‍💼 Staff
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/department" className="nav-link text-light">
              🏢 Departments
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/categories" className="nav-link text-light">
              📂 Categories
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/reports" className="nav-link text-light">
              📊 Reports
            </a>
          </li>

          <li className="nav-item mb-2">
            <a href="/admin/notifications" className="nav-link text-light">
              🔔 Notifications
            </a>
          </li>

          <hr />

          <li className="nav-item mb-2">
            <a href="/admin/settings" className="nav-link text-light">
              ⚙️ Settings
            </a>
          </li>

          <li className="nav-item">
            <a href="/" className="nav-link text-danger">
              🚪 Logout
            </a>
          </li>

        </ul>
      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div
        className="flex-grow-1"
        style={{ marginLeft: "250px" }}
      >

        {/* TOP NAVBAR */}

        <nav className="navbar bg-white shadow-sm px-4 py-3">

          <div>
            <h5 className="fw-bold mb-0">
              Admin Dashboard
            </h5>

            <small className="text-muted">
              Public Complaint Management System
            </small>
          </div>

          <div className="d-flex align-items-center">

            <button className="btn btn-light me-3">
              🔔
            </button>

            <div className="text-end me-3">
              <strong>Administrator</strong>
              <br />
              <small className="text-muted">
                Admin
              </small>
            </div>

            <div
              className="bg-primary text-white rounded-circle
                         d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              A
            </div>

          </div>

        </nav>


        {/* PAGE CONTENT */}

        <div className="p-4">

          {/* WELCOME */}

          <div className="mb-4">

            <h3 className="fw-bold">
              Welcome back, Administrator 👋
            </h3>

            <p className="text-muted">
              Monitor and manage public complaints from here.
            </p>

          </div>


          {/* ================= STATISTICS ================= */}

          <div className="row g-4 mb-4">

            <div className="col-md-6 col-xl-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>
                      <p className="text-muted mb-1">
                        Total Complaints
                      </p>

                      <h2 className="fw-bold">
                        1,245
                      </h2>
                    </div>

                    <div className="fs-2">
                      📋
                    </div>

                  </div>

                  <small className="text-success">
                    ↑ 12% this month
                  </small>

                </div>

              </div>

            </div>


            <div className="col-md-6 col-xl-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>
                      <p className="text-muted mb-1">
                        Pending
                      </p>

                      <h2 className="fw-bold text-warning">
                        186
                      </h2>
                    </div>

                    <div className="fs-2">
                      ⏳
                    </div>

                  </div>

                  <small className="text-warning">
                    Needs attention
                  </small>

                </div>

              </div>

            </div>


            <div className="col-md-6 col-xl-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>
                      <p className="text-muted mb-1">
                        In Progress
                      </p>

                      <h2 className="fw-bold text-info">
                        324
                      </h2>
                    </div>

                    <div className="fs-2">
                      🔧
                    </div>

                  </div>

                  <small className="text-info">
                    Being handled
                  </small>

                </div>

              </div>

            </div>


            <div className="col-md-6 col-xl-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>
                      <p className="text-muted mb-1">
                        Resolved
                      </p>

                      <h2 className="fw-bold text-success">
                        735
                      </h2>
                    </div>

                    <div className="fs-2">
                      ✅
                    </div>

                  </div>

                  <small className="text-success">
                    59% resolution rate
                  </small>

                </div>

              </div>

            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Quick Actions
              </h5>

              <div className="row g-3">

                <div className="col-md-3">

                  <a
                    href="/admin/complaints"
                    className="btn btn-primary w-100 py-3"
                  >
                    📋
                    <br />
                    Manage Complaints
                  </a>

                </div>

                <div className="col-md-3">

                  <a
                    href="/admin/staff"
                    className="btn btn-outline-primary w-100 py-3"
                  >
                    👨‍💼
                    <br />
                    Manage Staff
                  </a>

                </div>

                <div className="col-md-3">

                  <a
                    href="/admin/users"
                    className="btn btn-outline-primary w-100 py-3"
                  >
                    👥
                    <br />
                    Manage Users
                  </a>

                </div>

                <div className="col-md-3">

                  <a
                    href="/admin/reports"
                    className="btn btn-outline-primary w-100 py-3"
                  >
                    📊
                    <br />
                    View Reports
                  </a>

                </div>

              </div>

            </div>

          </div>


          {/* ================= RECENT COMPLAINTS ================= */}

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                  <h5 className="fw-bold mb-1">
                    Recent Complaints
                  </h5>

                  <small className="text-muted">
                    Latest complaints submitted by users
                  </small>

                </div>

                <a
                  href="/admin/complaints"
                  className="btn btn-primary btn-sm"
                >
                  View All
                </a>

              </div>


              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-light">

                    <tr>

                      <th>ID</th>

                      <th>Complaint</th>

                      <th>Category</th>

                      <th>User</th>

                      <th>Priority</th>

                      <th>Status</th>

                      <th>Action</th>

                    </tr>

                  </thead>


                  <tbody>

                    <tr>

                      <td>
                        <strong>#CMP001</strong>
                      </td>

                      <td>
                        Road damage near junction
                      </td>

                      <td>
                        Road
                      </td>

                      <td>
                        Rahul
                      </td>

                      <td>
                        <span className="badge bg-danger">
                          High
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>

                    </tr>


                    <tr>

                      <td>
                        <strong>#CMP002</strong>
                      </td>

                      <td>
                        Street light not working
                      </td>

                      <td>
                        Electricity
                      </td>

                      <td>
                        Anjali
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          Medium
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-info">
                          In Progress
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>

                    </tr>


                    <tr>

                      <td>
                        <strong>#CMP003</strong>
                      </td>

                      <td>
                        Waste collection issue
                      </td>

                      <td>
                        Waste
                      </td>

                      <td>
                        Arun
                      </td>

                      <td>
                        <span className="badge bg-success">
                          Low
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-success">
                          Resolved
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>

                    </tr>


                    <tr>

                      <td>
                        <strong>#CMP004</strong>
                      </td>

                      <td>
                        Water supply interruption
                      </td>

                      <td>
                        Water
                      </td>

                      <td>
                        Meera
                      </td>

                      <td>
                        <span className="badge bg-danger">
                          High
                        </span>
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>

                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      </td>

                    </tr>

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

export default Adminpage;