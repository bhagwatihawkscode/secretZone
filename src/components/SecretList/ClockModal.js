import * as React from "react";
import Box from "@mui/material/Box";
import "./Secret.css";

import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  p: 4,
};

const ClockModal = ({
  open,
  handleClose,
  clockid,
  isFetch,
  handleError,
  handleSuccess,
}) => {
  const [Days, setDays] = React.useState("");
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  const Done = async () => {
    const date = value.$d;
    // const hour = date.getHours();
    // const minute = date.getMinutes();

    // Create the formatted time string
    // const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    //   .toString()
    //   .padStart(2, "0")}:00`;

    // console.log(formattedTime);

    let datasets = {
      reminderTime: date,
      userdays: Days,
      rowid: clockid,
      updatestatus: "0",
      expair: "0",
    };

    const data = await NormalCall(
      datasets,
      "http://127.0.0.1:4000/api/todo/setReminder"
    );
    const { success, message } = data;
    if (success === true) {
      setDays("");
      setValue("");
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
      >
        <Box sx={style}>
          <div className="box-1">
            <h2 style={{ margin: " 10px", color: "#ceb04f" }}>Set Reminder</h2>
            <div className="underline-title" style={{ margin: " 10px" }}></div>
            <div>
              <FormControl sx={{ minWidth: "93%", margin: "10px" }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{ color: "#ceb04f" }}
                >
                  Days
                </InputLabel>
                <Select
                  style={{ border: "2px solid #ceb04f", color: "#ceb04f" }}
                  labelId="demo-simple-select-helper-label"
                  value={Days}
                  label="Days"
                  onChange={handleChange}
                >
                  <MenuItem
                    value={0}
                    style={{
                      border: "none",
                      color: "black",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <em>None</em>
                  </MenuItem>
                  <MenuItem
                    style={{
                      border: "none",
                      color: "black",
                      backgroundColor: "#EAEAEA",
                    }}
                    value={10}
                  >
                    10 days
                  </MenuItem>
                  <MenuItem
                    style={{
                      border: "none",
                      color: "black",
                      backgroundColor: "#EAEAEA",
                    }}
                    value={15}
                  >
                    15 Days
                  </MenuItem>
                  <MenuItem
                    style={{
                      border: "none",
                      color: "black",
                      backgroundColor: "#EAEAEA",
                    }}
                    value={30}
                  >
                    30 Days
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Time"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
            <div className="btn-div">
              <button className="add1-btn" onClick={() => Done()}>
                Set
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
export default ClockModal;
