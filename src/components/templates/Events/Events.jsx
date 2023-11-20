import React from "react";
import EventCard from "../../atoms/EventCard/EventCard";

const Events = () => {

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
        <div className="flex justify-center items-center bg-opacity-80 py-10">
            <div className="flex flex-wrap justify-around w-4/5">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        contenu={event.contenu}
                        image={event.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Events;