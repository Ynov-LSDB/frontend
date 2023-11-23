import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import api from "../../toolkit/api.config";


const ProfileLeftEditModal = ({ isOpen, onClose, user }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        birth_date: '',
        imageURL_profile: "",
    });

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        if (user) {
            setFormData({
                firstname: user.firstName,
                lastname: user.lastName,
                birth_date: user.birthDate,
                //imageURL_profile: user.imageURL,
            });
            return document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        if (file) {
            setFormData({ ...formData, imageURL_profile: file });
        }
    };

    const onUpdate = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // Prepare form data
        const updateFormData = new FormData();
        updateFormData.append('firstname', formData.firstname);
        updateFormData.append('lastname', formData.lastname);
        updateFormData.append('birth_date', formData.birth_date);

        if (formData.imageURL_profile && formData.imageURL_profile instanceof File) {
            updateFormData.append('imageURL_profile', formData.imageURL_profile);
        }

        console.log("updateFormData: ", updateFormData);

        axios(api("post", "user/" + userId, updateFormData, token, "multipart/form-data", "*/*"))
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                    onClose();
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour: ", error);
            });
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6" ref={modalRef}>
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier votre profil</h3>
                    <form onSubmit={onUpdate} className="space-y-4">
                        <input type="text" name="firstname" placeholder="Prénom" value={formData.firstname} onChange={handleInputChange} className="mt-1 border-gray-300 rounded-md shadow-sm" />
                        <input type="text" name="lastname" placeholder="Nom" value={formData.lastname} onChange={handleInputChange} className="mt-1 border-gray-300 rounded-md shadow-sm" />
                        <div className="flex items-center justify-center bg-grey-lighter mt-4">
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                                <span className="mt-2 text-base leading-normal">Sélectionner une photo</span>
                                <input
                                    type='file'
                                    formEncType={'multipart/form-data'}
                                    name='imageURL_profile'
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                />
                            </label>
                        </div>
                        <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} className="mt-1 border-gray-300 rounded-md shadow-sm" />
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
                                Annuler
                            </button>
                            <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileLeftEditModal;
