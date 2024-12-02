//CustomerContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { ColorRing } from "react-loader-spinner";

const CustomerContext = createContext();

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export const CustomerProvider = ({children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on initial render

  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerData);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const totalCustomer = customers.length;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black06">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#316bf3", "#316bf3", "#316bf3", "#316bf3", "#316bf3"]}
        />
      </div>
    );
  }

  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        fetchCustomers,
        error,
        totalCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
