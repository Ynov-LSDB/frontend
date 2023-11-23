
import React, {useState} from 'react';

import UserInfo from '../atoms/Profile/ProfilePetanqueInfos';
import EventPreview from '../atoms/Profile/ProfileEventPreview';
import Card from '../atoms/Profile/ProfileCards';
import {FaPencilAlt} from "react-icons/fa";
import EditFavBoulesModal from "./ProfileEditFavBoulesModal";
import EditAdditionalInfoModal from "./ProfileEditAdditionalInfosModal";

const ProfileRightCards = ({ userInfos }) => {
    const [isEditFavBoulesModalOpen, setIsEditFavBoulesModalOpen] = useState(false);
    const [isEditAdditionalInfoModalOpen, setIsEditAdditionalInfoModalOpen] = useState(false);
    const handleTopEdit = () => setIsEditFavBoulesModalOpen(true);
    const handleBottomEdit = () => setIsEditAdditionalInfoModalOpen(true);

    return (
        <div className="flex flex-col space-y-4 w-full sm:w-2/3">
            <Card className="relative flex-1">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <button onClick={handleTopEdit} className="text-white bg-gray-800 rounded-full p-2 transition-transform duration-300 hover:scale-110">
                        <FaPencilAlt />
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">{userInfos.nomFavBoules}</h2>
                    <img
                        src={userInfos.imageURL_favBoules}
                        alt="Fav Boules"
                        className="mt-4 object-contain rounded-lg"
                        style={{ maxWidth: '500px', maxHeight: '300px' }}
                    />
                </div>
            </Card>
            <div className="flex flex-col space-y-4 w-full sm:w-2/3">
                <EditFavBoulesModal
                    isOpen={isEditFavBoulesModalOpen}
                    onClose={() => setIsEditFavBoulesModalOpen(false)}
                    userInfos={userInfos}
                    onSave={ (selectedUser) => { console.log(selectedUser, "EditFavBoules"); } }
                />
                <EditAdditionalInfoModal
                    isOpen={isEditAdditionalInfoModalOpen}
                    onClose={() => setIsEditAdditionalInfoModalOpen(false)}
                    userInfos={userInfos}
                    onSave={ (selectedUser) => { console.log(selectedUser, "EditAdditional"); } }
                />
            </div>
            <Card className="relative flex-1 flex flex-col md:flex-row">
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <button onClick={handleBottomEdit} className="text-white bg-gray-800 rounded-full p-2 transition-transform duration-300 hover:scale-110">
                        <FaPencilAlt />
                    </button>
                </div>
                <UserInfo {...userInfos} />
                <EventPreview imageURL={userInfos.imageURL_event} title="Mon prochain évènement" />
            </Card>
        </div>
    );
};

export default ProfileRightCards;
