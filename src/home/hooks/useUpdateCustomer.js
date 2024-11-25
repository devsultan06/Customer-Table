// useUpdateCustomer.js
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config/index"; // Import your Firebase config

const useUpdateCustomer = (
  setLoading,
  setAlert,
  fetchCustomers,
  handleCloseEditModal,
  handleMenuClose
) => {
  const handleEdit = async (updatedCustomer) => {
    setLoading(true);

    const { id, ...updatedData } = updatedCustomer;
    if (!id) {
      console.error("No customer ID provided for updating");
      return;
    }

    const docRef = doc(db, "customers", id);

    try {
      await updateDoc(docRef, updatedData);
      console.log(`Customer with ID ${id} updated successfully`);
      setAlert({
        severity: "success",
        message: "Customer updated successfully!",
        open: true,
      });
      fetchCustomers(); // Refresh the customer list
    } catch (error) {
      console.error("Error updating customer:", error);
      setAlert({
        severity: "error",
        message: "Failed to update customer.",
        open: true,
      });
    } finally {
      setLoading(false);
      handleCloseEditModal(); // Close the edit modal
      handleMenuClose(); // Close the menu
    }
  };

  return { handleEdit };
};

export default useUpdateCustomer;
