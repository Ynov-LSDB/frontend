import React, { useState } from "react";
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';

// Atoms
import Button from "../../atoms/Button/Button";

// Logo
import Logo from "../../../assets/images/logo.png";

import Style from "./Header.module.css";

const Header = ({ menu, activePage, setActivePage }) => {
    // State to handle the visibility of the burger menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to handle menu item click
    const handleMenuItemClick = (label) => {
        setActivePage(label);
        setIsMenuOpen(false);
    };

    return (
        <header className={`bg-gray-800 h-16 flex items-center p-2 relative ${Style.header}`}>
            <img src={Logo} alt="Logo" className={Style.logo} />

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-center">
                {menu.map((elt, index) => (
                    <Button
                        buttonTitle={elt.label}
                        action={() => handleMenuItemClick(elt.label)}
                        icon={elt.icon}
                        activePage={activePage}
                        key={index}
                    />
                ))}
            </div>

            {/* Profile Button */}
            <div className="hidden md:block mr-5">
                <Button
                    buttonTitle="Profile"
                    action={() => handleMenuItemClick("Profile")}
                    icon={<FaUser />}
                    activePage={activePage}
                    key="profile"
                />
            </div>

            {/* Burger Menu Icon */}
            <div className="md:hidden ml-5">
                <button onClick={toggleMenu} className={`text-white ${Style.menuButton}`}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu: Shown/Hidden based on state */}
            {isMenuOpen && (
                <div className={`absolute top-full right-0 w-full bg-gray-800 flex flex-col items-center py-3 z-1${Style.mobileMenu}`}>
                    {menu.map((elt, index) => (
                        <Button
                            buttonTitle={elt.label}
                            action={() => handleMenuItemClick(elt.label)}
                            icon={elt.icon}
                            activePage={activePage}
                            key={`mobile-${index}`}
                        />
                    ))}
                    <Button
                        buttonTitle="Profile"
                        action={() => handleMenuItemClick("Profile")}
                        icon={<FaUser />}
                        activePage={activePage}
                        key="mobile-profile"
                    />
                </div>
            )}

        </header>
    );
};

export default Header;
