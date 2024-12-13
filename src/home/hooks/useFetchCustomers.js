// useFetchCustomers.js
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
      setAlert({
        severity: "error",
        message: `Error fetching data: ${err.message}`,
        open: true,
      });
      setCustomers([]); 
    } finally {
      setLoading(false);
    }
  };

  return { customers, fetchCustomers, setCustomers };
};

export default useFetchCustomers;
