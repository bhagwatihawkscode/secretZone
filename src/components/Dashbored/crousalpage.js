import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./DashBored.css";

const LineChartComponent = ({ dataCount, dataFileCount }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const data = {
    labels: [...weekDays],
    datasets: [
      {
        label: "Secrets",
        data: [...dataCount],
        borderColor: "#4f6dce",
        backgroundColor: "#EAEAEA",
      },
      {
        label: "Files",
        data: [...dataFileCount],
        borderColor: "#CE4FAD",
        backgroundColor: "#EAEAEA",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Set to false to hide the legend
      },
      title: {
        display: true,
        text: "Secrets and Files Created On Day of Week",
        color: "#EAEAEA",
      },
      tooltip: {
        enabled: true, // Enable tooltips
        mode: "index", // Display multiple tooltips when hovering over multiple datasets
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Day of Week",
          color: "#EAEAEA",
        },
        ticks: {
          color: "#EAEAEA",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Count",
          color: "#EAEAEA",
        },
        suggestedMin: 0,
        ticks: {
          color: "#EAEAEA",
        },
      },
    },
    animation: {
      duration: 2000, // Set the duration of the animation in milliseconds
      easing: "linear", // You can choose different easing functions
    },
    maintainAspectRatio: false, // Disable aspect ratio to allow custom height and width
    height: "400px", // Set the height of the chart
    width: "80%",
  };
  const legendItems = [
    { label: "Secrets", color: "#4f6dce" },
    { label: "Files", color: "#CE4FAD" },
  ];
  return (
    <div
      className="custom-legend"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {legendItems.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: item.color,
              marginRight: "5px",
            }}
          ></div>
          <span>{item.label}</span>
        </div>
      ))}
      <div style={{ height: "400px", width: "80%" }}>
        <Line data={data} options={options} className="bhagu" />
      </div>
    </div>
  );
};

export default LineChartComponent;
