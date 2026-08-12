import React, { useEffect, useState } from "react";
import API from "../../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

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
        response = await API.post(
          `edit_staff/${editId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await API.post(
          "add_staff/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
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
      const response = await API.post(
        `delete_staff/${id}/`
      );

      if (response.data.status === "success") {
        alert(response.data.message);
        loadStaff();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete staff"
      );
    }
  };

  return (
    <div
      className="bg-light"
      style={{ minHeight: "100vh" }}
    >
      {/* =========================================
          HEADER
      ========================================== */}

      <div className="bg-white shadow-sm p-4">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h3 className="fw-bold mb-1">
                Manage Staff
              </h3>

              <p className="text-muted mb-0">
                Add, view, edit and delete staff
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={openAdd}
            >
              + Add Staff
            </button>

          </div>
        </div>
      </div>

      <div className="container-fluid p-4">

        {/* =========================================
            STATISTICS
        ========================================== */}

        <div className="row g-3 mb-4">

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-1">
                  Total Staff
                </p>

                <h2 className="fw-bold">
                  {staffList.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-1">
                  Available
                </p>

                <h2 className="fw-bold text-success">
                  {
                    staffList.filter(
                      (staff) =>
                        staff.is_available
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-1">
                  Unavailable
                </p>

                <h2 className="fw-bold text-danger">
                  {
                    staffList.filter(
                      (staff) =>
                        !staff.is_available
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================
            ADD / EDIT FORM
        ========================================== */}

        {showForm && (
          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between mb-4">

                <h5 className="fw-bold">
                  {editId
                    ? "Edit Staff"
                    : "Add Staff"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                />

              </div>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  {/* =================================
                      USERNAME
                  ================================== */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Staff Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={form.username}
                      onChange={handleChange}
                      name="username"
                      disabled={!!editId}
                      placeholder="Enter staff name"
                      required={!editId}
                    />

                    {editId && (
                      <small className="text-muted">
                        Staff name cannot be changed.
                      </small>
                    )}

                  </div>

                  {/* =================================
                      EMAIL
                  ================================== */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />

                  </div>

                  {/* =================================
                      PASSWORD - ONLY ADD
                  ================================== */}

                  {!editId && (
                    <div className="col-md-6 mb-3">

                      <label className="form-label">
                        Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                      />

                    </div>
                  )}

                  {/* =================================
                      PHONE
                  ================================== */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Phone
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />

                  </div>

                  {/* =================================
                      DEPARTMENT
                  ================================== */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Department
                    </label>

                    <select
                      className="form-select"
                      name="dept"
                      value={form.dept}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Department
                      </option>

                      {departments.map(
                        (department) => (
                          <option
                            key={department.id}
                            value={department.id}
                          >
                            {department.name}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* =================================
                      IMAGE
                  ================================== */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      {editId
                        ? "Change Image"
                        : "Staff Image"}
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      required={!editId}
                    />

                  </div>

                  {/* =================================
                      ADDRESS
                  ================================== */}

                  <div className="col-md-12 mb-3">

                    <label className="form-label">
                      Address
                    </label>

                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />

                  </div>

                  {/* =================================
                      AVAILABLE
                  ================================== */}

                  <div className="col-md-12 mb-3">

                    <div className="form-check">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="available"
                        name="is_available"
                        checked={
                          form.is_available
                        }
                        onChange={handleChange}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="available"
                      >
                        Staff is Available
                      </label>

                    </div>

                  </div>

                </div>

                {/* BUTTONS */}

                <button
                  type="submit"
                  className="btn btn-success me-2"
                >
                  {editId
                    ? "Update Staff"
                    : "Add Staff"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              </form>

            </div>

          </div>
        )}

        {/* =========================================
            STAFF TABLE
        ========================================== */}

        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h5 className="fw-bold mb-0">
                Staff List
              </h5>

              <span className="badge bg-primary">
                {staffList.length} Staff
              </span>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

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

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5 text-muted"
                      >
                        No staff found
                      </td>

                    </tr>

                  ) : (

                    staffList.map(
                      (staff, index) => (

                        <tr key={staff.id}>

                          <td>
                            {index + 1}
                          </td>

                          {/* STAFF */}

                          <td>

                            <div className="d-flex align-items-center">

                              {staff.image ? (

                                <img
                                  src={staff.image}
                                  alt={staff.username}
                                  className="rounded-circle me-2"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    objectFit: "cover",
                                  }}
                                />

                              ) : (

                                <div
                                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                  }}
                                >
                                  {staff.username
                                    ?.charAt(0)
                                    .toUpperCase()}
                                </div>

                              )}

                              <strong>
                                {staff.username}
                              </strong>

                            </div>

                          </td>

                          {/* EMAIL */}

                          <td>
                            {staff.email}
                          </td>

                          {/* PHONE */}

                          <td>
                            {staff.phone}
                          </td>

                          {/* DEPARTMENT */}

                          <td>

                            <span className="badge bg-info text-dark">

                              {staff.department_name ||
                                "Not Assigned"}

                            </span>

                          </td>

                          {/* STATUS */}

                          <td>

                            {staff.is_available ? (

                              <span className="badge bg-success">
                                Available
                              </span>

                            ) : (

                              <span className="badge bg-secondary">
                                Unavailable
                              </span>

                            )}

                          </td>

                          {/* ACTION */}

                          <td>

                            <button
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() =>
                                openEdit(staff)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDelete(
                                  staff.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageStaff;