import React, { useState, useEffect } from "react";
import axios from 'axios';
import PhotoProfile from '../../assets/images/profileVierge.webp';
import ImageFavBoules from '../../assets/images/image_fav_boules.png';
import ProfileLeftCard from '../molecules/ProfileLeftCard';
import ProfileRightCards from '../molecules/ProfileRightCards';
import api from "../../toolkit/api.config";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const fetchUserProfile = async () => {
            try {
                const responseUser = await axios(api("get", "me", null, token));
                if (responseUser.data.success) {
                    setUserData(responseUser.data.data);
                } else {
                    console.error('User not found');
                }

                const responseEvent = await axios(api("get", "user/nextEvent", null, token));
                if (responseEvent.data.success) {
                    setEventData(responseEvent.data.data);
                }
            } catch (error) {
                console.error('Error fetching user or event data:', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    // Définition des props pour le composant ProfileLeftCard
    const userProps = {
        imageURL: userData.imageURL_profile || PhotoProfile,
        firstName: userData.firstname,
        lastName: userData.lastname,
        birthDate: userData.birth_date,
    };

    // Définition des props pour le composant ProfileRightCards
    const userInfosProps = {
        imageURL_favBoules: userData.imageURL_fav_balls || ImageFavBoules,
        nomFavBoules: userData.fav_balls_name || "Mes boules favorites",
        classement: userData.rank_id,
        doublette: userData.doublette ? `${userData.doublette.firstname} ${userData.doublette.lastname}` : 'Non renseigné',
        boissonPreferee: userData.drink ? userData.drink.title : "Non renseigné",
        boissonPrefereeId: userData.drink ? userData.drink.id : null,
        nextEventTitle: eventData ? eventData.title : "Aucun évènement à venir",
        nextEventDate: eventData ? eventData.date : null,
        nextEventAddress: eventData ? eventData.adresse : null,
        nextEventDescription: eventData ? eventData.description : null,
    };

    return (
        <div className="flex flex-col">
            <div style={{ height: 'calc(100vh - 4rem)' }} className="flex flex-col sm:flex-row overflow-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <ProfileLeftCard user={userProps} />
                <ProfileRightCards userInfos={userInfosProps} />
            </div>
        </div>
    );
}

export default UserProfile;
