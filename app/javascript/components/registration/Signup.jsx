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
import Lock from "@mui/icons-material/Lock";
import Email from "@mui/icons-material/Email";
import AccountCircle from "@mui/icons-material/AccountCircle";

import "./Signup.css";
import { REGISTER_USER_API } from "../../constants/Apis";
import SnackBar from "../snackbar";

const intialState = {
  email: "",
  name: "",
  password: "",
};

function Signup() {
  const navigate = useNavigate();
  const [registrationDetails, setRegistrationDetails] = useState(intialState);
  const [signedUp, setSignedUp] = useState(false);
  const [errorCheck, setErrorCheck] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Email error check
    if (name === "email") {
      if (!value.match(emailRegex) && value.length > 0) {
        setErrorCheck({ ...errorCheck, email: "*Please Enter Valid Email!" });
      } else if (value.length === 0) {
        setErrorCheck({ ...errorCheck, email: "*This Field is required" });
      } else {
        setErrorCheck({ ...errorCheck, email: "" });
        setRegistrationDetails({ ...registrationDetails, email: value });
      }
    }

    // password check
    if (name === "password") {
      if (value.length >= 6 && value.length <= 32) {
        setErrorCheck({ ...errorCheck, password: "" });
        setRegistrationDetails({ ...registrationDetails, password: value });
      } else {
        setErrorCheck({
          ...errorCheck,
          password: "*Must consists of characters between 6 to 32",
        });
      }
    }

    //name check
    if (name === "name") {
      if (value.length >= 3) {
        setRegistrationDetails({
          ...registrationDetails,
          name: value,
        });
        setErrorCheck({ ...errorCheck, name: "" });
      } else {
        setErrorCheck({ ...errorCheck, name: "*Enter valid user name" });
      }
    }
  };

  const handleOnSignUp = () => {
    axios
      .post(REGISTER_USER_API, registrationDetails)
      .then((response) => {
        console.log(response);
        setSignedUp(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setErrorCheck({
          ...errorCheck,
          email: "*Email already used",
        });
      });
  };

  return (
    <Box className="Registration_root">
      <Box className="Signup_page">
        <Box className="Signup_header">
          <h2>Welcome!</h2>
          <p>Create Your Account</p>
        </Box>
        <Box className="Signup_body">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <p>User name</p>
            <OutlinedInput
              name="name"
              placeholder="Enter User Name"
              onChange={(e) => handleOnChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <AccountCircle />
                  </IconButton>
                </InputAdornment>
              }
              error={errorCheck.name ? true : false}
            />
            {errorCheck.name && (
              <FormHelperText sx={{ color: "red" }}>
                {errorCheck.name}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <p>Email ID</p>
            <OutlinedInput
              name="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => handleOnChange(e)}
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

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <p>Password</p>
            <OutlinedInput
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => handleOnChange(e)}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <Lock />
                  </IconButton>
                </InputAdornment>
              }
              error={errorCheck.password ? true : false}
            />
            {errorCheck.password && (
              <FormHelperText sx={{ color: "red" }}>
                {errorCheck.password}
              </FormHelperText>
            )}
          </FormControl>

          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            onClick={() => handleOnSignUp()}
          >
            SIGN UP
          </Button>
        </Box>
        <Box className="Signup_footer">
          <p>Already have an Account?</p>
          <Link to="/">Sign in.</Link>
        </Box>
      </Box>
      <SnackBar
        open={signedUp}
        message={"Signed Up Successfully"}
        onClose={() => setSignedUp(false)}
        severity="success"
      />
    </Box>
  );
}

export default Signup;
