import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Posts from "../components/posts/Posts";
import Login from "../components/login/Login";
import Signup from "../components/registration/Signup";

import "./index.css";

function App() {
  const loginKey = localStorage.getItem("login");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={loginKey ? <Navigate to="/posts" /> : <Login />}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
