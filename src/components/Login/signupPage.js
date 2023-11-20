import React from "react";
import "../Login/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // Clear the error for this field when it changes
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const errors = {};

    for (let [key, value] of formData.entries()) {
      const check = validation(key, value);
      if (!check[key]) {
        errors[key] = true;
      }
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/todo/register",
          {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const { success, message } = responseData;

          if (success) {
            handleSuccess(message);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          } else {
            handleError(message);
          }
        } else {
          // Handle non-OK responses (e.g., 400 Bad Request)
          const errorData = await response.json();
          handleError(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        handleError("An error occurred while processing your request.");
      }
    }
  };
  const backload = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="form-container">
        <IconButton
          className="back-btn"
          style={{
            position: "absolute",
            top: "5px",
            left: "8px",
            color: "#ceb04f",
          }}
          onClick={backload}
        >
          <ArrowBackIcon />
        </IconButton>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label for="name">Name</label>
          <input
            type="text"
            className={formErrors.name ? "input-error" : "form-input"}
            name="name"
            value={formValues.name}
            placeholder="Name"
            onChange={handleChange}
          />

          <label for="email">Email</label>
          <input
            type="email"
            className={formErrors.email ? "input-error" : "form-input"}
            name="email"
            placeholder="Xyz@gmail.com"
            value={formValues.email}
            onChange={handleChange}
          />
          <label for="password">Password</label>
          <input
            type="password"
            className={formErrors.password ? "input-error" : "form-input"}
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
          />
          <label for="password">Address</label>
          <textarea
            type="Address"
            className={formErrors.Address ? "input-error" : "form-textarea"}
            name="Address"
            placeholder="Enter your Address"
            value={formValues.Address}
            onChange={handleChange}
          />

          <button type="submit">Create Account</button>

          <Link to="/login" className="setthis">
            Have an Account ?Login
          </Link>
          {/* <Link>Already have an account? <span href="#">Sign in</span></Link> */}
        </form>

        <div className="image-container">
          <img
            src="https://cdn-lite.ip2location.com/img/sign-up.png"
            alt="signuppage"
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignupPage;
