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

const FilePassVerifyModal = ({
  open,
  handleClose,
  itemId,
  unlockRowCallback,
  handleError,
  handleSuccess,
}) => {
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState(false);
  const hnadlechange = (e) => {
    setpassword(e.target.value);
    seterrors(false);
  };

  const handleUnlock = async () => {
    if (password === "") {
      seterrors(true);
    } else {
      const userdata = {
        password: password,
        keyid: itemId,
      };
      const data = await NormalCall(
        userdata,
        `${process.env.REACT_APP_Base_Url}/passwordverification`
      );
      const { success, message } = data;
      if (success === true) {
        unlockRowCallback(itemId);
        handleSuccess(message);
        setpassword("");
        handleClose();
      } else {
        handleClose();
        setpassword("");
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
            <h2 style={{ margin: " 10px", color: "#c79d15" }}>PassWord</h2>
            <div className="underline-title"></div>

            <input
              placeholder="PassWord"
              type="password"
              value={password}
              onChange={(e) => hnadlechange(e)}
              className={errors ? "errors-input" : "input3-tag"}
            />
            {/* <input placeholder="Confirm PassWord" className="input3-tag" /> */}
            <div className="btn-div">
              <button className="add1-btn" onClick={() => handleUnlock()}>
                Unlock
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
export default FilePassVerifyModal;
