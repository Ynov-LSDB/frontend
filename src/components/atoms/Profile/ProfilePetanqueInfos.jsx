import React from "react";
import PropTypes from "prop-types";

const ProfilePetanqueInfos = ({ doublette, boissonPreferee }) => {
    return (
        <div className={"flex-1 m-auto sm:ml-10"}>
            <div className="mb-1"><strong>Doublette:</strong> {doublette}</div>
            <div><strong>Boisson Préférée:</strong> {boissonPreferee}</div>
        </div>
    );
};

ProfilePetanqueInfos.propTypes = {
    doublette: PropTypes.string.isRequired,
    boissonPreferee: PropTypes.string.isRequired,
};

export default ProfilePetanqueInfos;
