import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { validation } from "./validation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import loginimg from "../../assests/log-in.png";
import { Link } from "react-router-dom";

import "../Login/Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
          `${process.env.REACT_APP_Base_Url}/login`,
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
          const { success, message, token } = responseData;

          if (success) {
            handleSuccess(message);
            localStorage.setItem("token", token);
            setTimeout(() => {
              navigate("/DashBoard");
            }, 2000);
          } else {
            handleError(message);
          }
        } else {
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
    navigate("/");
  };

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = src;
      });
    };

    const loadAssets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await Promise.all([loadImage(loginimg)]);

      setLoading(false);
    };

    loadAssets();
  }, []);

  return (
    <div className="main">
      {loading ? (
        <div className="loading-animation">
          {/* Your loading animation */}
          <p>S</p>
          <p>e</p>
          <p>c</p>
          <p>r</p>
          <p>e</p>
          <p>t</p>
          <p>Z</p>
          <p>o</p>
          <p>n</p>
          <p>e</p>
        </div>
      ) : (
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
            <h1>Login</h1>
            <p className="setthis">Lets Enter in Secret Zone</p>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={formErrors.email ? "input-error" : "form-input"}
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Xyz@gmail.com"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={formErrors.password ? "input-error" : "form-input"}
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
            />

            <button type="submit">LogIn</button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                alignItems: "center",
              }}
            >
              <Link
                to="/signup"
                className="forgetpass"
                style={{ paddingLeft: "0" }}
              >
                SignUp
              </Link>
              <Link to="/Forgetpass" className="forgetpass">
                Forget Password
              </Link>
            </div>
          </form>

          <div className="image-container">
            <img src={loginimg} alt="signuppage" />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
