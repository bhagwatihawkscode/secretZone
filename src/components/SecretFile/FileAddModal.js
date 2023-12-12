import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../SecretList/Secret.css";
import { useDropzone } from "react-dropzone";
import { _Api } from "../../Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
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
const MAX_COUNT = 3;

const FileAddModal = ({ open, handleClose, handleError, handleSuccess }) => {
  const [title, setTitle] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isDropzoneEmpty, setIsDropzoneEmpty] = useState(false);

  const onDrop = (acceptedFiles) => {
    handleUploadFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDropzoneEmpty(false), // Reset flag on drag enter
    onDragLeave: () => setIsDropzoneEmpty(true), // Set flag on drag leave
  });
  const handleUploadFiles = async (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    await Promise.all(
      files.map(async (file) => {
        if (uploaded.findIndex((f) => f.name === file.name) === -1) {
          const base64Data = await readImageAsBase64(file);
          const fileInfo = {
            name: file.name,
            type: file.type,
            base64: base64Data,
          };

          uploaded.push(fileInfo);
          setIsDropzoneEmpty(false);

          if (uploaded.length > MAX_COUNT) {
            handleError(`You can only add a maximum of ${MAX_COUNT} files`);

            limitExceeded = true;
          }
        }
      })
    );

    if (!limitExceeded) {
      setUploadedFiles(uploaded);
    }
  };

  async function readImageAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false); // Reset flag when title changes
  };

  const handleDeselectAll = () => {
    setUploadedFiles([]);
    setTitle("");

    handleClose();
  };

  const handleDeselectFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleSaveClick = async () => {
    if (title === "" || uploadedFiles.length === 0) {
      setIsTitleEmpty(title === "");
      setIsDropzoneEmpty(uploadedFiles.length === 0);
    } else {
      // const formData = new FormData();
      // formData.append("title", title);

      // // Append files array to formData
      // uploadedFiles.forEach((file, index) => {
      //   formData.append(`files[${index}]`, file); // Append the entire file object
      // });
      const formData = { title: title, files: uploadedFiles };

      const response = await _Api(
        formData,
        `${process.env.REACT_APP_Base_Url}/FileData`
      );
      if (response) {
        const { message } = response;
        handleSuccess(message);
        handleClose();
        setUploadedFiles([]);
        setTitle("");
      } else {
        handleError("Problem To Upload File");
        handleClose();
        setUploadedFiles([]);

        setTitle("");
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
          <Box sx={mergedStyle} className="modal-mobile">
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
            <div id="fileUploadContainer">
              <label htmlFor="titleInput" style={{ color: "#ceb04f" }}>
                <h2>Title</h2>
              </label>
              <input
                type="text"
                id="titleInput"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="model-input"
                style={{ borderColor: isTitleEmpty ? "red" : "#ceb04f" }}
              />
              <label
                htmlFor="Input"
                style={{ color: "#ceb04f", marginTop: "10px" }}
              >
                <h2>Select File</h2>
              </label>
              <div
                {...getRootProps()}
                style={{
                  marginTop: "10px",

                  cursor: "pointer",
                  padding: "10px",
                  border: `2px dashed ${isDropzoneEmpty ? "red" : "#ceb04f"}`,
                  borderRadius: "20px",
                }}
                className="dropzonecss"
              >
                <input
                  {...getInputProps()}
                  //   accept="application/pdf, image/png"
                  accept="*"
                  multiple
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>

              <div className="uploaded-files-list" style={{ color: "#EAEAEA" }}>
                {uploadedFiles.map((file, index) => (
                  <div key={index}>
                    {index + 1}. {file.name}
                    <IconButton
                      onClick={() => handleDeselectFile(index)}
                      style={{ marginLeft: "10px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                    {/* <button
                      className="canncel-btn"
                      onClick={() => handleDeselectFile(index)}
                      style={{ marginLeft: "10px" }}
                    >
                      Deselecte
                    </button> */}
                  </div>
                ))}
              </div>
              <div
                style={{
                  margin: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button className="add1-btn" onClick={() => handleSaveClick()}>
                  Save
                </button>

                <button
                  className="canncel-btn"
                  onClick={() => handleDeselectAll()}
                >
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

export default FileAddModal;
