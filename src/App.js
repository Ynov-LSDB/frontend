import React, { useState } from 'react';
import {FaCalendar, FaHome, FaInfo, FaMedal, FaShoppingBasket, FaUser} from 'react-icons/fa';
import './App.css';

//Organisms
import Header from './components/organisms/Header/Header';
import Home from './components/templates/Home/Home';
import Profile from './components/templates/Profile/Profile';
import Events from "./components/templates/Events/Events";

//Internal Imports
import Style from './App.css';

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
      label: "Events",
      icon: <FaCalendar />,
      action: () => {
        console.log("Events clicked")
        setActivePage("Events")
      }
    },
  ]
  return (
    <div className={Style.App}>
      <Header menu={menu} activePage={activePage} setActivePage={setActivePage} className={Style.Header} />
      {(() => {
        switch (activePage) {
          case "Events":
            return <Events />
          case "Profile":
            return <Profile />
          default:
            return <Home />
        } 
      })()}
    </div>
  );
}

export default App;
