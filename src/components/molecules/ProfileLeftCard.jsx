import React from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../atoms/Profile/ProfileImage';
import ProfileInformationUser from '../atoms/Profile/ProfileInformationUser';

const ProfileLeftCard = ({ user }) => {
    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/3">
            <ProfileImage imageURL={user.imageURL} />
            <ProfileInformationUser firstName={user.firstName} lastName={user.lastName} birthDate={user.birthDate} />
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
