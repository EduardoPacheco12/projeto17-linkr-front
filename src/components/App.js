import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "../context/DataContext";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import Timeline from "./Timeline/Timeline";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

import "../assets/reset.css";
import "../assets/style.css";

export default function App() {
  return (
    
    <BrowserRouter>
    <DataContextProvider >
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/users/:1" element={ <UsersView /> } />
        <Route path="/timeline" element={ <Timeline /> } />
        <Route path="/hashtag/:id" element={ <Timeline /> } />
      </Routes>
    </DataContextProvider>
    </BrowserRouter>
  );
}
