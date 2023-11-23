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

function App() {
  const [activePage, setActivePage] = useState("Home")

  const menu = [
    {
        label: "Home",
        icon: <FaHome />,
        action: () => {
          console.log("Home clicked")
          setActivePage("Home")
        }
    },
    {
        label: "Shop",
        icon: <FaShoppingBasket />,
        action: () => {
          console.log("Shop clicked")
          setActivePage("Shop")
        }
    },
    {
        label: "About",
        icon: <FaInfo />,
        action: () => {
          console.log("About clicked")
          setActivePage("About")
        }
    }
  ]
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
        <Route path="/events" element={<Events />} />
        <Route path="/auth/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
