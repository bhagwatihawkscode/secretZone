import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { _Api } from "../../Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "rgba(0,0,0,0.7)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({
  open,
  handleClose,
  itemId,
  isFetch,
  handleError,
  handleSuccess,
}) => {
  const onDelete = async () => {
    const Datakey = new FormData();
    Datakey.append("key", itemId);
    const response = await _Api(
      Datakey,
      "http://127.0.0.1:4000/api/todo/DeleteUser"
    );
    const { success, message } = response;
    if (success === true) {
      isFetch();
      handleSuccess(message);
      handleClose();
    } else {
      handleError(message);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition={true}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#ceb04f" }}
          >
            You want to Delete Secret
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              className="btn-div"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button className="add1-btn" onClick={() => onDelete()}>
                Delete
              </button>
              <button className="canncel-btn" onClick={() => handleClose()}>
                canncel
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteModal;
