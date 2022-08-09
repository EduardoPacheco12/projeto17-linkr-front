import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import "../assets/reset.css";
import "../assets/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/users/:1" element={ <UsersView /> } />
      </Routes>
    </BrowserRouter>
  );
}