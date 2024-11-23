// useLogout.js
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config/index"; // Adjust the import to your Firebase setup

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out of Firebase
      navigate("/auth"); // Redirect to login page after logging out
    } catch (error) {
      console.error("Error logging out: ", error); // Handle errors if needed
    }
  };

  return { handleLogout };
};

export default useLogout;
