import React, { useState, useEffect } from 'react';
import Header from "./components/organisms/Header/Header";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/templates/Home/Home";
import Events from "./components/templates/Events/Events";
import Profile from "./components/templates/Profile/Profile";
import Login from "./components/organisms/Auth/Login";
import Register from "./components/organisms/Auth/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect (() => {
    setIsLoggedIn(true);
  },[]);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/auth/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>

  );
}

export default App;
