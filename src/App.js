import React, { useState } from 'react';
import {FaCalendar, FaHome, FaInfo, FaShoppingBasket, FaUser} from 'react-icons/fa';
import './App.css';

//Organisms
import About from './components/organisms/About/About';
import Header from './components/organisms/Header/Header';
import Home from './components/organisms/Home/Home';
import Profile from './components/organisms/Profile/Profile';
import Events from "./components/organisms/Events/Events";

//Internal Imports
import Style from './App.css';
import backgroundImage from "./assets/images/bg.jpg";

function App() {
  const [activePage, setActivePage] = useState("Home")
  //Integrer React Routeur ici



  
  const menu = [
    {
      label: "Home",
      // icon: (<Link to='/'><FaHome /></Link>),
      icon: (<FaHome />),
      action: () => {
        console.log("Home clicked")
        setActivePage("Home")
      }
    },
    {
      label: "Events",
      // icon: (<Link to='/events'><FaCalendar /></Link>),
      icon: (<FaCalendar />),
      action: () => {
        console.log("Events clicked")
        setActivePage("Events")
      }
    },
    {
      label: "About",
      // icon: (<Link to='/events'> <FaInfo /></Link>),
      icon: (<FaInfo />),
      action: () => {
        console.log("About clicked")
        setActivePage("About")
      }
    }
  ]
  return (
    //<Router>
    <div className={Style.App}>
      <Header menu={menu} activePage={activePage} setActivePage={setActivePage} className={Style.Header} />
      <img src={backgroundImage} class="backgroundImage"/>
      /*
    <Header menu={menu} ... />
    <img src={backgroundImage} class="backgroundImage"/>
    </Routeur>
    <Routes>
      <Route path="/" element={<Home />}>
      <Route path="/about" element={<About />}>
      <Route path="/profile" element={<Profile />}>
      <Route path="/events" element={<Events />}>
    </Routes>
  */

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
//    </Router>
  );
}

export default App;
