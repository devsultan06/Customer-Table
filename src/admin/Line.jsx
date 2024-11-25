import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  Title,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
} from "chart.js";

ChartJS.register(
  LinearScale,
  Title,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sample Data",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Sample Data By Sultan",
      data: [25, 19, 80, 51, 56, 55, 30],
      fill: false,
      borderColor: "rgb(65, 152, 20)",
      tension: 0.1,
    },
  ],
};

const LineChart = () => {
  const options = {};
  return <Line options={options} data={data} />;
};

export default LineChart;
