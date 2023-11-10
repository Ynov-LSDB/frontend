import React, { useState } from 'react';
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Style from './Header.module.css';
import Logo from '../../../assets/images/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`bg-gray-800 h-16 flex items-center p-2 relative ${Style.header}`}>
            <Link to="/">
                <img src={Logo} alt="Logo" className={Style.logo} />
            </Link>

            <div className="hidden md:flex flex-1 justify-center justify-around">
                <Link to="/profile" className={Style.menuLink}>
                    Profile
                </Link>
                <Link to="/events" className={Style.menuLink}>
                    Events
                </Link>
            </div>

            <div className="hidden md:block mr-5">
                <Link to="/userProfile" className={Style.menuLink}>
                    Profile
                </Link>
            </div>

            <div className="md:hidden ml-5">
                <button onClick={toggleMenu} className={`text-white ${Style.menuButton}`}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className={`absolute top-full right-0 w-full bg-gray-800 flex flex-col items-center py-3 z-1${Style.mobileMenu}`}>
                    <Link to="/" className={Style.menuLink}>
                        Home
                    </Link>
                    <Link to="/userProfile" className={Style.menuLink}>
                        Profile
                    </Link>
                    <Link to="/events" className={Style.menuLink}>
                        Events
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
