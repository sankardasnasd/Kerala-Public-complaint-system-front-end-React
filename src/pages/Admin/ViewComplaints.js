import React, { useEffect, useState } from "react";
import API from "../../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==============================
  // GET ALL COMPLAINTS
  // ==============================

  const getComplaints = async () => {
    try {
      setLoading(true);

      const response = await API.get("view_complaints/");

      if (response.data.status === "success") {
        setComplaints(response.data.data);
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

      const response = await API.get(`view_complaint/${id}/`);

      if (response.data.status === "success") {
        setComplaint(response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  // ==============================
  // STATUS BADGE
  // ==============================

  const getStatusClass = (status) => {
    if (status === "RESOLVED") return "bg-success";
    if (status === "CLOSED") return "bg-dark";
    if (status === "REJECTED") return "bg-danger";
    if (status === "IN_PROGRESS") return "bg-warning text-dark";
    if (status === "ASSIGNED") return "bg-info text-dark";

    return "bg-primary";
  };

  // ==============================
  // PRIORITY BADGE
  // ==============================

  const getPriorityClass = (priority) => {
    if (priority === "CRITICAL") return "bg-danger";
    if (priority === "HIGH") return "bg-warning text-dark";
    if (priority === "LOW") return "bg-success";

    return "bg-info text-dark";
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Complaint Management
          </h2>

          <p className="text-muted">
            View and monitor public complaints
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={getComplaints}
        >
          🔄 Refresh
        </button>

      </div>


      {/* ==============================
          SUMMARY
      ============================== */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                Total Complaints
              </small>

              <h3 className="fw-bold">
                {complaints.length}
              </h3>
            </div>
          </div>
        </div>


        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                Submitted
              </small>

              <h3 className="fw-bold text-primary">
                {
                  complaints.filter(
                    (item) => item.status === "SUBMITTED"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>


        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                In Progress
              </small>

              <h3 className="fw-bold text-warning">
                {
                  complaints.filter(
                    (item) => item.status === "IN_PROGRESS"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>


        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <small className="text-muted">
                Resolved
              </small>

              <h3 className="fw-bold text-success">
                {
                  complaints.filter(
                    (item) => item.status === "RESOLVED"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

      </div>


      {/* ==============================
          COMPLAINT TABLE
      ============================== */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h5 className="fw-bold mb-3">
            All Complaints
          </h5>

          {loading && !complaint ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : complaints.length === 0 ? (
            <div className="alert alert-info">
              No complaints found.
            </div>
          ) : (
            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>User</th>
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

                      <td>
                        #{item.id}
                      </td>

                      <td>
                        <strong>
                          {item.title}
                        </strong>

                        <br />

                        <small className="text-muted">
                          📍 {item.location}
                        </small>
                      </td>

                      <td>
                        {item.user?.name ||
                          item.user?.username ||
                          "N/A"}
                      </td>

                      <td>
                        {item.category?.name || "N/A"}
                      </td>

                      <td>
                        {item.department?.name || "N/A"}
                      </td>

                      <td>
                        <span
                          className={`badge ${getPriorityClass(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            getComplaintDetails(item.id)
                          }
                        >
                          👁 View
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


      {/* =====================================================
          COMPLAINT DETAILS
      ===================================================== */}

      {complaint && (

        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050,
            overflowY: "auto"
          }}
        >

          <div className="container py-5">

            <div className="card shadow-lg">

              {/* HEADER */}

              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                <div>

                  <h4 className="mb-0">
                    {complaint.title}
                  </h4>

                  <small>
                    Complaint #{complaint.id}
                  </small>

                </div>

                <button
                  className="btn btn-light"
                  onClick={() => setComplaint(null)}
                >
                  ✕ Close
                </button>

              </div>


              <div className="card-body">


                {/* =================================================
                    BASIC COMPLAINT INFORMATION
                ================================================= */}

                <h5 className="fw-bold">
                  📋 Complaint Details
                </h5>

                <hr />

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <strong>Title</strong>
                    <p>{complaint.title}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <strong>Location</strong>
                    <p>📍 {complaint.location}</p>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>Category</strong>
                    <p>
                      {complaint.category?.name || "N/A"}
                    </p>
                  </div>

                  <div className="col-md-4 mb-3">
                    <strong>Department</strong>
                    <p>
                      {complaint.department?.name || "N/A"}
                    </p>
                  </div>

                  <div className="col-md-2 mb-3">
                    <strong>Priority</strong>

                    <p>
                      <span
                        className={`badge ${getPriorityClass(
                          complaint.priority
                        )}`}
                      >
                        {complaint.priority}
                      </span>
                    </p>
                  </div>

                  <div className="col-md-2 mb-3">
                    <strong>Status</strong>

                    <p>
                      <span
                        className={`badge ${getStatusClass(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </p>
                  </div>

                  <div className="col-12">

                    <strong>
                      Description
                    </strong>

                    <p>
                      {complaint.description}
                    </p>

                  </div>

                </div>


                {/* =================================================
                    USER PROFILE
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  👤 User Details
                </h5>

                <hr />

                {complaint.user?.profile ? (

                  <div className="card bg-light border-0 mb-4">

                    <div className="card-body">

                      <div className="row">

                        <div className="col-md-3 text-center">

                          {complaint.user.profile.profile_image ? (

                            <img
                              src={
                                complaint.user.profile.profile_image
                              }
                              alt="User"
                              className="rounded-circle"
                              style={{
                                width: "130px",
                                height: "130px",
                                objectFit: "cover"
                              }}
                            />

                          ) : (

                            <div
                              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                              style={{
                                width: "130px",
                                height: "130px",
                                fontSize: "40px"
                              }}
                            >
                              {complaint.user.profile.name
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                          )}

                        </div>


                        <div className="col-md-9">

                          <div className="row">

                            <div className="col-md-6">
                              <strong>Name</strong>
                              <p>
                                {complaint.user.profile.name}
                              </p>
                            </div>

                            <div className="col-md-6">
                              <strong>Email</strong>
                              <p>
                                {complaint.user.profile.email}
                              </p>
                            </div>

                            <div className="col-md-6">
                              <strong>Phone</strong>
                              <p>
                                {complaint.user.profile.phone}
                              </p>
                            </div>

                            <div className="col-md-6">
                              <strong>Username</strong>
                              <p>
                                {complaint.user.username}
                              </p>
                            </div>

                            <div className="col-12">
                              <strong>Address</strong>
                              <p>
                                {complaint.user.profile.address ||
                                  "Not provided"}
                              </p>
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ) : (

                  <div className="alert alert-warning">
                    User profile not available.
                  </div>

                )}


                {/* =================================================
                    COMPLAINT IMAGE
                ================================================= */}

                {complaint.image && (

                  <div className="mb-4">

                    <h5 className="fw-bold">
                      🖼 Complaint Image
                    </h5>

                    <hr />

                    <img
                      src={complaint.image}
                      alt="Complaint"
                      className="img-fluid rounded border"
                      style={{
                        maxHeight: "400px"
                      }}
                    />

                  </div>

                )}


                {/* =================================================
                    ASSIGNED STAFF
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  👨‍💼 Assigned Staff
                </h5>

                <hr />

                {complaint.assigned_staff ? (

                  <div className="row">

                    <div className="col-md-3">
                      <strong>Name</strong>
                      <p>
                        {complaint.assigned_staff.name}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <strong>Email</strong>
                      <p>
                        {complaint.assigned_staff.email}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <strong>Phone</strong>
                      <p>
                        {complaint.assigned_staff.phone}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <strong>Department</strong>
                      <p>
                        {complaint.department?.name ||
                          "N/A"}
                      </p>
                    </div>

                  </div>

                ) : (

                  <div className="alert alert-secondary">
                    No staff assigned.
                  </div>

                )}


                {/* =================================================
                    NOTES
                ================================================= */}

                <div className="row mt-4">

                  <div className="col-md-6">

                    <div className="card bg-light border-0">

                      <div className="card-body">

                        <h6 className="fw-bold">
                          📝 Admin Note
                        </h6>

                        <p>
                          {complaint.admin_note ||
                            "No admin note"}
                        </p>

                      </div>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="card bg-light border-0">

                      <div className="card-body">

                        <h6 className="fw-bold">
                          📝 Staff Note
                        </h6>

                        <p>
                          {complaint.staff_note ||
                            "No staff note"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* =================================================
                    DATES
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  🕒 Complaint Timeline
                </h5>

                <hr />

                <div className="row">

                  <div className="col-md-3">
                    <strong>Submitted</strong>
                    <p>
                      {complaint.submitted_at || "-"}
                    </p>
                  </div>

                  <div className="col-md-3">
                    <strong>Assigned</strong>
                    <p>
                      {complaint.assigned_at || "-"}
                    </p>
                  </div>

                  <div className="col-md-3">
                    <strong>Resolved</strong>
                    <p>
                      {complaint.resolved_at || "-"}
                    </p>
                  </div>

                  <div className="col-md-3">
                    <strong>Closed</strong>
                    <p>
                      {complaint.closed_at || "-"}
                    </p>
                  </div>

                </div>


                {/* =================================================
                    COMPLAINT UPDATES
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  🔄 Complaint Updates
                </h5>

                <hr />

                {complaint.updates &&
                complaint.updates.length > 0 ? (

                  <div>

                    {complaint.updates.map((update) => (

                      <div
                        key={update.id}
                        className="card mb-3 border-start border-primary border-4"
                      >

                        <div className="card-body">

                          <div className="mb-2">

                            <span
                              className={`badge ${getStatusClass(
                                update.old_status
                              )}`}
                            >
                              {update.old_status}
                            </span>

                            <span className="mx-2">
                              →
                            </span>

                            <span
                              className={`badge ${getStatusClass(
                                update.new_status
                              )}`}
                            >
                              {update.new_status}
                            </span>

                          </div>

                          <p className="mb-1">
                            {update.message ||
                              "Status updated"}
                          </p>

                          <small className="text-muted">
                            Updated by:{" "}
                            {update.updated_by?.name ||
                              update.updated_by?.username ||
                              "Unknown"}
                            {" | "}
                            {update.created_at}
                          </small>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="text-muted">
                    No complaint updates available.
                  </p>

                )}


                {/* =================================================
                    ATTACHMENTS
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  📎 Attachments
                </h5>

                <hr />

                {complaint.attachments &&
                complaint.attachments.length > 0 ? (

                  <div className="list-group">

                    {complaint.attachments.map(
                      (attachment) => (

                        <a
                          key={attachment.id}
                          href={attachment.file}
                          target="_blank"
                          rel="noreferrer"
                          className="list-group-item list-group-item-action"
                        >

                          📎 Attachment #{attachment.id}

                          <span className="float-end">
                            {attachment.uploaded_at}
                          </span>

                        </a>

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-muted">
                    No attachments.
                  </p>

                )}


                {/* =================================================
                    FEEDBACK
                ================================================= */}

                <h5 className="fw-bold mt-4">
                  ⭐ User Feedback
                </h5>

                <hr />

                {complaint.feedback ? (

                  <div className="card bg-light border-0">

                    <div className="card-body">

                      <h4>
                        {"⭐".repeat(
                          complaint.feedback.rating
                        )}
                      </h4>

                      <p>
                        {complaint.feedback.comment ||
                          "No comment"}
                      </p>

                      <small className="text-muted">
                        Submitted by{" "}
                        {complaint.feedback.user?.username ||
                          "User"}
                        {" | "}
                        {complaint.feedback.created_at}
                      </small>

                    </div>

                  </div>

                ) : (

                  <p className="text-muted">
                    No feedback submitted yet.
                  </p>

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