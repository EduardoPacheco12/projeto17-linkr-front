import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from "./Users/UsersView";
import Navbar from "./Navbar/Navbar";
import Timeline from "./Timeline/Timeline";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import SearchedUserContext from "../context/SearchedUserContext";
import LogoutContext from "../context/LogoutContext";
import { DataContextProvider } from "../context/DataContext";
import { ModalContextProvider } from "../context/ModalContext";
import PostContext from "../context/PostContext";
import DeleteAlert from "./Users/DeleteAlert";
import ShareAlert from "./Users/ShareAlert";

import "../assets/reset.css";
import "../assets/style.css";

export default function App() {
  const [ searchedUser, setSearchedUser ] = useState({});
  const [ userId, setUserId ] = useState(null);
  const [logout, setLogout] = useState(false);
  const [ newPost, setNewPost ] = useState(false);
  const [ postId, setPostId ] = useState(0);

  return (
    <SearchedUserContext.Provider value={{ searchedUser, setSearchedUser, userId, setUserId}} >
      <LogoutContext.Provider value={ { logout, setLogout }} >
        <PostContext.Provider value={{ newPost, setNewPost, postId, setPostId }} >
          <ModalContextProvider>
            <ShareAlert />
            <DeleteAlert />
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
          </ModalContextProvider>
        </PostContext.Provider>
      </LogoutContext.Provider>
    </SearchedUserContext.Provider>
  );
}
