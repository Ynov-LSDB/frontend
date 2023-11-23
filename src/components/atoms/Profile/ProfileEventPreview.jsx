import React from "react";
import PropTypes from "prop-types";

const ProfileEventPreview = ({ imageURL, title }) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            {imageURL === '' ? (
                <div className="flex flex-col justify-center items-center">
                    <p className="text-lg mb-3">Pas d'évènement prévu.</p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Rejoindre un évènement
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold mb-3 pt-10 sm:pt-0">{title}</h2>
                    <img src={imageURL} alt="Event" className="max-w-full h-80 rounded-lg"/>
                </>
            )}
        </div>
    );
};

ProfileEventPreview.propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default ProfileEventPreview;
