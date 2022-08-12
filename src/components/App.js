import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "../context/DataContext";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import Timeline from "./Timeline/Timeline";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import SearchedUserContext from "../context/SearchedUserContext";
import LogoutContext from "../context/LogoutContext";

import "../assets/reset.css";
import "../assets/style.css";

export default function App() {
  const [ searchedUser, setSearchedUser ] = useState({});
  const [logout, setLogout] = useState(false);

  return (
    <SearchedUserContext.Provider value={{ searchedUser, setSearchedUser}} >
      <LogoutContext.Provider value={ { logout, setLogout }} >
        <BrowserRouter>
        <DataContextProvider >
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route path="/users/:id" element={ <UsersView /> } />
            <Route path="/timeline" element={ <Timeline /> } />
            <Route path="/hashtag/:id" element={ <Timeline /> } />
          </Routes>
        </DataContextProvider>
        </BrowserRouter>
      </LogoutContext.Provider>
    </SearchedUserContext.Provider>
  );
}
