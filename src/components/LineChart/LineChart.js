import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js

const LineChart = ({ dates, datas, title }) => {
  const data = {
    labels: dates, // Ngày (x-axis)
    datasets: [
      {
        label: "Lượt " + title, // Nhãn cho biểu đồ
        data: datas, // Lượt like (y-axis)
        fill: false,
        backgroundColor: "#3f81fe",
        borderColor: "#3f81fe",
        tension: 0.1, // Làm mịn đường line
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày", // Tiêu đề cho trục x
        },
      },
      y: {
        title: {
          display: true,
          text: "Lượt " + title, // Tiêu đề cho trục y
        },
        beginAtZero: true, // Bắt đầu từ 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
