import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config/index"; // Adjust the path as necessary
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "@mui/material";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Admin signed in:", user);
      setSuccess("Admin signed in successfully!");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold underline mb-4">Login</h1>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form
        action=""
        className="flex flex-col gap-4 w-[300px] mt-[20px]"
        onSubmit={handleSubmit}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
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
      </form>
    </div>
  );
};

export default Auth;
