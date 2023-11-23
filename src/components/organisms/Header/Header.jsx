import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCalendar, FaUser, FaSignInAlt, FaTrophy } from 'react-icons/fa';
import Logo from '../../../assets/images/logo.png';
import Style from './Header.module.css';


export default function Header({isLoggedIn, setIsLoggedIn}) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <header className={Style.header}>
            <img src={Logo} alt="Logo" className={Style.logo} />
            <ul className="flex-grow flex justify-center space-x-4">
                <Link to="/" className={`flex items-center text-white text-lg font-bold ${Style.link} ${isActive('/') ? Style.linkActive : ''}`}>
                    <FaHome className="mr-1" /> Home
                </Link>
                <Link to="/events" className={`flex items-center text-white text-lg font-bold ${Style.link} ${isActive('/events') ? Style.linkActive : ''}`}>
                    <FaCalendar className="mr-1" /> Events
                </Link>
                <Link to="/ranking" className={`flex items-center text-white text-lg font-bold ${Style.link} ${isActive('/ranking') ? Style.linkActive : ''}`}>
                    <FaTrophy className="mr-1" /> Ranking
                </Link>
            </ul>
            <div className="ml-auto">
                {isLoggedIn ? (
                    <Link to="/profile" className={`flex items-center text-white text-lg mr-8 font-bold ${Style.link} ${isActive('/profile') ? Style.linkActive : ''}`}>
                        <FaUser className="mr-2" />
                        Profile
                    </Link>
                ) : (
                    <Link to="/auth/login" className={`flex items-center text-white text-lg mr-8 font-bold ${Style.link} ${isActive('/auth/login') ? Style.linkActive : ''}`}>
                        <FaSignInAlt className="mr-1" />
                        Login
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header;