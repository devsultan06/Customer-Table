// useLogout.js
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config/index";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate("/auth"); 
    } catch (error) {
      console.error("Error logging out: ", error); 
    }
  };
 
  return { handleLogout };
};

export default useLogout;
