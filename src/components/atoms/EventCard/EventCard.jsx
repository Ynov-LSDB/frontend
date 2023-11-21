import React, {useState} from "react";
const EventCard = ({ title, contenu, image, alt = title }) => {
    const [showPopup, setShowPopup] = useState(false);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="shadow-lg text-center p-2.5 bg-gray-800 text-white m-2.5 w-[500px] rounded-md">
            <img src={image} alt={alt} className="w-full h-[300px] object-cover" />
            <h1 className="text-xl font-bold">{title}</h1>
            <p>{contenu.length > 140 ? contenu.slice(0, 140) + "..." : contenu}</p>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center" onClick={toggleShowPopup}>
                    <div className="bg-white p-5 rounded-lg shadow-xl text-center text-black w-1/2">
                        <img src={image} alt={alt} className="w-full h-auto" />
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p>{contenu}</p>
                    </div>
                </div>
            )}
            <button onClick={toggleShowPopup} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                En savoir plus
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                    Rejoindre un événement
                </button>
        </div>
    );
};

export default EventCard;
