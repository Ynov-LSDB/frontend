// ProfileInformationUser.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProfileInformationUser = ({ firstName, lastName, birthDate }) => {
    return (
        <div className="text-center py-2">
            <div className="text-xl font-semibold">{`${firstName} ${lastName}`}</div>
            <div className="text-gray-600">{birthDate}</div>
        </div>
    );
};

ProfileInformationUser.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
};

export default ProfileInformationUser;
