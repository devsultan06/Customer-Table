import React from "react";
import { Navigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();

  if (currentUser === null) {
    // Redirect to authentication page if no user is logged in
    return <Navigate to="/auth" />;
  }

  return children; // Render protected component
};

export default ProtectedRoute;
