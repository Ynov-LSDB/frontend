import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../atoms/Profile/ProfileImage';
import ProfileInformationUser from '../atoms/Profile/ProfileInformationUser';
import { toast } from 'react-toastify';
import {FaPencilAlt} from "react-icons/fa";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

import ProfileLeftEditModal from './ProfileLeftEditModal';

const ProfileLeftCard = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        new toast('Vous êtes déconnecté ✅', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }

    const handleEdit = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const formattedDate = format(parseISO(user.birthDate), 'dd MMMM yyyy', { locale: fr });


    return (
        <div className="flex flex-col bg-white shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/3 pt-20 relative">
            <div className="absolute top-0 right-0 mt-4 mr-4">
                <button onClick={handleEdit} className="text-white bg-gray-800 rounded-full p-2 transition-transform duration-300 hover:scale-110">
                    <FaPencilAlt />
                </button>
            </div>
            <ProfileImage imageURL={user.imageURL} />
            <ProfileInformationUser firstName={user.firstName} lastName={user.lastName} birthDate={formattedDate} />
            <div className="flex justify-center items-center p-4">
                <button onClick={handleLogout} className="bg-red-600 text-white text-xl font-bold rounded-lg px-5 py-2">Déconnexion</button>
            </div>
            <ProfileLeftEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={user}
            />
        </div>
    );
};

ProfileLeftCard.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProfileLeftCard;
