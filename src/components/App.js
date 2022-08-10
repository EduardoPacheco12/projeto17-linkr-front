import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import Trends from "./Users/Trends";

import "../assets/reset.css";
import "../assets/style.css";
import Timeline from "./Timeline/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/users/:1" element={ <UsersView /> } />
        <Route path="/hashtag/:id" element={ <Timeline /> } />
        <Route path="/timeline" element={ <Timeline /> } />
      </Routes>
    </BrowserRouter>
  );
}