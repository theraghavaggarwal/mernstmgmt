import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import API_BASE from "../../api"; // ✅ Correct relative path

export default function AddStudent() {
  const [name, setName] = useState("");
  const [Regno, setRegno] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const sentData = async (e) => {
    e.preventDefault();

    const newStudent = { name, Regno, email, phone, gender };

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${API_BASE}/student/add`, newStudent);
        Swal.fire("Student has been successfully saved!", "", "success");
        navigate("/");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    } else if (result.isDenied) {
      Swal.fire("Details are not saved", "", "info");
    }
  };

  return (
    <div className="container p-5">
      <form onSubmit={sentData}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Regno" className="form-label">
            Student Registration Number
          </label>
          <input
            type="text"
            className="form-control"
            id="Regno"
            placeholder="Eg. 22BCE0433"
            value={Regno}
            onChange={(e) => setRegno(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Student Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Eg. ABC@123.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Eg. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Select Your Gender</label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <br />
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
