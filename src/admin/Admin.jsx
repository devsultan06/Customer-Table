import Line from "./Line";
import BarChart from "./BarChart";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  if (currentUser.email !== "sultanabaniks@gmail.com") {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <h1>What are you looking for here?</h1>
        <br></br>
        <Button variant="contained" onClick={handleGoHome}>
          Go Back{" "}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-96 lg:h-[500px]">
      <BarChart />
    </div>
  );
};

export default DashBoard;
