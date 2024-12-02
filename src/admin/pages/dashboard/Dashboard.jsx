import { CardWithLink } from "./components/CardWithLink";
import BarChart from "./../../BarChart";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="cards">
        <CardWithLink />
      </div>
      <div className="charts mt-6 p-4 bg-white shadow-md rounded-lg max-w-full">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Sales Overview</h2>
        <div className="h-[50vh] w-full max-w-full ">
          {" "}
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
