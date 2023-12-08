import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { NormalCall } from "../../Api";
import Select from "react-select";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./Secret.css";
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

function ChildModal({ permission, rowid, handleClose1 }) {
  const [open, setOpen] = React.useState(false);
  const [generatedLink, setGeneratedLink] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerateLink = async () => {
    try {
      //   // Assume you have the saved content, ID, and permission
      //   const secretContent = "This is a secret message.";
      //   const secretId = "123"; // Replace with your actual ID
      //   const permission = "view"; // Replace with your actual permission
      //   // Make a POST request to generate a unique link
      //   const generateLinkResponse = await fetch(
      //     "http://localhost:3000/api/secrets/generate",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         content: secretContent,
      //         id: secretId,
      //         permission,
      //       }),
      //     }
      //   );

      const data = await NormalCall(
        "",
        ` http://127.0.0.1:4000/api/todo/generatelink/${rowid}/${permission}`
      );
      console.log(data);
      const generateLinkData = data;
      const uniqueLink = generateLinkData.link;
      // Display the generated link to the user
      setGeneratedLink(uniqueLink);
      setCopied(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyLink = () => {
    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };
  const handleOpen = () => {
    handleGenerateLink();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="btn-div">
        <button
          className="add1-btn"
          style={{ padding: "2px" }}
          onClick={() => handleOpen()}
        >
          Genrate Link
        </button>
        <button className="canncel-btn" onClick={() => handleClose1()}>
          CANCEL
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* {generatedLink && ( */}
          <h2 style={{ margin: " 10px", color: "#c79d15" }}>Copy Share Link</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              className="input3-tag"
              type="text"
              value={generatedLink}
              readOnly
            />
            <IconButton onClick={handleCopyLink} disabled={copied}>
              <ContentCopyIcon />
            </IconButton>
            {copied && (
              <span style={{ color: "#c79d15" }}>
                Link copied to clipboard!
              </span>
            )}
          </div>
          {/* )} */}
          <button
            style={{ marginLeft: "30%" }}
            className="canncel-btn"
            onClick={() => handleClose()}
          >
            CANCEL
          </button>
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
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 style={{ margin: " 10px", color: "#c79d15" }}>
            Select Permission
          </h2>
          <Select
            onChange={(selectedOption) =>
              handleFilterChange(selectedOption.value)
            }
            options={optionsdata}
            defaultValue={{ label: filterBy, value: filterBy }}
            className="basic-single2"
            classNamePrefix="basic-select2"
          />

          <ChildModal
            permission={filterBy}
            rowid={itemId}
            handleClose1={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
