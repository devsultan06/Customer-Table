import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { ColorRing } from "react-loader-spinner";
import { Button, TextField } from "@mui/material";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [add, setAddLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    balance: "",
    deposit: "",
    status: "",
    description: "",
    rate: "",
  });

  const customersCollectionRef = collection(db, "customers");

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

  useEffect(() => {
    getCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "balance" || name === "deposit" || name === "rate"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddLoading(true);

    try {
      await addDoc(customersCollectionRef, data);
      console.log("Customer added successfully!");
      getCustomers();
      setData({
        name: "",
        balance: "",
        deposit: "",
        status: "",
        description: "",
        rate: "",
      });
    } catch (err) {
      setError(err.message);
      console.error("Error adding customer:", err);
    } finally {
      setAddLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const customerDoc = doc(db, "customers", id);
      await deleteDoc(customerDoc);
      console.log("Customer deleted successfully!");
      getCustomers();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting customer:", err);
    }
  };

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
            <button onClick={() => deleteCustomer(customer.id)}>
              delete customer
            </button>
          </div>
        ))
      )}

      <TextField
        id="name"
        label="name"
        variant="outlined"
        name="name"
        value={data.name}
        onChange={handleChange}
      />
      <TextField
        id="balance"
        label="balance"
        variant="outlined"
        name="balance"
        value={data.balance}
        onChange={handleChange}
      />
      <TextField
        id="deposit"
        label="deposit"
        variant="outlined"
        name="deposit"
        value={data.deposit}
        onChange={handleChange}
      />
      <TextField
        id="status"
        label="status"
        variant="outlined"
        name="status"
        value={data.status}
        onChange={handleChange}
      />
      <TextField
        id="description"
        label="description"
        variant="outlined"
        name="description"
        value={data.description}
        onChange={handleChange}
      />
      <TextField
        id="rate"
        label="rate"
        variant="outlined"
        name="rate"
        value={data.rate}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        {add ? (
          <ClipLoader
            color="white"
            loading={true}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
};

export default Home;
