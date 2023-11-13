import { Link } from "react-router-dom";
import { FaHome, FaCalendar, FaUser, FaInfo, FaSignInAlt } from 'react-icons/fa';
import Logo from '../../../assets/images/logo.png';
import Style from './Header.module.css';

export default function Header() {
    const userIsLoggedIn = false;
    return (
        <header className={`bg-gray-800 h-16 flex items-center p-2 relative ${Style.header}`}>
            <Link to="/"><img src={Logo} alt="Logo" className={Style.logo} /></Link>
            <ul className="flex-grow flex justify-center space-x-4">
                {/* <Link to="/"><FaHome className="mr-1" /> Home</Link> */}
                <Link to="/events" className="flex items-center text-white text-lg"><FaCalendar className="mr-1" />Events</Link>
                <Link to="/about" className="flex items-center text-white text-lg"><FaInfo className="mr-1" />About</Link>
            </ul>
            <div className="ml-auto">
            {userIsLoggedIn ? (
                    <Link to="/profile" className="flex items-center text-white text-lg">
                        <FaUser className="mr-2" />
                        Profile
                    </Link>
                ) : (
                    <Link to="/auth/login" className="flex items-center text-white text-lg">
                        <FaSignInAlt className="mr-1" />
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}