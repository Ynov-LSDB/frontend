import { Link } from "react-router-dom";
import { FaHome, FaCalendar, FaUser, FaSignInAlt } from 'react-icons/fa';
import Logo from '../../../assets/images/logo.png';
import Style from './Header.module.css';

export default function Header({isLoggedIn, setIsLoggedIn}) {
    return (
        <header className={`bg-gray-800 h-16 flex items-center p-2 relative ${Style.header}`}>
            <img src={Logo} alt="Logo" className={Style.logo} />
            <ul className="flex-grow flex justify-center space-x-4">
                <Link to="/" className="flex items-center text-white text-lg font-bold"><FaHome className="mr-1" /> Home</Link>
                <Link to="/events" className="flex items-center text-white text-lg font-bold"><FaCalendar className="mr-1" />Events</Link>
            </ul>
            <div className="ml-auto">
            {isLoggedIn ? (
                    <Link to="/profile" className="flex items-center text-white text-lg font-bold">
                        <FaUser className="mr-2" />
                        Profile
                    </Link>
                ) : (
                    <Link to="/auth/login" className="flex items-center text-white text-lg font-bold">
                        <FaSignInAlt className="mr-1" />
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}