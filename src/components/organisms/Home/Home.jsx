import React, {useEffect, useState} from "react";
import Style from "./Home.module.css";
import Weather from "../../../toolkit/apiWeather.config"
import axios from 'axios';
import api from "../../../toolkit/api.config";
const Home = () => {
    const [isCold, setIsCold] = useState(false);
    const [isHot, setIsHot] = useState(false);
    const [events, setEvents] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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

    useEffect(() => {
        axios(api("get", "events"))
        .then(response => {
            console.log(response.data);
            setEvents(response.data);
            setIsLoaded(true);
        })
        .catch(error => {
            console.error('Error fetching events data:', error);
            setIsLoaded(true);
        });
    }, []);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // const titleEvent = events.data[0].title;
    const titleEvent = "test";
    return (
        <div className={Style.home}>
            <div className={Style.weatherCard}>
                <div className={Style.weatherTitle}>Point météo jeune !
                    <Weather />
                </div>
            </div>
            <div className={Style.content}>
                <div className={Style.leftCard}>
                    <h2> Prochain évènement mon Sacoche ! </h2>
                    <p className={Style.eventTitle}><strong>{titleEvent}</strong></p>
                    <div className={Style.eventInfo}>
                        <p className={Style.eventDate}><strong>Date :</strong> {new Date(nextEvent.date).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(nextEvent.date).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}H</p>
                        <p className={Style.eventPrice}><strong>Prix :</strong> {nextEvent.price}</p>
                        <p className={Style.eventAddress}><strong>Adresse :</strong> {nextEvent.adresse}</p>
                        <p className={Style.eventEat}><strong>Nourriture :</strong> {nextEvent.eat}</p>
                        <p className={Style.eventLimit}><strong>Limitation :</strong> {nextEvent.registered_limit}</p>
                        <p className={Style.eventStatus}><strong>Statut :</strong> {nextEvent.status}</p>
                        <p className={Style.eventTeam}><strong>Style d'équipe :</strong> {nextEvent.team_style}</p>
                    </div>
                </div>
                <div className={Style.rightCard}>
                    <div className={Style.rightCardTitle}>Title event ?</div>
                    <div className={Style.rightCardContent}>Contenu</div>
                </div>
            </div>
        </div>
    )
}



export default Home;
