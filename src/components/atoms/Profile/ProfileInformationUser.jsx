// ProfileInformationUser.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {format, parseISO} from "date-fns";
import {fr} from "date-fns/locale";

const ProfileInformationUser = ({ firstName, lastName, birthDate }) => {
    return (
        <div className="text-center py-2">
            <div className="text-xl font-semibold">{`${firstName} ${lastName}`}</div>
            <div className="text-gray-500 text-md">{birthDate ? format(parseISO(birthDate), "dd MMMM yyyy", { locale: fr }) : ""}</div>
        </div>
    );
};

ProfileInformationUser.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
};

export default ProfileInformationUser;
