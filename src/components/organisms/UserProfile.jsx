import React, { useState, useEffect } from "react";
import axios from 'axios';
import PhotoProfile from '../../assets/images/profileVierge.webp';
import ProfileLeftCard from '../molecules/ProfileLeftCard';
import ProfileRightCards from '../molecules/ProfileRightCards';
import api from "../../toolkit/api.config";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [doubletteData, setDoubletteData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        console.log(userId);

        axios(api("get", "me", null, token))
            .then(response => {
                console.log(response.data.data);
                if (response.data.success) {
                    setUserData(response.data.data);
                } else {
                    console.error('User not found');
                }
            })
            .then(response => {
                if (response && response.data.success) {
                    setDoubletteData(response.data.data);
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
        imageURL: userData.imageURL || PhotoProfile,
        firstName: userData.firstname,
        lastName: userData.lastname,
        birthDate: userData.birth_date,
    };

    const userInfosProps = {
        imageURL_favBoules: userData.imageURL_fav_balls,
        nomFavBoules: userData.fav_balls_name,
        imageURL_event: "",
        classement: userData.rank_id,
        doublette: doubletteData ? `${doubletteData.firstname} ${doubletteData.lastname}` : '',
        boissonPreferee: userData.fav_drink_id,
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
