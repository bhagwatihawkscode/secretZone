import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import RichTextEditor from "./TextComp";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { _Api } from "../../Api";

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

const EditModal = ({
  open,
  handleClose,
  itemId,
  isFetch,
  handleError,
  handleSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [richTextContent, setRichTextContent] = useState("");
  const [iddata, setIdData] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    richTextContent: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const item = new FormData();
      item.append("key", itemId);
      const response = await _Api(
        item,
        "http://127.0.0.1:4000/api/todo/EditData"
      );
      const data = await response;

      if (data) {
        setTitle(data.Title || ""); // Set default value if data.Title is undefined
        setRichTextContent(data.Content || ""); // Set default value if data.Content is undefined
        setIdData(data._id || ""); // Set default value if data._id is undefined
      }
    };
    if (open) {
      fetchData();
    }
  }, [itemId, open]);

  const handleUpdateClick = async () => {
    const data = new FormData();
    if (title === "" || richTextContent === "") {
      setErrors({
        title: title === "",
        richTextContent: richTextContent === "",
      });
    } else {
      setErrors({ title: false, richTextContent: false });

      data.append("Title", title);
      data.append("Content", richTextContent);
      data.append("_id", iddata);

      try {
        const response = await _Api(
          data,
          "http://127.0.0.1:4000/api/todo/UpdateTodo"
        );
        const { success, message } = response;

        if (success === true) {
          handleSuccess(message);
          isFetch();
          handleClose();
        } else {
          handleError(message);
          handleClose();
        }
      } catch (error) {
        console.error("API request failed:", error);
        handleError("An error occurred while processing your request.");
        handleClose();
      }
    }
  };

  if (!open) {
    return null; // Don't render the component if it's closed
  }

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
          <Box sx={style}>
            <IconButton
              className="back-btn"
              style={{
                position: "absolute",
                top: "5px",
                right: "8px",
                color: "#ceb04f",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <div className="Add-box">
              <h3 style={{ color: "#ceb04f" }}>Title</h3>
              <input
                className={errors.title ? "Notmodel-input" : "model-input"}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <h3 style={{ color: "#ceb04f" }}>Secrets</h3>

              <RichTextEditor
                customclassName={
                  errors.richTextContent ? "Notcustom-editor" : "custom-editor"
                }
                value={richTextContent}
                onChange={setRichTextContent}
              />

              <div
                className="btn-div"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "10px",
                }}
              >
                <button className="add1-btn" onClick={handleUpdateClick}>
                  Save
                </button>
                <button className="canncel-btn" onClick={handleClose}>
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

export default EditModal;
