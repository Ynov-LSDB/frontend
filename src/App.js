import Header from "./components/organisms/Header/Header";
import { Route, Routes } from 'react-router-dom';
import Home from "./components/templates/Home/Home";
import Events from "./components/templates/Events/Events";
import About from "./components/templates/About/About";
import Profile from "./components/templates/Profile/Profile";
import Login from "./components/organisms/Auth/Login";
import Register from "./components/organisms/Auth/Register";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;