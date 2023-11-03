import React, { useState } from 'react';
import {FaBurn, FaCalendar, FaHome, FaInfo, FaShoppingBasket, FaUser} from 'react-icons/fa';
import './App.css';

//Organisms
import About from './components/organisms/About/About';
import Header from './components/organisms/Header/Header';
import Home from './components/organisms/Home/Home';
import Profile from './components/organisms/Profile/Profile';
import Shop from './components/organisms/Shop/Shop';
import Events from "./components/organisms/Events/Events";

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
    <div className={Style.App}>
      <Header menu={menu} activePage={activePage} setActivePage={setActivePage} />
      {(() => {
        switch (activePage) {
          case "Events":
            return <Events />
          case "About":
            return <About />
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
