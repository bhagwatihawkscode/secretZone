import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { NormalCall } from "../../Api";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "rgba(0,0,0,1)",
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

const ClockModal = ({
  open,
  handleClose,
  clockid,
  isFetch,
  handleError,
  handleSuccess,
}) => {
  const [Days, setDays] = React.useState("");
  const [value, setValue] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await NormalCall(
          clockid,
          "http://127.0.0.1:4000/api/todo/clockmodaldatasend"
        );

        if (result && result.time) {
          setDays(result.userDays);

          try {
            // Format the date as a string
            const formattedDate = result.time;
            setValue(dayjs(formattedDate));
          } catch (error) {
            console.error("Error formatting date:", error);
          }
        } else {
          setDays("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error fetching data
      }
    };
    fetchData();
  }, [clockid, open]);

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  const Done = async () => {
    try {
      let datasets = {
        reminderTime: value,
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
    } catch (error) {
      console.error("Error setting reminder:", error);
      // Handle error setting reminder
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
                value={value || null}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
            <div className="btn-div">
              <button className="add1-btn" onClick={() => Done()}>
                Set
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

export default ClockModal;
