import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import EventCard from "../../atoms/EventCard/EventCard";
import ConcoursBase from "../../../assets/images/concours-base.jpg";
import EventModal from "./EventModal";

const Events = ({ isLoggedIn, setIsLoggedIn }) => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateEvent = () => {
        setIsModalOpen(true);
    }

    const handleCloseEvent = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        axios(api('get', 'events', null))
            .then((response) => {
                const eventsData = response.data.data;
                setEvents(eventsData);
                console.log(eventsData);
            })
            .catch((error) => {
                console.error('Error fetching events data:', error.response);
            });
    }, []);

    return (
        <div className="flex flex-col items-center bg-opacity-80 p-5">
            <div className="flex space-x-2">
                {isLoggedIn && (
                    <>
                        <button onClick={handleCreateEvent} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                            Créer un événement
                        </button>
                        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                            Mes événements
                        </button>
                        <EventModal onClose={handleCloseEvent} isOpen={isModalOpen} />
                    </>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-4/5 m-4 justify-center">
                {events && events.length > 0 ? (
                    events.map((event, index) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            description={event.description}
                            image={event.imageURL || ConcoursBase}
                            address={event.adresse}
                            categoryId={event.category ? event.category.name : ''}
                            date={event.date}
                            isFoodOnSite={event.is_food_on_site}
                            price={event.price}
                            teamStyle={event.team_style}
                            canJoin={!isLoggedIn}  
                        />
                    ))
                ) : (
                    <div className="flex justify-center items-center ">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
