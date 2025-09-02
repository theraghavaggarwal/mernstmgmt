import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import NoStudent from "../../Components/NoStudent";

import API_BASE from "../../api"; // ✅ dynamic API base

export default function Home() {
  const [students, setStudents] = useState([]);

  // ✅ Fetch students
  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/student/get`);
        setStudents(res.data);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    };
    getStudents();
  }, []);

  // ✅ Delete student
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE}/student/delete/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.status, "success");
            setStudents(students.filter((s) => s._id !== id));
          })
          .catch((err) => {
            Swal.fire("Not Deleted!", err.message, "error");
          });
      }
    });
  };

  return (
    <div className="text-center mb-4">
      <h5 style={{ textAlign: "center", padding: "3rem" }}>
        Students List Vellore Institute of Technology
      </h5>

      <Link to="/add-student">
        <div className="col-4">
          <button className="btn btn-primary" type="submit">
            Add Student
          </button>
        </div>
      </Link>

      <div className="container">
        {students.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Registration Number</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={item._id}>
                  <td style={{ color: "red" }}>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.Regno}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Link to={`/get/${item._id}`} className="btn btn-primary">
                      <FaRegEdit />
                    </Link>{" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteUser(item._id)}
                    >
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoStudent />
        )}
      </div>
    </div>
  );
}
