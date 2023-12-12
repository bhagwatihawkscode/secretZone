import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Login/Auth.css";
import { useNavigate } from "react-router-dom";
import { validation } from "./validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ResetPassword = () => {
  const { token } = useParams();
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
          `${process.env.REACT_APP_Base_Url}/reset-password/${token}`,
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
      <div
        className="form-container"
        style={{ padding: "20px", justifyContent: "center" }}
      >
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
        <form
          className="form"
          style={{ width: "100%" }}
          onSubmit={handleSubmit}
        >
          <h1>Create Password</h1>
          <p className="setthis">Enter New password.</p>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={formErrors.password ? "input-error" : "form-input"}
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            className={
              formErrors.Confirmpassword ? "input-error" : "form-input"
            }
            name="Confirm password"
            placeholder="Enter your password"
            value={formValues.COnfirmpassword}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>

          {/* <Link>Already have an account? <span href="#">Sign in</span></Link> */}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
