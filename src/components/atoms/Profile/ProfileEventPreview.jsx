import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileEventPreview = ({ title, date, location, desc }) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-4 shadow rounded-lg">
            {title ? (
                <>
                    <div className="text-center">
                        <h1 className={"text-xl pb-10 font-bold"}> Mon prochain évènement </h1>
                        <h2 className="text-lg font-semibold mb-2">{title}</h2>
                        {date && <p className="text-sm text-gray-600 mb-1">{date}</p>}
                        {location && <p className="text-sm text-gray-600">{location}</p>}
                        {desc && <p className="text-sm text-gray-600">{desc}</p>}
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-lg mb-3">Pas d'évènement prévu.</p>
                    <Link to="/events">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Rejoindre un évènement
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

ProfileEventPreview.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
};

export default ProfileEventPreview;
