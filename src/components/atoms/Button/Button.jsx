import React from "react";

//Internal imports
import Style from "./Button.module.css";

const Button = ({buttonTitle, icon, action, activePage}) => {
    return (
        <div className={activePage !== buttonTitle ? Style.button : Style.activeButton} onClick={action}>{icon} {buttonTitle} </div>
    );
}

export default Button;