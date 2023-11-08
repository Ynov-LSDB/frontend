import React from "react";
import PropTypes from "prop-types";

const ProfilePetanqueInfos = ({ classement, doublette, triplette, boissonPreferee }) => {
    return (
        <div className={"flex-1 m-auto sm:ml-10"}>
            <div className="mb-1"><strong>Classement:</strong> {classement}</div>
            <div className="mb-1"><strong>Doublette:</strong> {doublette}</div>
            <div className="mb-1"><strong>Triplette:</strong> {triplette}</div>
            <div><strong>Boisson Préférée:</strong> {boissonPreferee}</div>
        </div>
    );
};

ProfilePetanqueInfos.propTypes = {
    classement: PropTypes.string.isRequired,
    doublette: PropTypes.string.isRequired,
    triplette: PropTypes.string.isRequired,
    boissonPreferee: PropTypes.string.isRequired,
};

export default ProfilePetanqueInfos;