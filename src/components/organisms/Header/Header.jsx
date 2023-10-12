import React from "react";

//Atoms
import Button from "../../atoms/Button/Button";

//Internal imports
import Style from "./Header.module.css";

//Logo
import Logo from "../../../assets/images/logo.png";

const Header = ({menu}) => {
    return (
        <header className={Style.header}>
            <img src={Logo} alt="Logo" className={Style.logo} />
            {menu.map((elt, index) =>
            <Button buttonTitle={elt.label} action={elt.action} icon={elt.icon} key={index} />
            )}
        </header>
    )
}

export default Header;