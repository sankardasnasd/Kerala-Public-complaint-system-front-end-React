import React, { useEffect, useState } from "react";
import API from "../../services/Api";

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    loadComplaints();

  }, []);


  const loadComplaints = async () => {

    const userId =
      localStorage.getItem("user_id");

    if (!userId) {

      alert("Please login first");

      setLoading(false);

      return;
    }


    try {

      const response = await API.get(
        `my_complaints/?user_id=${userId}`
      );

      console.log(response.data);

      if (
        response.data.status ===
        "success"
      ) {

        setComplaints(
          response.data.data
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to load complaints"
      );

    } finally {

      setLoading(false);
    }
  };


  const getStatusClass = (status) => {

    switch (status) {

      case "SUBMITTED":
        return "bg-primary";

      case "VERIFIED":
        return "bg-info";

      case "ASSIGNED":
        return "bg-secondary";

      case "IN_PROGRESS":
        return "bg-warning text-dark";

      case "RESOLVED":
        return "bg-success";

      case "CLOSED":
        return "bg-dark";

      case "REJECTED":
        return "bg-danger";

      case "REOPENED":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";
    }
  };


  if (loading) {

    return (
      <div className="container mt-5">
        <h4>Loading complaints...</h4>
      </div>
    );
  }


  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>
          My Complaints
        </h2>

        <button
          className="btn btn-outline-primary"
          onClick={loadComplaints}
        >
          Refresh
        </button>

      </div>


      {complaints.length === 0 ? (

        <div className="alert alert-info">

          You haven't submitted
          any complaints yet.

        </div>

      ) : (

        <div className="row">

          {complaints.map((complaint) => (

            <div
              className="col-md-6 mb-4"
              key={complaint.id}
            >

              <div className="card shadow-sm h-100">

                {complaint.image && (

                  <img
                    src={complaint.image}
                    className="card-img-top"
                    alt="Complaint"
                    style={{
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />

                )}


                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <h5 className="card-title">

                      {complaint.title}

                    </h5>

                    <span
                      className={`badge ${getStatusClass(
                        complaint.status
                      )}`}
                    >

                      {complaint.status}

                    </span>

                  </div>


                  <p className="text-muted">

                    Complaint #{complaint.id}

                  </p>


                  <p>

                    <strong>
                      Category:
                    </strong>{" "}

                    {complaint.category ||
                      "N/A"}

                  </p>


                  <p>

                    <strong>
                      Department:
                    </strong>{" "}

                    {complaint.department ||
                      "N/A"}

                  </p>


                  <p>

                    <strong>
                      Location:
                    </strong>{" "}

                    {complaint.location}

                  </p>


                  <p>

                    <strong>
                      Priority:
                    </strong>{" "}

                    {complaint.priority}

                  </p>


                  <p>

                    <strong>
                      Submitted:
                    </strong>{" "}

                    {complaint.submitted_at}

                  </p>


                  {complaint.assigned_staff && (

                    <p>

                      <strong>
                        Assigned Staff:
                      </strong>{" "}

                      {complaint.assigned_staff}

                    </p>

                  )}


                  {complaint.admin_note && (

                    <div className="alert alert-info">

                      <strong>
                        Admin Note:
                      </strong>

                      <br />

                      {complaint.admin_note}

                    </div>

                  )}


                  {complaint.staff_note && (

                    <div className="alert alert-warning">

                      <strong>
                        Staff Note:
                      </strong>

                      <br />

                      {complaint.staff_note}

                    </div>

                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyComplaints;