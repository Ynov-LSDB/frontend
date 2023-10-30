import React from "react";
import {FaUser} from 'react-icons/fa';


//Atoms
import Button from "../../atoms/Button/Button";

//Internal imports
import Style from "./Header.module.css";

//Logo
import Logo from "../../../assets/images/logo.png";

const Header = ({menu, activePage, setActivePage}) => {
    return (
        <header className={Style.header}>
            <img src={Logo} alt="Logo" className={Style.logo} />
            <div className={Style.buttons}>
                {menu.map((elt, index) =>
                    <Button buttonTitle={elt.label} action={elt.action} icon={elt.icon} activePage={activePage} key={index} />
                )}
            </div>
            <div className={Style.profileButton}>
                <Button buttonTitle="Profile" action={() => {setActivePage("Profile")}} icon={<FaUser />} activePage={activePage} key="profile" />
            </div>
            
        </header>
    )
}

export default Header;