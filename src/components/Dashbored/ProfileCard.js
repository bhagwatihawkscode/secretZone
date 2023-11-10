import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Login/Auth.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { validation } from "../Login/validation";
import { _Api } from "../../Api";

const ProfileCard = () => {
  const [userData, setuserData] = useState({});
  const [images, setImages] = useState();

  const [image, setImage] = useState();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  async function fetchData() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    try {
      const response = await fetch("http://localhost:4000/api/todo/DataSend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();

        setuserData(responseData.data);
      } else {
        // Redirect to the login page if the response is not successful
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any other errors here if needed
    }
  }

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // Add the file to the userData object

    setuserData({ ...userData, [name]: value, image });

    // Clear the error for this field when it changes
    setFormErrors({ ...formErrors, [name]: false });
    // console.log(userData)
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const errors = {};

    let testData = new FormData();
    testData.append("file", image);
    testData.append("userId", userData._id);
    testData.append("name", userData.name);
    testData.append("email", userData.email);
    testData.append("Address", userData.Address);
    testData.append("images", userData.profileImage);
    for (let [key, value] of testData.entries()) {
      const check = validation(key, value);
      if (!check[key]) {
        errors[key] = true;
      }
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const response = await _Api(
        testData,
        "http://127.0.0.1:4000/api/todo/update"
      );
      const { success, message } = response;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          fetchData();
        }, 2000);
      } else {
        handleError(message);
      }
    }
  };
  useEffect(() => {
    if (userData.profileImage === "" || !userData.profileImage) {
      setImages(
        "https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
      );
    } else {
      setImages(`http://127.0.0.1:4000${userData.profileImage}`);
    }
  }, [userData]);

  return (
    <div className="main">
      <form
        className="form-container1"
        onSubmit={(e) => {
          handleSaveClick(e);
        }}
      >
        <IconButton
          className="back-btn"
          style={{
            position: "absolute",
            top: "5px",
            right: "8px",
            color: "#ceb04f",
          }}
          onClick={() => {
            navigate("/Dashbored");
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="image-container1">
          <div className="profile-pic">
            <label className="-label" htmlFor="file">
              <span className="glyphicon glyphicon-camera" />
              <span>Change Image</span>
            </label>
            <input
              className="profile-input"
              id="file"
              type="file"
              name="file"
              onChange={handleChange}
            />
            <img
              className="profile-img"
              src={images}
              id="output"
              alt="User Profile"
            />
          </div>

          <h3 style={{ color: "#ceb04f", margin: "10px" }}>Profile</h3>
        </div>
        <div className="form">
          <h1 className="setthis" style={{ margin: "10px" }}>
            User Profile
          </h1>
          <label for="name">Name</label>
          <input
            type="text"
            className={formErrors.name ? "input-error" : "form1-input"}
            name="name"
            value={userData.name}
            placeholder="Name"
            onChange={handleChange}
          />

          <label for="email">Email</label>
          <input
            type="email"
            className={formErrors.email ? "input-error" : "form1-input"}
            name="email"
            placeholder="Xyz@gmail.com"
            value={userData.email}
            onChange={handleChange}
          />

          <label for="Address">Address</label>
          <textarea
            type="Address"
            className={formErrors.Address ? "input-error" : "form1-input"}
            name="Address"
            placeholder="Enter your Address"
            value={userData.Address}
            onChange={handleChange}
          />

          <button type="submit">Save</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProfileCard;