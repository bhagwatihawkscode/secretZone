import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "rgba(0,0,0,0.5)",

  boxShadow: 24,
  borderRadius: 5,
};

const NotificationModal = ({ open, handleClose, notification }) => {
  function formatTimeToAMPM(iso8601Time) {
    const date = new Date(iso8601Time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="Scrollhide"
            style={{ height: "400px", overflowY: "scroll" }}
          >
            <h1
              style={{
                color: "#ceb04f",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Notifications
            </h1>
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
                    <div className="notification">
                      <div className="notiglow"></div>
                      <div className="notiborderglow"></div>
                      <div className="notititle">{item.title}</div>
                      <div
                        className={
                          item.isReminderInFuture ? "notibody" : "rednotbody"
                        }
                      >
                        Update this At {formatTimeToAMPM(item.reminderTime)}
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

                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <h1 style={{ color: "#EAEAEA" }}>No notifications</h1>
              </div>
            )}
          </div>

          <div
            className="btn-div"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button className="canncel-btn" onClick={() => handleClose()}>
              CANCEL
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default NotificationModal;
