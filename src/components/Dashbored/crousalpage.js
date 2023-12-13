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
        backgroundColor: "rgba(79, 109, 206, 0.4)",
      },
      {
        label: "Files",
        data: [...dataFileCount],
        borderColor: "#CE4FAD",
        backgroundColor: "rgba(206, 79, 173, 0.4)",
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
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            // Customize title based on dataset index
            const datasetIndex = tooltipItem[0].datasetIndex;
            return datasetIndex === 0 ? "Secrets" : "Files";
          },
          label: function (tooltipItem, data) {
            // Customize label as needed
            return "Count: " + tooltipItem.formattedValue;
          },
        },
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
        beginAtZero: true,
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
      <div style={{ display: "flex" }}>
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", margin: "10px" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                marginRight: "5px",
              }}
            ></div>
            <span style={{ color: "#EAEAEA" }}>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ height: "400px", width: "80%" }} className="mobile-chart">
        <Line data={data} options={options} className="bhagu" />
      </div>
    </div>
  );
};

export default LineChartComponent;
