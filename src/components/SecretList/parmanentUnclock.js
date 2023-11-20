import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./Secret.css";
import { NormalCall } from "../../Api";

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

function ChildModal({ itemId, handleError, handleSuccess, closingfun }) {
  const [password, setpassword] = React.useState("");
  const [errors, seterrors] = React.useState(false);
  const hnadlechange = (e) => {
    setpassword(e.target.value);
    seterrors(false);
  };

  const setdata = { pass: password, childId: itemId };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const unlock = async () => {
    if (password === "") {
      seterrors(true);
    } else {
      const data = await NormalCall(
        setdata,
        " http://127.0.0.1:4000/api/todo/PermanentUnlock"
      );
      const { statusCode, message } = data;
      if (statusCode === 201) {
        setpassword("");
        handleSuccess(message);
        handleClose();
        closingfun(true);
      } else {
        handleError(message);
        handleClose();
        closingfun(true);
      }
    }
  };

  return (
    <React.Fragment>
      <button className="add1-btn" onClick={() => handleOpen()}>
        Yes
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={mergedStyle}>
          <div className="box-1">
            <h2 style={{ margin: " 10px", color: "#c79d15" }}>
              Enter Your Password
            </h2>
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
              <button className="add1-btn" onClick={() => unlock()}>
                Unlock
              </button>
              <button className="canncel-btn" onClick={() => handleClose()}>
                canncel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
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
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title" style={{ color: "#ceb04f" }}>
            Unlock Srecrets
          </h2>
          <div className="underline-title"></div>
          <p id="parent-modal-description">
            Are You Sure To make Secrect Permanent Unlock
          </p>
          <ChildModal
            itemId={itemId}
            handleError={handleError}
            handleSuccess={handleSuccess}
            closingfun={closingfun}
          />
          <button className="canncel-btn" onClick={() => handleClose()}>
            canncel
          </button>
        </Box>
      </Modal>
    </div>
  );
}
