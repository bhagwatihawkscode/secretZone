import React from "react";
import "./DashBored.css";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import logo from "../../assests/logo.png";

const Slidebar = ({ onClose }) => {
  return (
    <div className="slidebar-container">
      <div className="close-button">
        <IconButton onClick={onClose}>
          <CloseIcon style={{ color: "#EAEAEA" }} />{" "}
          {/* This is the "×" character for the close button */}
        </IconButton>
      </div>
      <div className="logo">
        <img
          src={logo}
          alt="logos"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <nav style={{ margin: "12px" }}>
        <ul>
          <li>
            <Link to="/Dashbored">Dashboard</Link>
          </li>
          <li>
            <Link to="/Secretlist">Secrets List</Link>
          </li>
          <li>
            <Link to="/FavList">Favorites List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Slidebar;
