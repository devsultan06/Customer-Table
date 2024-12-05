import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./auth/auth";
import Home from "./home/Home.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Admin from "./admin/Admin.jsx";
import Customers from "./admin/pages/customers/Customers.jsx";
import Roles from "./admin/pages/roles/Roles.jsx";
import Settings from "./admin/pages/settings/Settings.jsx";
import Inbox from "./admin/pages/inbox/Inbox.jsx";
import Profile from "./admin/pages/profile/Profile.jsx";
import Dashboard from "./admin/pages/dashboard/Dashboard.jsx";
import {generateToken, messaging } from "./firebase/config/index.js";
import { onMessage } from "firebase/messaging";

const App = () => {
  useEffect(() => {
    // Ensure the service worker is registered
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js") // Make sure this path is correct
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Request token and listen for push messages
    generateToken(); // Ensure this function requests permission and gets the token

    // Handle incoming messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
    });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Authentication />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="roles" element={<Roles />} />
            <Route path="settings" element={<Settings />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="profile" element={<Profile />} />
            <Route path="" element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
