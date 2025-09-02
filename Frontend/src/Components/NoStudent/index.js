import React from "react";
import logo from "../../Assets/LogoSttiss.png";
import './NoStudent.css';

const NoStudent = () => (
    <div className="no-student p-3">
        <h2>No Student Found</h2>
        <p>
            Add Student Details
        </p>
        <img
            className="img-fluid bounce-animation "
            src={logo}
            alt="Logo STTISS"
            style={{ width: "20rem", padding: "2rem" }}
        />
    </div>
);

export default NoStudent;