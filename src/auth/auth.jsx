import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config"; 
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import Theme from "../components/Theme";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMessage({ type: "", text: "" });
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        // Check if the user is an admin
        // if (user.email !== "sultanabaniks@gmail.com") {
        //   setLoading(false);
        //   setMessage({ type: "error", text: "Only admins can log in." });
        //   return;
        // }

        console.log("Admin signed in:", user);
        setMessage({ type: "success", text: "Admin signed in successfully!" });
        formik.resetForm();
        setTimeout(() => {
          navigate("/home");
        }, 2000); 
      } catch (error) {
        setMessage({ type: "error", text: error.message });
        console.error("Error signing in:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="auth flex flex-col bg-white text-black items-center justify-center h-screen transition-colors duration-300 dark:bg-gray-800 dark:text-white">
      {" "}
      <h1 className="text-3xl font-bold underline mb-4">Login</h1>
      <MessageBox type={message.type} text={message.text} />
      <Theme />
      <form
        className="flex flex-col gap-4 w-[300px] mt-[20px]"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
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
