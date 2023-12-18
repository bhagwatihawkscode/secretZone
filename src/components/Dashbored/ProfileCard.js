import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Login/Auth.css";

import "../SecretList/Secret.css";
import { validation } from "../Login/validation";
import { _Api } from "../../Api";

const ProfileCard = () => {
  const [userData, setuserData] = useState({});
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  async function fetchData() {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_Base_Url}/DataSend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        setuserData(responseData.data);
        if (userData.profileImage) {
          localStorage.setItem("images", userData.profileImage);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result); // Set the preview image URL
        setuserData({ ...userData, [name]: value, image: file }); // Set the file directly in userData
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null); // Clear the preview image if no file is selected
      setuserData({ ...userData, [name]: value, image: null }); // Clear the file in userData
    }

    // Clear the error for this field when it changes
    setFormErrors({ ...formErrors, [name]: false });
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
    testData.append("file", previewImage);
    testData.append("userId", userData._id);
    testData.append("name", userData.name);
    testData.append("email", userData.email);
    testData.append("Address", userData.Address);
    testData.append("images", userData.profileImage);

    const checkdata = new FormData();
    checkdata.append("file", previewImage);
    checkdata.append("userId", userData._id);
    checkdata.append("name", userData.name);
    checkdata.append("email", userData.email);
    checkdata.append("Address", userData.Address);

    for (let [key, value] of checkdata.entries()) {
      const check = validation(key, value);

      if (!check[key]) {
        errors[key] = true;
      }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const response = await _Api(
        testData,
        `${process.env.REACT_APP_Base_Url}/update`
      );
      const { success, message } = response;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          fetchData();
          // Clear loading state when the image update is successful
          setIsLoading(false);
          sessionStorage.setItem("flag", true);
        }, 2000);
      } else {
        handleError(message);
        // Clear loading state when there is an error in the image update
        setIsLoading(false);
      }
    } else {
      // Clear loading state when there are validation errors
      setIsLoading(false);
    }
  };
  useEffect(() => {
    try {
      if (userData.profileImage === "" || !userData.profileImage) {
        const defaultImageUrl =
          "https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_face,r_20,d_avatar.png/non_existing_id.png";
        setImages(defaultImageUrl);
      } else {
        const imageUrl = `https://res.cloudinary.com/dsvlrlr51/image/upload/${userData.profileImage}`;
        setImages(imageUrl);
        localStorage.setItem("userProfileImage", imageUrl);
      }
    } catch (error) {
      console.error("Error setting user profile image:", error);
    }
  }, [userData.profileImage]);
  return (
    <div className="main">
      <form
        className="form-container1"
        onSubmit={(e) => {
          handleSaveClick(e);
        }}
      >
        {/* <IconButton
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
        </IconButton> */}
        <div className="image-container1">
          {isLoading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
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
                src={previewImage || images}
                id="output"
                alt="User Profile"
              />
            </div>
          )}

          <h3 style={{ color: "#ceb04f", margin: "10px" }}>Profile Image</h3>
        </div>
        <div className="form1">
          <h1 className="setthis1" style={{ margin: "" }}>
            User Profile
          </h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={formErrors.name ? "input-error" : "form1-input"}
            name="name"
            value={userData.name}
            placeholder="Name"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={formErrors.email ? "input-error" : "form1-input"}
            name="email"
            placeholder="Xyz@gmail.com"
            value={userData.email}
            onChange={handleChange}
          />

          <label htmlFor="Address">Address</label>
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
