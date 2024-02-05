import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navigation from "./components/Navigation.jsx";
import { AuthProvider } from "./utils/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/update" element={<Update />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
