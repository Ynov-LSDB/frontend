import React, { useState } from 'react';
import {FaHome, FaInfo, FaShoppingBasket} from 'react-icons/fa';
import './App.css';

//Organisms
import About from './components/organisms/About/About';
import Header from './components/organisms/Header/Header';
import Home from './components/organisms/Home/Home';
import Shop from './components/organisms/Shop/Shop';

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
    <div className={Style.App}>
      <Header menu={menu} />
      {(() => {
        switch (activePage) {
          case "Shop":
            return <Shop />
          case "About":
            return <About />
          default:
            return <Home />
        } 
      })()}
    </div>
  );
}

export default App;
