import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config/index";

const useFetchCustomers = (setLoading, setAlert) => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerData);
    } catch (err) {
      let errorMessage = "Error fetching data"; // Default error message

      // Log the full error object to the console for debugging
      console.log(err);

      // Check if res.code is false or the error doesn't contain a valid code
      if (!err.code) {
        errorMessage =
          "An unknown error occurred. Please check your connection or try again later.";
      } else {
        // Handle specific Firebase error codes (if any)
        if (err.code === "unavailable") {
          errorMessage =
            "It seems like your internet connection is off, please try again later.";
        } else if (err.code === "permission-denied") {
          errorMessage = "You do not have permission to access this data.";
        } else if (err.code === "not-found") {
          errorMessage = "The requested data was not found.";
        } else {
          errorMessage = `Error fetching data: ${err.message}`; // Generic error message
        }
      }

      setAlert({
        severity: "error",
        message: errorMessage,
        open: true,
      });
      setCustomers([]); // Clear the customers data on error
    } finally {
      setLoading(false);
    }
  };

  return { customers, fetchCustomers, setCustomers };
};

export default useFetchCustomers;
