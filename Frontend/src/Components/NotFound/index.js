import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => (
  <div className="notFound">
    <div className="stars"></div>
    <div className="stars2"></div>
    <div className="stars3"></div>

    <div className="title">
      <span className="text404">404</span>
      <br />
      <span>PAGE NOT FOUND</span>
      <br />
      <Link to="/">
        <button
          style={{ padding: "1rem 2rem", marginTop: "2rem" }}
          className="btn title-btn"
        >
          Back To HomePage <FaHome />
        </button>
      </Link>
    </div>
  </div>
);

export default NotFound;
