import React, { useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import { toast } from 'react-toastify';

const EventCard = ({ title, description, image, address, categoryId, date, isFoodOnSite, price, teamStyle, canJoin = true, eventId }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [joinedEvent, setJoinedEvent] = useState(false); // Nouvel état pour indiquer si l'utilisateur a rejoint l'événement
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    const token = localStorage.getItem("token");

    const toggleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    const handleJoinEvent = async () => {
        try {
            const response = await axios(api("get", `user/joinEvent/${eventId}`, null, token));
            console.log(response.data);
            setJoinedEvent(true);
            toast("Vous avez rejoint l'événement ✅", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
            )
        } catch (error) {
            console.error("Error joining event:", error.response);
        }
    };

    const handleLeaveEvent = async () =>
    {
        try {
            const response = await axios(api("get", `user/leaveEvent/${eventId}`, null, token));
            console.log(response.data);
            setJoinedEvent(false);
            toast("Vous avez quitté l'événement ❌", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
            )
        } catch (error) {
            console.error("Error leaving event:", error.response);
        }
    }
    return (
        <div className="shadow-lg text-center p-2.5 bg-gray-800 text-white m-2.5 w-[500px] rounded-md">
            <img src={image} className="w-full h-[300px] object-cover rounded-t-md" />
            <h1 className="text-xl font-bold mt-4">{title}</h1>
            <p className="mb-4">{(description ?? "").length > 140 ? description.slice(0, 180) + "..." : description}</p>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center" onClick={toggleShowPopup}>
                    <div className="popup-container bg-gray-800 p-5 rounded-lg shadow-xl text-left flex max-w-[80%]">
                        <img src={image} className="w-1/2 h-auto rounded-l-md" />
                        <div className="w-1/2 p-4 flex flex-col">
                            <h1 className="text-xl font-bold mb-2">{title}</h1>
                            <p className="mb-2">{description}</p>
                            <p><strong>Adresse :</strong> {address}</p>
                            <p><strong>Catégorie :</strong> {categoryId}</p>
                            <p><strong>Date :</strong> {formattedDate}</p>
                            <p><strong>Nourriture sur place :</strong> {isFoodOnSite ? 'Ramène ton paté car il y en aura pas' : 'Tout est sur place pas besoin de faire à manger'}</p>
                            <p><strong>Prix :</strong> {price}€</p>
                            <p><strong>Équipe :</strong> {teamStyle}</p>
                            {canJoin && !joinedEvent && (
                                <button onClick={handleJoinEvent} className="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-3 px-5 rounded self-center">
                                    Rejoindre l'événement
                                </button>
                            )}
                            {joinedEvent && (
                                <button onClick={handleLeaveEvent} className="bg-red-500 hover:bg-red-700 text-white text-center font-bold py-3 px-5 rounded self-center">
                                    Quitter l'événement
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <button onClick={toggleShowPopup} className="bg-gray hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                En savoir plus
            </button>
        </div>
    );
};

export default EventCard;
