import React, { useEffect } from "react";
import { NormalCall } from "../../Api";
import { useState } from "react";
import "./DashBored.css";
import ImageCarousel from "./crousalpage";
const Dashcontent = () => {
  const [todaycount, settodaycount] = useState();
  const [TotalCount, setTotalCount] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const fetchData = async () => {
    if (isLoggedIn) {
      const data = await NormalCall(
        "",
        "http://127.0.0.1:4000/api/todo/DashboardApi"
      );
      const { todayCount, totalCount } = data;
      settodaycount(todayCount);
      setTotalCount(totalCount);
    } else {
      setIsLoggedIn("");
    }
  };

  useEffect(() => {
    fetchData();
  }, [todaycount, TotalCount, isLoggedIn]);

  return (
    <div className="card-dash">
      <div className="uper-dash">
        <div className="card">
          <div className="card-title ">
            <p style={{ color: "#EAEAEA" }}>Total Secrets</p>
          </div>
          <div className="card_image">{TotalCount}</div>
        </div>
        <div className="card">
          <div className="card-title ">
            <p style={{ color: "#EAEAEA" }}>Today Secret</p>
          </div>
          <div className="card_image">{todaycount}</div>
        </div>
      </div>
      <div className="slider-cont">
        <ImageCarousel />
        {/* 
        <img
          style={{
            width: "100%",
            objectFit: "contain",
            verticalAlign: "middle",
          }}
          src="https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg"
          alt="test"
        /> */}
      </div>
    </div>
  );
};

export default Dashcontent;
