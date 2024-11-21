import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { ColorRing, RotatingLines } from "react-loader-spinner";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customersCollectionRef = collection(db, "customers");

  useEffect(() => {
    const getCustomers = async () => {
      setLoading(true);

      try {
        const data = await getDocs(customersCollectionRef);

        const customersList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(customersList);
        setCustomers(customersList);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching customers:", err);
      } finally {
        console.log("Customers fetched successfully!");
        setLoading(false);
      }
    };

    getCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline mb-4">This is Home</h1>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#316bf3", "#316bf3", "#316bf3", "#316bf3", "#316bf3"]}
        />
      ) : (
        customers.map((customer) => (
          <div key={customer.id}>
            <li>{customer.id}</li>
            <li>{customer.name}</li>
            <li>{customer.balance}</li>
            <li>{customer.deposit}</li>
            <li>{customer.status}</li>
            <li>{customer.description}</li>
            <li>{customer.rate}</li>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
