import React from "react";
import PhotoProfile from '../../../assets/images/photoProfileTest.jpg';
import ProfileLeftCard from '../../molecules/ProfileLeftCard';
import ProfileRightCards from '../../molecules/ProfileRightCards';

const Profile = () => {
    const user = {
        imageURL: PhotoProfile,
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000'
    };

    const userInfos = {
        imageURL_favBoules: require("../../../assets/images/favBoules.jpg"),
        nomFavBoules: 'Les bouliches du seigneur',
        imageURL_event: require("../../../assets/images/firstEvent.jpg"),
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '01/01/2000',
        classement: 'Top 10',
        doublette: 'Quentin Saillard',
        triplette: 'Hugo Poizat, Mattéo Dinville',
        boissonPreferee: 'Ricard'
    };

    return (
        <div className="flex flex-col h-screen">
            <div style={{ height: 'calc(100vh - 4rem)' }} className="flex flex-col sm:flex-row overflow-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <ProfileLeftCard user={user} />
                <ProfileRightCards userInfos={userInfos} />
            </div>
        </div>
    );
}

export default Profile;
