import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8070";

const ShowOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/student/get/${id}`);
        setUser(res.data.user);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };
    getUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/student/update/${id}`, user);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          navigate("/");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (err) {
      Swal.fire("Not Updated", err.message, "error");
    }
  };

  return (
    <div className="container p-5">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Regno">Registration Number</label>
          <input
            type="text"
            className="form-control"
            id="Regno"
            name="Regno"
            value={user.Regno || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={user.email || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={user.gender || ""}
            onChange={handleInputChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <br />
        <button onClick={handleFormSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShowOne;
