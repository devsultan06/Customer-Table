import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { visuallyHidden } from "@mui/utils";
import { db } from "../firebase/config/index"; // Update with your Firebase config path
import { ColorRing } from "react-loader-spinner";
import AlertMessage from "./components/MessageBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteDoc, doc } from "firebase/firestore";
import useExportToExcel from "./hooks/useExportToExcel"; // Import the custom hook
import ActionMenu from "./components/ActionMenu";
import AddStaffModal from "./components/AddStaffModal";
import useFetchCustomers from "./hooks/useFetchCustomers";
import headCells from "./data/headCells";
import useSaveCustomer from "./hooks/useSaveCustomer";
import useLogout from "./hooks/useLogOut";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default function Home() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("index");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    open: false,
  }); // Alert state

  const [menuAnchor, setMenuAnchor] = useState(null); // State to track menu open/close
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Track the customer for dropdown actions
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    description: "",
    status: "",
    rate: "",
    balance: "",
    deposit: "",
  });
  const { customers, fetchCustomers, setCustomers } = useFetchCustomers(
    setLoading,
    setAlert
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const statusColors = {
    Open: { backgroundColor: "#F0F1FA", textColor: "#4F5AED" }, // Open - Slightly darker green for text
    Inactive: { backgroundColor: "#E9EDF5", textColor: "#5A6376" }, // Inactive - Neutral gray tones
    Due: { backgroundColor: "#FAF0F3", textColor: "#D12953" }, // Due - Darker orange for text
    Paid: { backgroundColor: "#E1FCEF", textColor: "#14804A" }, // Paid - Deep blue for text
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleAddCustomer = () => {
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const { handleSaveCustomer } = useSaveCustomer(
    newCustomer,
    setNewCustomer,
    fetchCustomers,
    setAlert,
    setCustomers,
    setLoading,
    handleCloseModal
  );

  const { handleLogout } = useLogout();

  const handleMenuOpen = (event, customer) => {
    console.log("Menu opened for customer", customer);

    setMenuAnchor(event.currentTarget);
    setSelectedCustomer(customer); // Save the selected customer
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCustomer(null);
  };

  const handleDelete = async () => {
    console.log(`Delete clicked for customer`, selectedCustomer);

    if (!selectedCustomer?.id) {
      console.error("No customer ID provided for deletion");
      return;
    }

    // Reference to the Firestore document
    const docRef = doc(db, "customers", selectedCustomer.id);

    try {
      setLoading(true);
      // Delete the document from Firestore
      await deleteDoc(docRef);
      console.log(
        `Customer with ID ${selectedCustomer.id} deleted successfully`
      );
      setAlert({
        severity: "success",
        message: "Customer deleted successfully!",
        open: true,
      });
      fetchCustomers(); // Assuming this fetches the updated list of customers
    } catch (error) {
      console.error("Error deleting customer:", error);
    } finally {
      setLoading(false);
    }

    // Close the menu after handling the action
    handleMenuClose();
  };

  const exportToExcel = useExportToExcel(customers);

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div className="flex justify-between items-center">
          <Toolbar>
            <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
              Customer Table
            </Typography>
          </Toolbar>
          <Button
            onClick={handleLogout}
            variant="contained"
            startIcon={<LogoutIcon />}
            sx={{
              marginRight: "10px",
            }}
          >
            Logout
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{
              marginLeft: "10px",
              fontSize: "10px",
              width: { xs: "100%", sm: "300px" },
              display: { xs: "block", sm: "inline-block" },
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={exportToExcel} // Attach the export function to this button
            sx={{
              marginRight: "10px",
            }}
          >
            Export to CSV
          </Button>
        </div>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <div className="text-center mx-auto flex justify-center items-center h-40">
                      <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#316bf3",
                          "#316bf3",
                          "#316bf3",
                          "#316bf3",
                          "#316bf3",
                        ]}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : searchQuery && filteredCustomers.length === 0 ? (
                // Show "No results found" when a search query has no matches
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    <Typography>
                      No results found for "<strong>{searchQuery}</strong>".
                      Please try a different search term.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    <Typography>No data available in the database.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers
                  .sort(getComparator(order, orderBy)) // Sort the full data set
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Then slice for the current page
                  .map((customer, index) => (
                    <TableRow
                      hover
                      sx={{
                        cursor: "pointer",
                      }}
                      key={customer.id}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell> */}
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <h1>{customer.name}</h1>
                        <p style={{ fontSize: "0.8rem" }}>{customer.id}</p>{" "}
                        {/* Smaller paragraph */}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "300px",
                        }}
                      >
                        {customer.description}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          sx={{
                            pointerEvents: "none",
                            cursor: "default",
                            backgroundColor:
                              statusColors[customer.status]?.backgroundColor ||
                              "default",
                            color:
                              statusColors[customer.status]?.textColor ||
                              "#000",
                          }}
                        >
                          {customer.status}
                        </Button>{" "}
                      </TableCell>
                      <TableCell>
                        <h1>${customer.rate}</h1>
                        <p style={{ fontSize: "0.8rem" }}>CAD</p>{" "}
                        {/* Smaller paragraph */}
                      </TableCell>{" "}
                      <TableCell>
                        <h1>${customer.balance}</h1>
                        <p style={{ fontSize: "0.8rem" }}>CAD</p>{" "}
                        {/* Smaller paragraph */}
                      </TableCell>{" "}
                      <TableCell>
                        <h1>${customer.deposit}</h1>
                        <p style={{ fontSize: "0.8rem" }}>CAD</p>{" "}
                        {/* Smaller paragraph */}
                      </TableCell>{" "}
                      <TableCell>
                        <ActionMenu
                          anchorEl={menuAnchor}
                          open={Boolean(menuAnchor)}
                          handleMenuOpen={(event) =>
                            handleMenuOpen(event, customer)
                          }
                          handleMenuClose={handleMenuClose}
                          handleDelete={handleDelete}
                          loading={loading}
                          customer={customer} // Pass customer data if needed
                        />{" "}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2, float: "right" }}
        onClick={handleAddCustomer}
      >
        Add Customer
      </Button>
      {/* Modal for Adding Customer */}
      <AddStaffModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSaveCustomer={handleSaveCustomer}
        loading={loading}
        handleCloseModal={handleCloseModal}
        newCustomer={newCustomer}
        handleInputChange={handleInputChange}
      />
      {/* Alert Component */}
      <AlertMessage alert={alert} setAlert={setAlert} />{" "}
      {/* Include the alert message */}{" "}
    </Box>
  );
}
