import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import API_BASE from "../../api";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [Regno, setRegno] = useState(
    "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const sentData = (e) => {
    e.preventDefault();
    const newStudent = { name, Regno, email, phone, gender };

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${API_BASE}/student/add`, newStudent) // ✅ fixed
          .then(() => {
            Swal.fire("Student has been successfully Saved!", "", "success");
            navigate("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Details are not saved", "", "info");
      }
    });
  };

  return (
    <div className="container p-5">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setRegno(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="gender">Select Your Gender</label>
          <br />
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                onChange={(e) => setGender(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>

        <br />
        <div className="col-12">
          <button className="btn btn-primary" type="submit" onClick={sentData}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
