import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"; // Adjust the path as necessary
import { MutatingDots } from "react-loader-spinner";

// Create a context
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          password: user.password, // Note: Firebase Auth does not provide the password
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false); // Finish loading once the observer has set the user
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black06">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="blue"
          secondaryColor="blue"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
