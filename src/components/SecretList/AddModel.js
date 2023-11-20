import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import RichTextEditor from "./TextComp";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { _Api } from "../../Api";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "85%",
  bgcolor: "rgba(0,0,0,0.7)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const mobileStyle = {
  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",

    top: "80%",
    left: "80%",
  },
};
const mergedStyle = { ...style, ...mobileStyle };

const TransitionsModal = ({
  open,
  handleClose,
  handleError,
  handleSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [richTextContent, setRichTextContent] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    richTextContent: false,
  });

  const handleChange = (e) => {
    setTitle(e.target.value);
    setErrors({ ...errors, title: false });
  };

  const handleRichTextChange = (value) => {
    setRichTextContent(value);
    setErrors({ ...errors, richTextContent: false });
  };

  const handleAddClick = async () => {
    const Data = new FormData();
    if (title === "" || richTextContent === "") {
      setErrors({
        title: title === "",
        richTextContent: richTextContent === "",
      });
    } else {
      Data.append("Title", title);
      Data.append("Content", richTextContent);
      Data.append("userID", "");
      try {
        const response = await _Api(
          Data,
          "http://127.0.0.1:4000/api/todo/TodoData"
        );
        const { success, message } = response;

        if (success === true) {
          setTitle("");
          setRichTextContent("");
          handleSuccess(message);
          handleClose();
        } else {
          handleError(message);
        }
      } catch (error) {
        console.error("API request failed:", error);
        handleError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={mergedStyle}>
            <IconButton
              className="back-btn"
              style={{
                position: "absolute",
                top: "5px",
                right: "8px",
                color: "#ceb04f",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className="Add-box">
              <h3 style={{ color: "#ceb04f" }}>Title</h3>
              <input
                className={errors.title ? "Notmodel-input" : "model-input"}
                placeholder="Title"
                value={title}
                onChange={handleChange}
              />
              <br />
              <h3 style={{ color: "#ceb04f" }}>Secrets</h3>
              <RichTextEditor
                customclassName={
                  errors.richTextContent ? "Notcustom-editor" : "custom-editor"
                }
                value={richTextContent}
                onChange={handleRichTextChange}
              />
              <div
                className="btn-div"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "10px",
                }}
              >
                <button className="add1-btn" onClick={handleAddClick}>
                  Add
                </button>
                <button className="canncel-btn" onClick={() => handleClose()}>
                  Cancel
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
