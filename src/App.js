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
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/events" component={Events} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
