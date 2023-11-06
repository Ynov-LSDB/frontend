import React from "react";
import PhotoProfile from '../../../assets/images/photoProfileTest.jpg';

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
                {/* Modifiez la classe de largeur ici pour que la carte soit plus petite sur les mobiles et ajustez la taille pour les écrans plus larges */}
                <div className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-1/2 lg:w-1/3">
                    {/* Image container */}
                    <div className="flex justify-center p-4">
                        <img src={user.imageURL} alt="Profile" className="w-20 h-auto sm:w-auto sm:h-auto lg:max-w-xs"/>
                    </div>
                    {/* Text container */}
                    <div className="text-center py-2">
                        <div className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                        <div className="text-gray-600">{user.birthDate}</div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4 w-full sm:w-2/3">
                    {/* Upper right card */}
                    <div className="bg-white shadow rounded-lg p-4 flex-1">
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">{userInfos.nomFavBoules}</h2>
                            <img src={userInfos.imageURL_favBoules} alt="Fav Boules" className="mt-4 w-full max-w-md h-auto object-cover rounded-lg"/>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-4 flex-1 flex flex-col md:flex-row">
                        {/* Left side for user information */}
                        <div className="flex-1 m-auto sm:ml-10">
                            <div className="mb-1"><strong>Classement:</strong> {userInfos.classement}</div>
                            <div className="mb-1"><strong>Doublette:</strong> {userInfos.doublette}</div>
                            <div className="mb-1"><strong>Triplette:</strong> {userInfos.triplette}</div>
                            <div><strong>Boisson Préférée:</strong> {userInfos.boissonPreferee}</div>
                        </div>

                        {/* Right side for event image */}
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <span className="text-lg font-semibold mb-3 pt-10 sm:pt-0">Mon prochain évènement</span>
                            <img src={userInfos.imageURL_event} alt="Event" className="max-w-full h-80 rounded-lg"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
