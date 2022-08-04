import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios-on-rails";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";

import SnackBar from "../snackbar";
import { LOGIN_API } from "../../constants/Apis";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [siginDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const [errorCheck, setErrorCheck] = useState({
    email: "",
    showPassword: false,
    snackbar: false,
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name === "email") {
      if (!value.match(emailRegex) && value.length > 0) {
        setErrorCheck({ ...errorCheck, email: "*Please Enter Valid Email!" });
      } else if (value.length === 0) {
        setErrorCheck({ ...errorCheck, email: "*This Field is required" });
      } else {
        setErrorCheck({ ...errorCheck, email: "" });
        setSigninDetails({ ...siginDetails, email: value.toLowerCase() });
      }
    } else if (name === "password") {
      setSigninDetails({ ...siginDetails, password: value });
    }
  };

  const handleClickShowPassword = () => {
    setErrorCheck({ ...errorCheck, showPassword: !errorCheck.showPassword });
  };

  const handleOnSignIn = () => {
    if (
      errorCheck.email !== "" ||
      siginDetails.email === "" ||
      siginDetails.password === ""
    ) {
      setErrorCheck({ ...errorCheck, snackbar: true });
    } else {
      setErrorCheck({ ...errorCheck, snackbar: false });
      axios
        .post(LOGIN_API, siginDetails)
        .then((response) => {
          storeLogedUserToLocalSorage(response.data);
          navigate("/posts");
        })
        .catch((err) => {
          setErrorCheck({ ...errorCheck, snackbar: true });
        });
    }
  };

  const storeLogedUserToLocalSorage = (user) => {
    localStorage.setItem("name", user.name);
    localStorage.setItem("id", user.id);
    localStorage.setItem("login", user.authentication_token);
  };

  return (
    <Box className="Login">
      <Box className="Login_page">
        <Box className="Login_header">
          <h3>Welcome!</h3>
          <p>Sign in to Your Account</p>
        </Box>
        <Box className="Login_body">
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <p>Email ID</p>
            <OutlinedInput
              name="email"
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Enter Your Email Address"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Email />
                  </IconButton>
                </InputAdornment>
              }
              error={errorCheck.email ? true : false}
            />
            {errorCheck.email && (
              <FormHelperText sx={{ color: "red" }}>
                {errorCheck.email}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <p>Password</p>
            <OutlinedInput
              value={siginDetails.password}
              type={errorCheck.showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              onChange={(e) => {
                handleOnChange(e);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start" onClick={handleClickShowPassword}>
                    {errorCheck.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            className="Login_button"
            onClick={() => handleOnSignIn()}
          >
            SIGN IN
          </Button>
        </Box>
        <Box className="Login_footer">
          <p>Don't have an Accocunt?</p>
          <Link to="/signup">Sign up.</Link>
        </Box>
        <SnackBar
          open={errorCheck.snackbar}
          message={"Invalid Credentials"}
          onClose={() => setErrorCheck({ ...errorCheck, snackbar: false })}
        />
      </Box>
    </Box>
  );
}

export default Login;
