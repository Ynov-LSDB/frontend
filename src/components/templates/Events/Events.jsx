import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import EventCard from "../../atoms/EventCard/EventCard";
import ConcoursBase from "../../../assets/images/concours-base.jpg";
import EventModal from "./EventModal";

const Events = () => {
    const [events, setEvents] = useState(null);
    const [userisIn, setUserisIn] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleCreateEvent = () => {
        setIsModalOpen(true);
    }

    const handleCloseEvent = () => {
        setIsModalOpen(false);
    }

    const events = [
        {
            title: "yeah",
            contenu: "Grosse compétition de fameux bouliste ce mardi en 8 sortez vos boules il va pleuvoir du plomb",
            image: "https://i.ytimg.com/vi/LRyTWCzqEDk/maxresdefault.jpg"
        },
        {
            title: "chraik",
            contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu tristique felis, in auctor elit. Duis rhoncus ornare sodales. Vestibulum tincidunt nulla quis felis lobortis volutpat. Vivamus a ex vel odio pretium aliquet. Sed posuere luctus elit id egestas. Morbi sit amet ligula mi. Etiam tempor fringilla nunc, sit amet ultricies nulla tincidunt quis. Vestibulum id orci lacus. Nam blandit tincidunt felis et pretium. Nulla facilisi.",
            image: "https://www.ecranlarge.com/media/cache/1600x1200/uploads/articles/001/375/032/shrek-classement-shrek-et-chat-potte-1471970-large.png"
        },
        {
            title: "apero salle des fete",
            contenu: "pointeur et tireur, tout le monde est le bienvenue pour un apero salle des fete",
            image: "https://image.jimcdn.com/app/cms/image/transf/none/path/s47054cd4448bf150/image/id772b6c61b145509/version/1448724461/image.jpg"
        }
    ];

    return (
        <div className="flex flex-col items-center bg-opacity-80 p-5">
            <div className="flex space-x-2">
                <button onClick={handleCreateEvent} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded">
                    Créer un événement
                </button>
                <button
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded"
                    onClick={() => setUserisIn(!userisIn)}
                >
                    {userisIn ? "Rejoindre des évenements" : "Mes évenements"}
                </button>
            </div>
            <EventModal onClose={handleCloseEvent} isOpen={isModalOpen} />
                <div className="flex flex-wrap justify-around w-4/5 mt-4">
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            contenu={event.contenu}
                            image={event.image}
                        />
                    ))}
                </div>
            <div className="flex flex-wrap justify-around w-4/5 mt-4">
                {events && events.length > 0 ? events.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        description={event.description}
                        image={event.imageURL || ConcoursBase}
                        adresse={event.adresse}
                        categoryId={event.category_id}
                        date={event.date}
                        isFoodOnSite={event.is_food_on_site}
                        price={event.price}
                        teamStyle={event.team_style}
                        canJoin={!userisIn}
                    />
                )): <div className="text-center text-3xl text-white p-4">{userisIn ?
                    "Vous n'êtes dans aucun évènement... allé dont en rejoindre un !" :
                    "Vous chômez pas ! vous êtes déjà inscrit sur tout ce qui est possible et imaginable !"}</div> }
            </div>
        </div>
    );
};

export default Events;
