import React, { useEffect } from "react";
import { NormalCall } from "../../Api";
import { useState } from "react";
import "../SecretList/Secret.css";
import LineChart from "./crousalpage";
import "./DashBored.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TopicIcon from "@mui/icons-material/Topic";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import TodayIcon from "@mui/icons-material/Today";

import { _Api } from "../../Api";
const Dashcontent = () => {
  const [todaycount, settodaycount] = useState();
  const [TotalCount, setTotalCount] = useState();
  const [TotalFileCount, setTotalFileCount] = useState();
  const [dataCount, setdataCount] = useState([]);
  const [dataFileCount, setdataFileCount] = useState([]);
  const [Locationcount, setLocationcount] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchHistory, setSearchHistory] = React.useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // If search bar is cleared, close the Popper
    if (value === "") {
      setAnchorEl(false);
    }
  };

  const handleSearchKeyPress = async (event) => {
    setSearchHistory([]);
    if (event.key === "Enter" && searchValue !== "") {
      setAnchorEl(true);

      let apiURL = `${process.env.REACT_APP_Base_Url}/LocationFilter`;
      const dataset = new FormData();
      dataset.append("query", searchValue);

      const response = await _Api(dataset, apiURL);
      const { arraydata } = await response;

      if (Array.isArray(arraydata) && arraydata.length > 0) {
        setSearchHistory(arraydata);
      } else {
        setSearchHistory([]); // Clear search history if there is no data
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "search-popper" : undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        try {
          const data1 = await NormalCall(
            "",
            `${process.env.REACT_APP_Base_Url}/DashboardApi`
          );
          const week = await NormalCall(
            "",
            `${process.env.REACT_APP_Base_Url}/weekdayscount`
          );

          const {
            todayCount,
            totalCount,
            totalFileCount,
            uniqueLocationsCount,
          } = data1;
          settodaycount(todayCount);
          setTotalCount(totalCount);
          setTotalFileCount(totalFileCount);
          setLocationcount(uniqueLocationsCount);
          setdataCount(week.data);
          setdataFileCount(week.FileData);
          setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false); // Set loading to false in case of an error
        }
      } else {
        setIsLoggedIn("");
        setIsLoading(false); // Set loading to false if not logged in
      }
    };
    fetchData();
  }, [todaycount, TotalCount, isLoggedIn, TotalFileCount, Locationcount]);

  return (
    <div className="card-dash">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "5px",
          borderRadius: "20px",
        }}
      >
        <h1 style={{ color: "#ceb04f" }}>DashBoard</h1>
        <div
          style={{ position: "relative", width: "25%" }}
          className="dash-bar"
        >
          <input
            aria-describedby={id}
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            placeholder="Search"
            className="dash-boredinput"
          />
          {anchorEl && (
            <>
              {searchHistory && searchHistory.length > 0 ? (
                <div
                  className="autocomplete-items"
                  style={{
                    width: "100%", // Set the width to 100% to match the TextField
                    position: "absolute",
                    top: "100%", // Adjust as needed
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        margin: "10px",
                        backgroundColor: "#ceb04f",
                        borderRadius: "10px",
                      }}
                    >
                      Secret Title: {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      margin: "10px",
                      backgroundColor: "#ceb04f",
                      borderRadius: "10px",
                    }}
                  >
                    No Content
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="uper-dash">
        <div className="card">
          <div className="card-title ">
            <TodayIcon style={{ color: "#EAEAEA" }} />
            <p
              style={{
                color: "#EAEAEA",
                marginBottom: "0rem",
                marginLeft: "5px",
              }}
            >
              Today Secret
            </p>
          </div>
          {isLoading ? (
            // Show loader while data is being fetched
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            // Show LineChart when data is available
            <div className="card_image">{todaycount}</div>
          )}
        </div>
        <div className="card">
          <div className="card-title ">
            <ListAltIcon style={{ color: "#EAEAEA" }} />
            <p
              style={{
                color: "#EAEAEA",
                marginBottom: "0rem",
                marginLeft: "5px",
              }}
            >
              Total Secrets
            </p>
          </div>
          {isLoading ? (
            // Show loader while data is being fetched
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            // Show LineChart when data is available
            <div className="card_image">{TotalCount}</div>
          )}
        </div>

        <div className="card">
          <div className="card-title ">
            <TopicIcon style={{ color: "#EAEAEA" }} />
            <p
              style={{
                color: "#EAEAEA",
                marginBottom: "0rem",
                marginLeft: "5px",
              }}
            >
              Total Secret File
            </p>
          </div>
          {isLoading ? (
            // Show loader while data is being fetched
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            // Show LineChart when data is available
            <div className="card_image">{TotalFileCount}</div>
          )}
        </div>
        <div className="card">
          <div className="card-title ">
            <ShareLocationIcon style={{ color: "#EAEAEA" }} />
            <p
              style={{
                color: "#EAEAEA",
                marginBottom: "0rem",
                marginLeft: "5px",
              }}
            >
              Locations
            </p>
          </div>
          {isLoading ? (
            // Show loader while data is being fetched
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            // Show LineChart when data is available
            <div className="card_image">{Locationcount}</div>
          )}
        </div>
      </div>
      <div className="slider-cont">
        {isLoading ? (
          // Show loader while data is being fetched
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          // Show LineChart when data is available

          <LineChart dataCount={dataCount} dataFileCount={dataFileCount} />
        )}
      </div>
    </div>
  );
};

export default Dashcontent;
