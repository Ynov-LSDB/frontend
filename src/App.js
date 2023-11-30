import React, { useState, useEffect } from 'react';
import Header from "./components/organisms/Header/Header";
import { Route, Routes } from 'react-router-dom';

// Templates
import Home from "./components/templates/Home/Home";
import Events from "./components/templates/Events/Events";
import Profile from "./components/templates/Profile/Profile";
import Login from "./components/organisms/Auth/Login";
import Register from "./components/organisms/Auth/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Ranking from "./components/templates/Ranking/Ranking";
import axios from "axios";
import api from "./toolkit/api.config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
        axios(api("get", "me", null, token, "application/json", "*/*"))
            .then((response) => {
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.error('Error fetching events data:', error.response);
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
            });
    }
  }, []);

  return (
    <div className='App'> 
      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/auth/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </div>

  );
}

export default App;
