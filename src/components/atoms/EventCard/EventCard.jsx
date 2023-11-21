import React, {useState} from "react";
const EventCard = ({ title, description, image, canJoin = true }) => {
    const [showPopup, setShowPopup] = useState(false);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="shadow-lg text-center p-2.5 bg-gray-800 text-white m-2.5 w-[500px] rounded-md">
            <img src={image} className="w-full h-[300px] object-cover" />
            <h1 className="text-xl font-bold">{title}</h1>
            <p>{description.length > 140 ? description.slice(0, 180) + "..." : description}</p>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center" onClick={toggleShowPopup}>
                    <div className="bg-white p-5 rounded-lg shadow-xl text-center text-black w-1/2">
                        <img src={image} className="w-full h-auto" />
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p>{description}</p>
                    </div>
                </div>
            )}
            <button onClick={toggleShowPopup} className="bg-gray hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                En savoir plus
            </button>
            {canJoin && (
                <button className="bg-gray hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                    Rejoindre l'événement
                </button>
            )}
        </div>
    );
};

export default EventCard;
