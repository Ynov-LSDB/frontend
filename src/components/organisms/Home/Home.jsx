import React from "react";
import backgroundImage from "../../../assets/images/bg.jpeg";
import Style from "./Home.module.css";
import Weather from "../../../toolkit/apiWeather.config"

const Home = () => {
    return (
        <div className={Style.home}>
            <img src={backgroundImage} alt="background" className={Style.backgroundImage} />
            <div className={Style.content}>
                <div className={Style.buttonContainerStyle}>
                    <button className={Style.buttonStyle}>Onglet 1</button>
                    <button className={Style.buttonStyle}>Onglet 2</button>
                    <button className={Style.buttonStyle}>Onglet 3</button>
                </div>
                <div className={Style.leftCard}>
                    <div className={Style.leftCardTitle}>Title event ?</div>
                    <div className={Style.leftCardContent}>Content</div>
                    <Weather />
                </div>
                <div className={Style.rightCard}>
                    <div className={Style.rightCardTitle}>Title event ?</div>
                    <div className={Style.rightCardContent}>Contenu</div>
                </div>
            </div>
        </div>
    )
}

export default Home;
