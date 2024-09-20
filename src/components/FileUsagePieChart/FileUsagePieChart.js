// FileUsagePieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần trong Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const FileUsagePieChart = ({ currentUsage, maxCapacity }) => {
  // Tính toán dung lượng còn lại
  const remainingCapacity = maxCapacity - currentUsage;

  // Dữ liệu biểu đồ tròn
  const data = {
    labels: ["Đã sử dụng", "Tối đa"],
    datasets: [
      {
        label: "File Usage",
        data: [currentUsage, remainingCapacity],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Tùy chọn biểu đồ tròn
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} MB`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default FileUsagePieChart;
