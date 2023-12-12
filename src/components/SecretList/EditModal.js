import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import RichTextEditor from "./TextComp";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { _Api } from "../../Api";
import AddressAutocomplete from "./AutoCompleteInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "90%",
  bgcolor: "rgba(0,0,0,0.7)",
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

const EditModal = ({
  open,
  handleClose,
  itemId,
  isFetch,
  handleError,
  handleSuccess,
  permission,
}) => {
  const [disableedit, setdisable] = useState(true);
  const [title, setTitle] = useState("");
  const [richTextContent, setRichTextContent] = useState("");
  const [iddata, setIdData] = useState("");
  const [address, setAddress] = useState("");

  const [addressInput, setAddressInput] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    richTextContent: false,
    address: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (permission === "1") {
        setdisable(false);
      }
      const item = new FormData();
      item.append("key", itemId);
      const response = await _Api(
        item,
        `${process.env.REACT_APP_Base_Url}/EditData`
      );
      const data = await response;

      if (data) {
        setTitle(data.Title || ""); // Set default value if data.Title is undefined
        setRichTextContent(data.Content || ""); // Set default value if data.Content is undefined
        setIdData(data._id || "");
        setAddress(data.Location || "");
        setAddressInput(data.Location || "");
        // Set default value if data._id is undefined
      }
    };
    if (open) {
      fetchData();
    }
  }, [itemId, open, permission]);
  const handleSelect = (data) => {
    if (!data) {
      setAddress(address);
    }
    setAddress(
      data.properties.address_line1 + " " + data.properties.address_line2
    );
    setErrors({ ...errors, address: false });
  };

  const handleUpdateClick = async () => {
    const data = new FormData();
    if (title === "" || richTextContent === "" || address === "") {
      setErrors({
        title: title === "",
        richTextContent: richTextContent === "",
        address: address === "",
      });
    } else {
      setErrors({ title: false, richTextContent: false });

      data.append("Title", title);
      data.append("Content", richTextContent);
      data.append("_id", iddata);
      data.append("Location", address);

      try {
        const response = await _Api(
          data,
          `${process.env.REACT_APP_Base_Url}/UpdateTodo`
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
          <Box sx={mergedStyle}>
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
              <div
                style={{
                  pointerEvents: disableedit ? "auto" : "none",
                }}
              >
                <h3 style={{ color: "#ceb04f" }}>Title</h3>
                <input
                  className={errors.title ? "Notmodel-input" : "model-input"}
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <h3 style={{ color: "#ceb04f" }}>Location</h3>
                <AddressAutocomplete
                  placeholder={address}
                  onSelect={handleSelect}
                  // New prop for address input change
                  valueadd={addressInput} // Use separate state for address input
                  customclassName={
                    errors.address ? "Notmodel-input" : "model-input"
                  }
                />
                <h3 style={{ color: "#ceb04f" }}>Secrets</h3>

                <RichTextEditor
                  customclassName={
                    errors.richTextContent
                      ? "Notcustom-editor"
                      : "custom-editor"
                  }
                  value={richTextContent}
                  onChange={setRichTextContent}
                />
              </div>
              <div
                className="btn-div"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "10px",
                }}
              >
                {disableedit ? (
                  <button className="add1-btn" onClick={handleUpdateClick}>
                    Save
                  </button>
                ) : null}
                <button className="canncel-btn" onClick={handleClose}>
                  CANCEL
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
