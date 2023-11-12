import React, {useState} from "react";
import Style from "./Home.module.css";
import Weather from "../../../toolkit/apiWeather.config"

const Home = () => {

    const nextEvent = {
        "id": 1,
        "title": "Pétanque au bourg !",
        "date": "2023-12-05T20:00:00",
        "price": "25€",
        "category_id": 3,
        "adresse": "Place de la République, Paris",
        "eat": "Pizza et boissons disponibles",
        "registered_limit": "300 personnes",
        "status": "Ouvert",
        "team_style": "Triplette",
        "created_at": "2023-11-01T14:00:00",
        "updated_at": "2023-11-02T12:30:00"
    }

    return (
        <div className="relative min-h-screen">
            <div className="absolute right-0 z-10 max-w-s">
                <Weather />
            </div>

            <div className="pt-40 flex justify-center items-start space-x-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mx-auto">

                {/* Carte de l'événement de gauche */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Prochain événement</h2>
                        <p className="text-lg font-semibold mb-2">{nextEvent.title}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Date :</strong> {new Date(nextEvent.date).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })} à {new Date(nextEvent.date).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}H</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Prix :</strong> {nextEvent.price}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Adresse :</strong> {nextEvent.adresse}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Nourriture :</strong> {nextEvent.eat}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Limitation :</strong> {nextEvent.registered_limit}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Statut :</strong> {nextEvent.status}</p>
                        <p className="text-sm text-gray-600 mb-1"><strong>Style d'équipe :</strong> {nextEvent.team_style}</p>
                        <div className="flex-grow"></div>
                    </div>

                    {/* Carte de droite */}
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
                        <h2 className="text-xl font-bold">Autre événement</h2>
                        {/* Remplissez avec le contenu de l'autre événement ou laissez vide */}
                        <div className="flex-grow"></div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Home;
