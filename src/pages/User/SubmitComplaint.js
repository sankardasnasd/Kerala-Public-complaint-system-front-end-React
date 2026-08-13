import React, { useEffect, useState } from "react";
import API from "../../services/Api";

const SubmitComplaint = () => {

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    loadCategories();
    loadDepartments();

  }, []);


  const loadCategories = async () => {

    try {

      const response = await API.get(
        "complaint_categories/"
      );

      if (response.data.status === "success") {

        setCategories(
          response.data.data
        );
      }

    } catch (error) {

      console.log(error);

    }
  };


  const loadDepartments = async () => {

    try {

      const response = await API.get(
        "complaint_departments/"
      );

      if (response.data.status === "success") {

        setDepartments(
          response.data.data
        );
      }

    } catch (error) {

      console.log(error);

    }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const userId =
      localStorage.getItem("user_id");

    if (!userId) {

      alert("Please login first");

      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append(
      "user_id",
      userId
    );

    formData.append(
      "title",
      title
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "location",
      location
    );

    formData.append(
      "category",
      category
    );

    formData.append(
      "department",
      department
    );

    formData.append(
      "priority",
      priority
    );

    if (image) {

      formData.append(
        "image",
        image
      );
    }


    try {

      const response = await API.post(
        "submit_complaint/",
        formData
      );

      if (
        response.data.status ===
        "success"
      ) {

        alert(
          response.data.message
        );

        // Clear form
        setTitle("");
        setDescription("");
        setLocation("");
        setCategory("");
        setDepartment("");
        setPriority("MEDIUM");
        setImage(null);

      } else {

        alert(
          response.data.message
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to submit complaint"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header">

          <h3>
            Submit Complaint
          </h3>

        </div>


        <div className="card-body">

          <form onSubmit={handleSubmit}>

            {/* Title */}

            <div className="mb-3">

              <label className="form-label">
                Complaint Title
              </label>

              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter complaint title"
                required
              />

            </div>


            {/* Category */}

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>


            {/* Department */}

            <div className="mb-3">

              <label className="form-label">
                Department
              </label>

              <select
                className="form-select"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                required
              >

                <option value="">
                  Select Department
                </option>

                {departments.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>


            {/* Description */}

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="5"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe your complaint"
                required
              />

            </div>


            {/* Location */}

            <div className="mb-3">

              <label className="form-label">
                Location
              </label>

              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Enter complaint location"
                required
              />

            </div>


            {/* Priority */}

            <div className="mb-3">

              <label className="form-label">
                Priority
              </label>

              <select
                className="form-select"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >

                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="CRITICAL">
                  Critical
                </option>

              </select>

            </div>


            {/* Image */}

            <div className="mb-3">

              <label className="form-label">
                Complaint Image
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
              />

            </div>


            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >

              {loading
                ? "Submitting..."
                : "Submit Complaint"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default SubmitComplaint;