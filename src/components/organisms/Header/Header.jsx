import React from "react";

//Atoms
import Button from "../../atoms/Button/Button";

//Internal imports
import Style from "./Header.module.css";

const Header = ({menu}) => {
    return (
        <header className={Style.header}>
            <div className={Style.title}>Le Site De Boules</div>
            {menu.map((elt, index) => 
            <Button buttonTitle={elt.label} action={elt.action} icon={elt.icon} key={index} />
            )}
        </header>
    )
}

export default Header;