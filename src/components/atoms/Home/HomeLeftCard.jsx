import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGroup, FaLocationDot, FaMoneyBillWave } from "react-icons/fa6";
import { FaCalendarDay } from "react-icons/fa";

const HomeLeftCard = () => {
    const [nextEvent, setEvent] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        setTimeout(2000)
        axios.get('http://localhost:80/api/event/last')
            .then(response => {
                if (response.data.success) {
                    setEvent(response.data.data);
                } else {
                    console.error('Data not found');
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });

        setLoading(false);
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Dernier évènement ajouté</h2>
            {loading ? 
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
                :
                nextEvent !== undefined && nextEvent !== null ? 
                    <div className="text-sm text-gray-600">
                        <p className="text-lg font-semibold mb-2">{nextEvent.title}</p>
                        <p className="mb-1 flex"> <FaCalendarDay className="mx-1" size={20} /> {new Date(nextEvent.date).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })} à {new Date(nextEvent.date).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="mb-1 flex"> <FaLocationDot className="mx-1" size={20} /> {nextEvent.adresse}</p>
                        <p className="mb-1 flex"> <FaMoneyBillWave className="mx-1" size={20} /> {nextEvent.price}€</p>
                        <p className="mb-1 flex"> <FaUserGroup className="mx-1" size={20} /> {nextEvent.registered_limit}</p>
                        <p className="mb-1 flex"> {nextEvent.team_style} </p>
                        <div className="flex-grow"></div>
                        <button className="bg-transparent border border-gray-600 font-bold mt-4 py-2 px-4 rounded-full hover:bg-gray-200">
                            Voir plus
                        </button>
                    </div>
                    :
                    <div>
                        <h2 className="text-xl font-bold mb-4">Aucun évènement n'a été trouvé.</h2>
                    </div>
            }   
        </div>
    );
};



export default HomeLeftCard;