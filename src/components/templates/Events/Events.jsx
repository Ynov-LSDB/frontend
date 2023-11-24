import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import EventCard from "../../atoms/EventCard/EventCard";
import ConcoursBase from "../../../assets/images/concours-base.jpg";
import EventModal from "./EventModal";
import { toast } from 'react-toastify';

const Events = ({ isLoggedIn, setIsLoggedIn }) => {
    const [events, setEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userisIn, setUserisIn] = useState(true);
    const handleCreateEvent = () => {
        setIsModalOpen(true);
    };

    const handleCloseEvent = () => {
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios(api("get", userisIn ? "user/inEvent" : "user/notInEvent", null, token));

            if (response.data.success) {
                console.log(response.data.data)
                setEvents(response.data.data);
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching Event data:", error);
        }
    };

    useEffect(() => {
        fetchData().then(() => console.log("Events fetched"));
    }, []); // for initial mount

    useEffect(() => {
        fetchData().then(() => console.log("Events fetched"));
    }, [userisIn]);


    useEffect(() => {
        axios(api("get", "events", null))
            .then((response) => {
                const eventsData = response.data.data;
                setEvents(eventsData);
                console.log(eventsData);
            })
            .catch((error) => {
                toast.error(
                    "Erreur lors de la récupération des événements...",
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    }
                );
                console.error("Error fetching events data:", error.response);
            });
    }, []);

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (isLoggedIn) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios(api("get", "user/inEvent", null, token));
                    const userEventsData = response.data.data;
                    setUserEvents(userEventsData);
                    console.log(userEventsData);
                } catch (error) {
                    console.error("Error fetching user events data:", error.response);
                }
            }
        };
        fetchUserEvents();
    }, [isLoggedIn]);

    return (
        <div className="flex flex-col items-center bg-opacity-80 p-5">
            <div className="flex space-x-2">
                {isLoggedIn && (
                    <>
                        <button onClick={handleCreateEvent} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-5 rounded">
                            Créer un événement
                        </button>
                        <button
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded"
                            onClick={() => setUserisIn(!userisIn)}
                        >
                            {userisIn ? "Rejoindre des évenements" : "Mes évenements"}
                        </button>
                        <EventModal onClose={handleCloseEvent} isOpen={isModalOpen} />
                    </>
                )}
            </div>
            <div className="flex flex-wrap justify-around w-4/5 mt-4">
                {events && events.length > 0 ? events.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        description={event.description}
                        image={event.imageURL || ConcoursBase}
                        address={event.adresse}
                        categoryId={event.category ? event.category.name : ""}
                        date={event.date}
                        isFoodOnSite={event.is_food_on_site}
                        price={event.price}
                        teamStyle={event.team_style}
                        canJoin={isLoggedIn}
                        eventId={event.id}
                    />
                )) : <div className="text-center text-3xl text-white p-4">{userisIn ?
                    "Vous n'êtes dans aucun évènement... allé dont en rejoindre un !" :
                    "Vous chômez pas ! vous êtes déjà inscrit sur tout ce qui est possible et imaginable !"}</div>}
            </div>
        </div>
    );
};

export default Events;