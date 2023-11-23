import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditFavBoulesModal = ({ isOpen, onClose, userInfos, onSave }) => {
    const [nomFavBoules, setNomFavBoules] = useState(userInfos.nomFavBoules);
    const [imageFile, setImageFile] = useState(null);

    const handleSave = () => {
        // Logique pour sauvegarder les modifications
        const dataToSave = {
            nomFavBoules,
            imageFile,
        };
        onSave(dataToSave);
        onClose();
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Modifier vos boules préférées</h3>
                    <input
                        type="text"
                        value={nomFavBoules}
                        onChange={e => setNomFavBoules(e.target.value)}
                        className="mt-1 border-gray-300 rounded-md shadow-sm w-full p-2"
                    />
                    <div className="flex items-center justify-center bg-grey-lighter mt-4">
                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
                            <span className="mt-2 text-base leading-normal">Sélectionner une photo</span>
                            <input
                                type='file'
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditFavBoulesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userInfos: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditFavBoulesModal;
