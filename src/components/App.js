import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import "../assets/reset.css";
import "../assets/style.css";
import Timeline from "./Timeline/Timeline";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/users/:1" element={ <UsersView /> } />
        <Route path="/timeline" element={ <Timeline /> } />
      </Routes>
    </BrowserRouter>
  );
}