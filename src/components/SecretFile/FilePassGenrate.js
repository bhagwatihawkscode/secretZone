import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import "../SecretList/Secret.css";
import { NormalCall } from "../../Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "rgba(0,0,0,0.7",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const mobileStyle = {
  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",
  },
};
const mergedStyle = { ...style, ...mobileStyle };

const FilePassModal = ({
  open,
  handleClose,
  isFetch,
  handleKey,
  itemId,
  handleError,
  handleSuccess,
}) => {
  const [errors, seterrors] = useState(false);
  const [password, setpassword] = useState("");
  const hnadlechange = (e) => {
    setpassword(e.target.value);
    seterrors(false);
  };
  const userdata = {
    password: password,
    keyid: itemId,
  };
  const genratePass = async () => {
    if (password === "") {
      seterrors(true);
    } else {
      const data = await NormalCall(
        userdata,
        `${process.env.REACT_APP_Base_Url}/generatepassword`
      );
      const { statusCode, message } = data;

      if (statusCode === 201) {
        setpassword("");
        handleSuccess(message);
        isFetch();
        handleClose();
      } else {
        handleError(message);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mergedStyle} className="modal-mobile">
          <div className="box-1">
            <h2 style={{ margin: " 10px", color: "#c79d15" }}>
              PassWord Generate
            </h2>
            <div className="underline-title"></div>

            <input
              placeholder="PassWord"
              value={password}
              onChange={(e) => hnadlechange(e)}
              className={errors ? "errors-input" : "input3-tag"}
              type="password"
            />
            {/* <input placeholder="Confirm PassWord" className="input3-tag" /> */}
            <div className="btn-div">
              <button className="add1-btn" onClick={() => genratePass()}>
                Generate
              </button>
              <button className="canncel-btn" onClick={() => handleClose()}>
                CANCEL
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default FilePassModal;
