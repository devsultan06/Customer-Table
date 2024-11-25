import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sample Data",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize dynamically
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sample Linear Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
