// useExportToExcel.js
import * as XLSX from "xlsx";

// Custom hook to export data to Excel
const useExportToExcel = (customers) => {
  const exportToExcel = () => {
    try {
      // Prepare data
      const dataToExport = customers.map((customer) => ({
        Name: customer.name,
        Description: customer.description,
        Status: customer.status,
        Rate: customer.rate,
        Balance: customer.balance,
        Deposit: customer.deposit,
      }));

      // Create a new worksheet from data
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Customers");

      // Write the workbook to a file
      XLSX.writeFile(wb, "customers.xlsx");
    } catch (err) {
      console.error("Error exporting data to Excel", err);
    }
  };

  return exportToExcel;
};

export default useExportToExcel;
