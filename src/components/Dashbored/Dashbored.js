import React, { useState, useEffect } from "react";
import "./DashBored.css";
import Slidebar from "./Slidebar";
import { Dropdown } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { NormalCall } from "../../Api";
import { Link } from "react-router-dom";
import NotificationModal from "./NotificationModal";

import CloseIcon from "@mui/icons-material/Close";

const Dashboard = ({ children }) => {
  const [showSlide, setshowSlide] = useState(false);

  const [userprofile, setuserprofile] = useState("");
  const [notification, setnotification] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const checkAndFetchNotifications = async () => {
  //   const lastCallTimestamp = localStorage.getItem("lastCallTimestamp");
  //   const currentDate = new Date();

  //   if (
  //     !lastCallTimestamp ||
  //     new Date(parseInt(lastCallTimestamp, 10)).getDate() !==
  //       currentDate.getDate()
  //   ) {
  //     await fetchNotifications();
  //     localStorage.setItem("lastCallTimestamp", Date.now().toString());
  //   }
  // };
  const fetchNotifications = async () => {
    const test = await NormalCall(
      "",
      "http://127.0.0.1:4000/api/todo/ShowNotification"
    );
    if (Array.isArray(test)) {
      setnotification(test);
    } else {
      setnotification([]);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
    // checkAndFetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const ClearNotification = async () => {
    await NormalCall("", "http://127.0.0.1:4000/api/todo/ClearNotification");

    handleClose();
  };

  useEffect(() => {
    async function login() {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        let res = await NormalCall(
          "",
          "http://127.0.0.1:4000/api/todo/CheckDays"
        );
        if (res) {
          // Check if the notification modal has been shown
          const hasNotificationModalBeenShown = localStorage.getItem(
            "notificationModalShown"
          );

          if (!hasNotificationModalBeenShown) {
            fetchNotifications();
            openModal();

            // Set the flag in localStorage to indicate that the modal has been shown
            localStorage.setItem("notificationModalShown", "true");
          }
        } else {
          setIsModalOpen(false);
        }
      }
    }
    login();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (isLoggedIn) {
        try {
          // Check if user profile image URL is in local storage
          const storedProfileImage = localStorage.getItem("userProfileImage");

          if (storedProfileImage) {
            setuserprofile(storedProfileImage);
          } else {
            const response = await fetch(
              "http://127.0.0.1:4000/api/todo/DataSend",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("token"),
                },
                credentials: "include",
              }
            );

            if (!response.ok) {
              navigate("/login");
            } else {
              const responseData = await response.json();
              const { data } = responseData;
              // Update state and local storage with user profile image URL
              const userProfileImage =
                data.profileImage === ""
                  ? "https://cdn.pixabay.com/photo/2017/08/06/21/01/louvre-2596278_960_720.jpg"
                  : `https://res.cloudinary.com/dsvlrlr51/image/upload/${data.profileImage}`;
              setuserprofile(userProfileImage);

              // Fetch notifications
              fetchNotifications();
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
    fetchData();
  }, [isLoggedIn, navigate]);

  // The empty dependency array ensures this effect runs only once on page load
  function convertTo12HourTime(isoDate) {
    // Create a Date object from the ISO date string
    const date = new Date(isoDate);

    // Get the individual components of the time
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine whether it's AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour time
    const hours12 = hours > 12 ? hours - 12 : hours;

    // Format the time with AM/PM
    const formattedTime = `${hours12}:${
      (minutes < 10 ? "0" : "") + minutes
    } ${period}`;

    return formattedTime;
  }

  const toggleSlidebar = () => {
    setshowSlide(!showSlide);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setIsLoggedIn("");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {showSlide && <Slidebar onClose={toggleSlidebar} />}
      <div className="settle">
        <header>
          <div className="heading">
            {!showSlide && (
              <IconButton onClick={toggleSlidebar}>
                <MenuIcon style={{ color: "#ceb04f" }} />
              </IconButton>
            )}
            <h1>Secret Zone</h1>
          </div>
          <div className="dropdown-contain">
            <IconButton onClick={handleClick}>
              <NotificationsIcon style={{ color: "#ceb04f" }} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left-bottom",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Typography
                style={{
                  backgroundColor: "transparent",
                  padding: "10px",
                }}
              >
                <div
                  className="Scrollhide"
                  style={{
                    height: "400px",
                    overflowY: "scroll",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      background: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <IconButton
                      className="back-btn"
                      style={{
                        // position: "absolute",
                        // top: "2px",
                        // left: "8px",
                        color: "#ceb04f",
                      }}
                      onClick={ClearNotification}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  {notification.length !== 0 ? (
                    notification.map((item, index) => (
                      <div
                        style={{
                          margin: " 10px",
                          textAlign: "center",
                        }}
                        key={index}
                      >
                        <Link
                          to={{
                            pathname: "/Secretlist",
                          }}
                          state={{
                            rowId: item.rowId,
                            notificationId: item.notificationId,
                          }}
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          <div class="notification">
                            <div className="notiglow"></div>
                            <div className="notiborderglow"></div>
                            <div className="notititle">{item.title}</div>
                            <div
                              className={
                                item.isReminderInFuture
                                  ? "notibody"
                                  : "rednotbody"
                              }
                            >
                              Update this At{" "}
                              {convertTo12HourTime(item.reminderTime)}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        margin: " 20px 10px",
                        textAlign: "center",
                        backgroundColor: "rgba(0,0,0,0.6)",
                      }}
                    >
                      <h3 style={{ color: "#ceb04f" }}>No notifications</h3>
                    </div>
                  )}
                </div>
              </Typography>
            </Popover>

            <Dropdown style={{ margin: "0px 20px" }} className="dropdown">
              <Dropdown.Toggle className="custom-dropdown">
                <img
                  src={userprofile}
                  alt="prof"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item onClick={() => navigate("/Profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleLogoutClick();
                  }}
                >
                  LogOut
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <NotificationModal
          open={isModalOpen}
          handleClose={closeModal}
          notification={notification}
        />

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
