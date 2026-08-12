import React, { useEffect, useState } from "react";
import API from "../../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageDepartment = () => {

  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  // ==========================================
  // LOAD DEPARTMENTS
  // ==========================================

  const loadDepartments = async () => {

    try {

      const response = await API.get(
        "view_departments/"
      );

      if (response.data.status === "success") {

        setDepartments(
          response.data.data
        );

      }

    } catch (error) {

      console.log(error);

      alert("Unable to load departments");

    }

  };


  useEffect(() => {

    loadDepartments();

  }, []);


  // ==========================================
  // ADD DEPARTMENT
  // ==========================================

  const handleAdd = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "name",
      name
    );

    formData.append(
      "description",
      description
    );


    try {

      const response = await API.post(
        "add_department/",
        formData
      );


      if (
        response.data.status ===
        "success"
      ) {

        alert(
          response.data.message
        );

        setName("");
        setDescription("");

        loadDepartments();

      } else {

        alert(
          response.data.message
        );

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
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this department?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await API.post(
          `delete_department/${id}/`
        );


      if (
        response.data.status ===
        "success"
      ) {

        alert(
          response.data.message
        );

        loadDepartments();

      } else {

        alert(
          response.data.message
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to delete department"
      );

    }

  };


  return (

    <div
      className="container-fluid bg-light"
      style={{
        minHeight: "100vh",
        padding: "30px"
      }}
    >

      {/* HEADER */}

      <div className="mb-4">

        <h3 className="fw-bold">
          Manage Departments
        </h3>

        <p className="text-muted">
          Add and manage public service departments
        </p>

      </div>


      <div className="row g-4">


        {/* ======================================
            ADD DEPARTMENT
        ====================================== */}

        <div className="col-md-4">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <h5 className="fw-bold mb-4">
                Add Department
              </h5>


              <form onSubmit={handleAdd}>

                {/* NAME */}

                <div className="mb-3">

                  <label className="form-label">
                    Department Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter department name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>


                {/* DESCRIPTION */}

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                  />

                </div>


                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  + Add Department
                </button>

              </form>

            </div>

          </div>

        </div>


        {/* ======================================
            DEPARTMENT LIST
        ====================================== */}

        <div className="col-md-8">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold mb-0">
                  Department List
                </h5>

                <span className="badge bg-primary">
                  {departments.length} Departments
                </span>

              </div>


              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-light">

                    <tr>

                      <th>#</th>

                      <th>Department</th>

                      <th>Description</th>

                      <th>Action</th>

                    </tr>

                  </thead>


                  <tbody>

                    {departments.length === 0 ? (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-muted py-4"
                        >
                          No departments found
                        </td>

                      </tr>

                    ) : (

                      departments.map(
                        (department, index) => (

                          <tr
                            key={
                              department.id
                            }
                          >

                            <td>
                              {index + 1}
                            </td>


                            <td>

                              <strong>
                                {
                                  department.name
                                }
                              </strong>

                            </td>


                            <td>

                              {
                                department.description ||
                                "No description"
                              }

                            </td>


                            <td>

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(
                                    department.id
                                  )
                                }
                              >
                                🗑 Delete
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

    </div>

  );
};

export default ManageDepartment;