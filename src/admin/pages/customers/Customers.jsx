import { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react"; // Import Material Tailwind components
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { ColorRing } from "react-loader-spinner";
import useExportToExcel from "../../../home/hooks/useExportToExcel";

const Customers = () => {
  const [search, setSearch] = useState(""); // Search term state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCustomers = async () => {
    setLoading(true); // Start loader
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));
      const customerData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerData);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]); // Ensure no data remains when there's an error
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  const exportToExcel = useExportToExcel(customers);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="block md:flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Customers</h1>
        <div className="flex space-x-4">
          <Button
            variant="outlined"
            className="text-gray-600 hover:text-blue-600"
            onClick={exportToExcel}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          label="Search customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mx-auto flex justify-center items-center h-40">
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
      )}

      {/* No Data Message */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="text-center text-gray-600 mt-6">
          No customers found.
        </div>
      )}

      {/* Customer Table */}
      {!loading && filteredCustomers.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">
                  <input type="checkbox" />
                </th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Rate</th>
                <th className="p-4 text-left">Balance</th>
                <th className="p-4 text-left">Deposit</th>
                <th className="p-4 text-left">Created On</th>
                <th className="p-4 text-left">Created By</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4">
                    <input type="checkbox" />
                  </td>
                  <td className="p-4">{customer.name}</td>
                  <td className="p-4">{customer.description}</td>
                  <td className="p-4">{customer.status}</td>
                  <td className="p-4">{customer.rate}</td>
                  <td className="p-4">{customer.balance}</td>
                  <td className="p-4">{customer.deposit}</td>
                  <td className="p-4">{customer.createdOn}</td>
                  <td className="p-4">{customer.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Customers;
