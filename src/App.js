import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Header from './components/organisms/Header/Header';
import Home from './components/templates/Home/Home';
import UserProfile from './components/organisms/UserProfile';
import Events from './components/templates/Events/Events';
import Login from './components/organisms/Auth/Login';
import Register from './components/organisms/Auth/Register';

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
