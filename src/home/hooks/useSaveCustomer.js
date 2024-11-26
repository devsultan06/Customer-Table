// useSaveCustomer.js
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config/index"; // Adjust this import to your Firebase setup
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const useSaveCustomer = (
  newCustomer,
  setNewCustomer,
  fetchCustomers,
  setAlert,
  setCustomers,
  setLoading,
  handleCloseModal
) => {
  const { currentUser } = useContext(AuthContext);

  const handleSaveCustomer = async () => {
    setLoading(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Output: "11/25/2024"
    const createdBy = currentUser.email;
    try {
      const customerToSave = {
        ...newCustomer,
        createdOn: formattedDate,
        createdBy,
        balance: parseFloat(newCustomer.balance), // Convert balance to number
        deposit: parseFloat(newCustomer.deposit), // Convert deposit to number
        rate: parseFloat(newCustomer.rate), // Convert rate to number
      };

      const docRef = await addDoc(collection(db, "customers"), customerToSave);

      setCustomers((prevCustomers) => [
        ...prevCustomers,
        { ...newCustomer, id: docRef.id },
      ]);

      // Reset newCustomer state after successful save
      setNewCustomer({
        name: "",
        description: "",
        status: "",
        rate: "",
        balance: "",
        deposit: "",
      });

      handleCloseModal();
      fetchCustomers();

      setAlert({
        severity: "success",
        message: "Customer added successfully!",
        open: true,
      });
    } catch (err) {
      setAlert({
        severity: "error",
        message: "Failed to add customer. Please try again.",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleSaveCustomer };
};

export default useSaveCustomer;
