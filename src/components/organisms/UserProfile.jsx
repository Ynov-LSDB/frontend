import React, { useState, useEffect } from "react";
import axios from 'axios';
import PhotoProfile from '../../assets/images/profileVierge.webp';
import ImageFavBoules from '../../assets/images/image_fav_boules.png';
import ProfileLeftCard from '../molecules/ProfileLeftCard';
import ProfileRightCards from '../molecules/ProfileRightCards';
import api from "../../toolkit/api.config";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        console.log(userId);

        axios(api("get", "me", null, token))
            .then(response => {
                if (response.data.success) {
                    setUserData(response.data.data);
                    console.log("UserPorfile, response.data.data : ");
                    console.log(response);
                } else {
                    console.error('User not found');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    console.log("userData " + userData)
    if (!userData) {
        return (
            <div className="flex justify-center items-center ">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }


    const userProps = {
        imageURL: userData.imageURL_profile || PhotoProfile,
        firstName: userData.firstname,
        lastName: userData.lastname,
        birthDate: userData.birth_date,
    };

    const userInfosProps = {
        imageURL_favBoules: userData.imageURL_fav_balls || ImageFavBoules,
        nomFavBoules: userData.fav_balls_name || "Mes boules favorites",
        imageURL_event: "",
        classement: userData.rank_id,
        doublette: userData.doublette ? `${userData.doublette.firstname} ${userData.doublette.lastname}` : 'Non renseigné',
        boissonPreferee: userData.drink ?  userData.drink.title : "Non renseigné",
        boissonPrefereeId: userData.drink ?  userData.drink.id : null,
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
