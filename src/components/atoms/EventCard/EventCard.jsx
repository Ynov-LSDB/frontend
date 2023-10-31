import React, {useState} from "react";
// Internal imports
import Style from "./EventCard.module.css";

const EventCard = ({ title, contenu, image, alt = title }) => {
    const [showPopup, setShowPopup] = useState(false);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className={Style.card}>
            <img src={image} alt={alt} className={Style.img} />
            <h1>{title}</h1>
            <p>{contenu.length > 206 ? contenu.slice(0, 206) + "..." : contenu}</p>
            {showPopup && (
                <div className={Style.popupOverlay} onClick={toggleShowPopup}>
                    <div className={Style.popupContent}>
                        <img src={image} alt={alt} className={Style.img} />
                        <h1>{title}</h1>
                        <p>{contenu}</p>
                    </div>
                </div>
            )}
            <button onClick={toggleShowPopup}>Afficher +</button>
        </div>
    );
};

export default EventCard;
