
import React from 'react';
import PropTypes from 'prop-types';

import UserInfo from '../atoms/Profile/ProfilePetanqueInfos';
import EventPreview from '../atoms/Profile/ProfileEventPreview';
import Card from '../atoms/Profile/ProfileCards';

const ProfileRightCards = ({ userInfos }) => {
    return (
        <div className="flex flex-col space-y-4 w-full sm:w-2/3">
            <Card className="flex-1">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">{userInfos.nomFavBoules}</h2>
                    <img src={userInfos.imageURL_favBoules} alt="Fav Boules" className="mt-4 w-full max-w-md h-auto object-cover rounded-lg"/>
                </div>
            </Card>
            <Card className="flex-1 flex flex-col md:flex-row">
                <UserInfo {...userInfos} />
                <EventPreview imageURL={userInfos.imageURL_event} title="Mon prochain évènement" />
            </Card>
        </div>
    );
};

ProfileRightCards.propTypes = {
    userInfos: PropTypes.shape({
        imageURL_favBoules: PropTypes.string.isRequired,
        nomFavBoules: PropTypes.string.isRequired,
        imageURL_event: PropTypes.string.isRequired,
        classement: PropTypes.string.isRequired,
        doublette: PropTypes.string.isRequired,
        triplette: PropTypes.string.isRequired,
        boissonPreferee: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfileRightCards;
