import React from "react";

//Internal imports
import Style from "./Button.module.css";

const Button = ({buttonTitle, icon, action}) => {
    return (
        <div className={Style.button} onClick={action}>{icon} {buttonTitle} </div>
    );
}

export default Button;