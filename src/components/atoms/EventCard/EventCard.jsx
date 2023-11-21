import React, {useState} from "react";
const EventCard = ({ title, description, image, address, categoryId, date, isFoodOnSite, price, teamStyle, canJoin = true }) => {
    const [showPopup, setShowPopup] = useState(false);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="shadow-lg text-center p-2.5 bg-gray-800 text-white m-2.5 w-[500px] rounded-md">
            <img src={image} className="w-full h-[300px] object-cover rounded-t-md" />
            <h1 className="text-xl font-bold mt-4">{title}</h1>
            <p className="mb-4">{description.length > 140 ? description.slice(0, 180) + "..." : description}</p>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center" onClick={toggleShowPopup}>
                    <div className="popup-container bg-gray-800 p-5 rounded-lg shadow-xl text-left flex max-w-[80%]">
                        <img src={image} className="w-1/2 h-auto rounded-l-md" />
                        <div className="w-1/2 p-4">
                            <h1 className="text-xl font-bold mb-2">{title}</h1>
                            <p className="mb-2">{description}</p>
                            <p><strong>Addresse:</strong> {address}</p>
                            <p><strong>Categorie:</strong> {categoryId}</p>
                            <p><strong>Date:</strong> {formattedDate}</p>
                            <p>{isFoodOnSite ? 'Ramène ton paté car il y en aura pas' : 'Tout est sur place pas besoin de faire à manger'}</p>
                            <p><strong>Prix:</strong> {price}€</p>
                            <p><strong>Equipe:</strong> {teamStyle}</p>
                        </div>
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
