import React from 'react';
import PropTypes from 'prop-types';

const ProfileImage = ({ imageURL }) => {
    return (
        <div className="flex justify-center p-4">
            <img src={imageURL} alt="Profile" className="w-20 h-auto sm:w-auto sm:h-auto lg:max-w-xs"/>
        </div>
    );
};

ProfileImage.propTypes = {
    imageURL: PropTypes.string.isRequired,
};

export default ProfileImage;
