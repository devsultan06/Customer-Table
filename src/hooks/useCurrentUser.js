//useCurrentUser.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const useCurrentUser = () => {
  const { currentUser } = useContext(AuthContext);

  return currentUser;
};

export default useCurrentUser;
