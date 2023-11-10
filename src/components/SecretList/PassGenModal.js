import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import "./Secret.css";
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

const PassModal = ({
  open,
  handleClose,
  isFetch,
  handleKey,
  itemId,
  handleError,
  handleSuccess,
}) => {
  const [password, setpassword] = useState();
  const userdata = {
    password: password,
    keyid: itemId,
  };
  const genratePass = async () => {
    const data = await NormalCall(
      userdata,
      " http://127.0.0.1:4000/api/todo/GeneratePass"
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
    isFetch();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="box-1">
            <h2 style={{ margin: " 10px", color: "#c79d15" }}>
              PassWord Generate
            </h2>
            <div className="underline-title"></div>

            <input
              placeholder="PassWord"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input3-tag"
            />
            {/* <input placeholder="Confirm PassWord" className="input3-tag" /> */}
            <div className="btn-div">
              <button className="add1-btn" onClick={() => genratePass()}>
                Generate
              </button>
              <button className="canncel-btn" onClick={() => handleClose()}>
                canncel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default PassModal;
