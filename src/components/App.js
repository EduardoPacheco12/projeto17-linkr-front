import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import Timeline from "./Timeline/Timeline";
import { DataContextProvider } from "../context/DataContext";

import "../assets/reset.css";
import "../assets/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Navbar />
        <Routes>
          <Route path="/users/:1" element={<UsersView />} />
          <Route path="/hashtag/:id" element={<Timeline />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}
