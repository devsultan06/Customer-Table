import { useState } from "react";
import { Button, Input } from "@material-tailwind/react"; // Import Material Tailwind components
import { ColorRing } from "react-loader-spinner";
import useExportToExcel from "../../../home/hooks/useExportToExcel";
import { useCustomerContext } from "../../contexts/CustomerContext";
import AlertMessage from "../../../home/components/AlertMessage";

const Customers = () => {
  const [search, setSearch] = useState(""); // Search term state
  const { customers} = useCustomerContext();
  // Filter customers based on the search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    open: false,
  });

  const exportToExcel = useExportToExcel(customers, setAlert);

  return (
    <div className="min-h-screen ">
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
   
      {/* No Data Message */}
      {filteredCustomers.length === 0 && (
        <div className="text-center text-gray-600 mt-6">
          No data available in the database.{" "}
        </div>
      )}
      {/* Customer Table */}
      {filteredCustomers.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto max-w-full">
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
                  <td className="p-4">${customer.rate}</td>
                  <td className="p-4">${customer.balance}</td>
                  <td className="p-4">${customer.deposit}</td>
                  <td className="p-4">{customer.createdOn}</td>
                  <td className="p-4">{customer.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <AlertMessage alert={alert} setAlert={setAlert} />{" "}
    </div>
  );
};

export default Customers;
