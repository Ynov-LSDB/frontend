import React from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../atoms/Profile/ProfileImage';
import ProfileInformationUser from '../atoms/Profile/ProfileInformationUser';

const ProfileLeftCard = ({ user }) => {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/3 pt-20">
            <ProfileImage imageURL={user.imageURL} />
            <ProfileInformationUser firstName={user.firstName} lastName={user.lastName} birthDate={user.birthDate} />
            <div className="flex justify-center items-center p-4">
                <button onClick={handleLogout} className="bg-red-600 text-white text-xl font-bold rounded-lg px-5 py-2">Déconnexion</button>
            </div>
        </div>
    );
};

ProfileLeftCard.propTypes = {
    user: PropTypes.shape({
        imageURL: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfileLeftCard;
