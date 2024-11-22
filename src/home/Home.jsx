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
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Modal,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config/index"; // Update with your Firebase config path
import { ColorRing } from "react-loader-spinner";
import AlertMessage from "./components/MessageBox";

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

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "rate", numeric: true, disablePadding: false, label: "Rate" },
  { id: "balance", numeric: true, disablePadding: false, label: "Balance" },
  { id: "deposit", numeric: true, disablePadding: false, label: "Deposit" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
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
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
    open: false,
  }); // Alert state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    description: "",
    status: "",
    rate: "",
    balance: "",
    deposit: "",
  });

  const statusColors = {
    Open: { backgroundColor: "#F0F1FA", textColor: "#4F5AED" }, // Open - Slightly darker green for text
    Inactive: { backgroundColor: "#E9EDF5", textColor: "#5A6376" }, // Inactive - Neutral gray tones
    Due: { backgroundColor: "#FAF0F3", textColor: "#D12953" }, // Due - Darker orange for text
    Paid: { backgroundColor: "#E1FCEF", textColor: "#14804A" }, // Paid - Deep blue for text
  };

  // Check if all fields are filled
  const isFormValid = useMemo(() => {
    return Object.values(newCustomer).every((value) => value.trim() !== "");
  }, [newCustomer]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
      setCustomers([]); // Ensure no data remains when there's an error
    } finally {
      setLoading(false);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleSaveCustomer = async () => {
    setLoading(true);
    try {
      const customerToSave = {
        ...newCustomer,
        balance: parseFloat(newCustomer.balance), // Convert balance to number
        deposit: parseFloat(newCustomer.deposit), // Convert deposit to number
        rate: parseFloat(newCustomer.rate), // Convert rate to number
      };
      const docRef = await addDoc(collection(db, "customers"), customerToSave);
      setCustomers((prevCustomers) => [
        ...prevCustomers,
        { ...newCustomer, id: docRef.id },
      ]);
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

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
            Customer Table
          </Typography>
        </Toolbar>
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
        />
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
              ) : customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    <Typography>No data available in the database.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the data based on page and rowsPerPage
                  .sort(getComparator(order, orderBy))
                  .map((customer) => (
                    <TableRow hover key={customer.id}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell>
                        <h1>{customer.name}</h1>
                        <p style={{ fontSize: "0.8rem" }}>{customer.id}</p>{" "}
                        {/* Smaller paragraph */}
                      </TableCell>
                      <TableCell>{customer.description}</TableCell>
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
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Customer
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newCustomer.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={newCustomer.status}
              onChange={handleInputChange}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Due">Due</MenuItem> {/* Changed value */}
              <MenuItem value="Paid">Paid</MenuItem> {/* Changed value */}
            </Select>
          </FormControl>

          <TextField
            label="Rate"
            name="rate"
            type="number"
            value={newCustomer.rate}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Balance"
            name="balance"
            type="number"
            value={newCustomer.balance}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Deposit"
            name="deposit"
            type="number"
            value={newCustomer.deposit}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveCustomer}
            disabled={!isFormValid}
            sx={{ mr: 2 }}
          >
            {loading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                colors={["#316bf3", "#316bf3", "#316bf3", "#316bf3", "#316bf3"]}
              />
            ) : (
              "Save"
            )}{" "}
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
      {/* Alert Component */}
      <AlertMessage alert={alert} setAlert={setAlert} />{" "}
      {/* Include the alert message */}{" "}
    </Box>
  );
}
