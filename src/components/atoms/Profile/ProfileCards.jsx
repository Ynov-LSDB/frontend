import React from "react";
import PropTypes from "prop-types";

const ProfileCards = ({ children, className }) => {
    return (
        <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};

ProfileCards.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default ProfileCards;
