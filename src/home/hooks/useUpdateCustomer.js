//useUpdateCustomer.js
import {
  doc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase/config/index";

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

    // Check if another customer with the same name exists (excluding the current customer)
    const q = query(collection(db, "customers"), where("name", "==", name));
    const querySnapshot = await getDocs(q);

    // Ensure that the customer with the same name is not the current one
    const existingCustomer = querySnapshot.docs.find((doc) => doc.id !== id);

    if (existingCustomer) {
      setAlert({
        severity: "error",
        message: "A customer with this name already exists.",
        open: true,
      });
      setLoading(false);
      return; // Stop further execution if the name already exists
    }
    const docRef = doc(db, "customers", id);

    try {
      const dataWithTimestamp = {
        ...updatedData,
        lastUpdated: serverTimestamp(), // Firebase's server timestamp
      };
      await updateDoc(docRef, dataWithTimestamp);
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
