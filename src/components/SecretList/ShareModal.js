import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-phone-number-input/style.css";

import "./Secret.css";
import { NormalCall } from "../../Api";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "rgba(0,0,0,0.7)",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const mobileStyle = {
  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",
  },
};
const mergedStyle = { ...style, ...mobileStyle };

function WhatsappModal({ itemId, handleError, handleSuccess, closingfun }) {
  // const handleChange = (value) => {
  //   setPhoneNumber(value);
  //   setErrors(false);
  // };

  const unlock = async () => {
    // Perform your validation logic here
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const setdata = { childId: itemId, isMobile: isMobile };
    const response = await NormalCall(
      setdata,
      "http://127.0.0.1:4000/api/todo/whatsappsend"
    );
    const { whatsappUrl, statusCode, message } = response;

    // Set the whatsappUrl in the component state
    if (statusCode === 200) {
      // Redirect the user
      window.open(whatsappUrl, "_blank");
      closingfun(true);
    } else {
      handleError(message);

      closingfun(true);
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => unlock()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fff"
            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
          ></path>
          <path
            fill="#fff"
            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
          ></path>
          <path
            fill="#cfd8dc"
            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
          ></path>
          <path
            fill="#40c351"
            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
          ></path>
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </IconButton>
    </React.Fragment>
  );
}
function GmailModal({ itemId, handleError, handleSuccess, closingfun }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors(false);
  };

  const validateEmail = (email) => {
    // Regular expression for a valid Gmail address
    const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return regex.test(email);
  };

  const setdata = { email: email, childId: itemId };
  const unlock = async () => {
    if (validateEmail(email)) {
      try {
        setLoading(true); // Set loading to true when the API call starts

        const response = await NormalCall(
          setdata,
          "http://127.0.0.1:4000/api/todo/mailsend"
        );

        const { statusCode, message } = response;
        if (statusCode === 200) {
          handleSuccess(message);

          setEmail("");
          handleClose();
        } else {
          handleClose();
        }
      } catch (error) {
        console.error(error);
        handleError("Error sending email");
      } finally {
        setLoading(false);
        closingfun(true);
      }
    } else {
      setErrors(true);
      handleError("Invalid Gmail address");
    }
  };

  return (
    <React.Fragment>
      <IconButton onClick={() => handleOpen()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <path
            fill="#4caf50"
            d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
          ></path>
          <path
            fill="#1e88e5"
            d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
          ></path>
          <polygon
            fill="#e53935"
            points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
          ></polygon>
          <path
            fill="#c62828"
            d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
          ></path>
          <path
            fill="#fbc02d"
            d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
          ></path>
        </svg>
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={mergedStyle}>
          <div className="box-1">
            <h2 style={{ margin: " 10px", color: "#c79d15" }}>
              Type Receiver Gmail
            </h2>
            <div className="underline-title"></div>

            <input
              placeholder="Gmail"
              type="Text"
              value={email}
              onChange={(e) => handleChange(e)}
              style={{ width: "90%" }}
              className={errors ? "errors-input" : "input3-tag"}
            />
            {/* <input placeholder="Confirm PassWord" className="input3-tag" /> */}
            {loading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <div className="btn-div">
                <button className="add1-btn" onClick={() => unlock()}>
                  Share
                </button>
                <button className="canncel-btn" onClick={() => handleClose()}>
                  canncel
                </button>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ShareModal({
  open,
  handleClose,
  itemId,
  handleError,
  handleSuccess,
  isFetch,
}) {
  const closing = true;

  const closingfun = (ok) => {
    if (closing === ok) {
      handleClose();
      isFetch();
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...mergedStyle, width: 400 }}>
          <h2 id="parent-modal-title" style={{ color: "#ceb04f" }}>
            Share Secrets
          </h2>
          <div className="underline-title"></div>
          <p id="parent-modal-description">Select Share Option</p>
          <WhatsappModal
            itemId={itemId}
            handleError={handleError}
            handleSuccess={handleSuccess}
            closingfun={closingfun}
          />
          <GmailModal
            itemId={itemId}
            handleError={handleError}
            handleSuccess={handleSuccess}
            closingfun={closingfun}
          />
          <button
            style={{ marginLeft: "30%" }}
            className="canncel-btn"
            onClick={() => handleClose()}
          >
            canncel
          </button>
        </Box>
      </Modal>
    </div>
  );
}
