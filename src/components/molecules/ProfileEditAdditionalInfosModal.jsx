import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from "../../toolkit/api.config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaTimes} from "react-icons/fa";

const EditAdditionalInfoModal = ({ isOpen, onClose, onSave, userInfos }) => {
    const [users, setUsers] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [searchTermUsers, setSearchTermUsers] = useState('');
    const [searchTermDrinks, setSearchTermDrinks] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [editingMode, setEditingMode] = useState('');
    const modalRef = useRef();

    // Déclarer doubletteId et drinkId ici
    let doubletteId = 0;
    let drinkId = 0;

    const inactiveButtonStyle = "bg-white text-gray-800 hover:bg-gray-200";
    const activeButtonStyle = "bg-gray-800 text-white hover:bg-gray-700";

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };


    const handleEditDoublette = () => {
        setEditingMode('doublette');
        // Réinitialiser la sélection de boisson
        setSelectedDrink(null);
    };

    const handleEditBoisson = () => {
        setEditingMode('boisson');
        // Réinitialiser la sélection de doublette
        setSelectedUser(null);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);

            const doubletteInitValue = userInfos.doublette && userInfos.doublette !== "Non renseigné" ? userInfos.doublette : '';
            setSearchTermUsers(doubletteInitValue);

            const token = localStorage.getItem("token");
            axios(api("get", "users", null, token, "multipart/form-data", "*/*"))
                .then((response) => {
                    if (response.data.success) {
                        setUsers(response.data.data);
                    } else {
                        console.error("Failed to fetch users:", response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });

            const boissonInitValue = userInfos.boissonPreferee && userInfos.boissonPreferee !== "Non renseigné" ? userInfos.boissonPreferee : '';
            setSearchTermDrinks(boissonInitValue);

            axios(api("get", "drinks", null, token, "multipart/form-data", "*/*"))
                .then((response) => {
                    if (response.data.success) {
                        setDrinks(response.data.data);
                    } else {
                        console.error("Failed to fetch users:", response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching drinks:", error);
                });
            return document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleSearchUserChange = (event) => {
        setSearchTermUsers(event.target.value);
    };
    const handleSearchDrinkChange = (event) => {
        setSearchTermDrinks(event.target.value);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setSearchTermUsers(user.firstname + ' ' + user.lastname);
    };
    const handleDrinkSelect = (drink) => {
        setSelectedDrink(drink);
        setSearchTermDrinks(drink.title);
    };

    const handleSave = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("token");

        if (editingMode === 'doublette') {
            // Permettre une sauvegarde avec un champ vide pour la doublette
            if (!searchTermUsers.trim()) {
                let doubletteId = 0;

                const data = new FormData();
                data.append('doublette_user_id', doubletteId);
                console.log("doubletteId : " + doubletteId);
                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then(handleResponse)
                    .catch(handleError);
            } else if (selectedUser && searchTermUsers === `${selectedUser.firstname} ${selectedUser.lastname}`) {
                let doubletteId = String(selectedUser.id);

                const data = new FormData();
                data.append('doublette_user_id', doubletteId);
                console.log("doubletteId : " + doubletteId);
                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then(handleResponse)
                    .catch(handleError);
            } else {
                // Afficher un message d'erreur si la sélection ne correspond pas
                toast.error("Sélection de doublette invalide. Veuillez choisir un utilisateur de la liste ou laisser le champ vide pour la suppression.", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            }
        }

        if (editingMode === 'boisson') {
            // Permettre une sauvegarde avec un champ vide
            if (!searchTermDrinks.trim()) {
                let drinkId = 0;

                const data = new FormData();
                data.append('fav_drink_id', drinkId);
                console.log("drinkId :" + drinkId);
                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then(handleResponse)
                    .catch(handleError);
            } else if (selectedDrink && searchTermDrinks === selectedDrink.title) {
                let drinkId = String(selectedDrink.id);

                const data = new FormData();
                data.append('fav_drink_id', drinkId);
                console.log("drinkId :" + drinkId);
                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then(handleResponse)
                    .catch(handleError);
            } else {
                // Afficher un message d'erreur si la sélection ne correspond pas
                toast.error("Sélection de boisson invalide. Veuillez choisir une boisson de la liste ou laisser le champ vide pour la suppression.", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            }
        }
    };

    const handleResponse = (response) => {
        if (response.data.success) {
            onSave(editingMode === 'doublette' ? selectedUser.id : selectedDrink.id);
            window.location.reload();
            onClose();
        } else {
            console.error('Failed to update:', response.data.message);
        }
    };

    const handleError = (error) => {
        console.error("Error during update:", error);

        // Vérifier si doubletteId ou drinkId est égal à 0 lorsqu'une erreur se produit
        const isErrorDueToZeroId = (editingMode === 'doublette' && doubletteId === 0) ||
            (editingMode === 'boisson' && drinkId === 0);

        if (isErrorDueToZeroId) {
            window.location.reload();
        } else {
            toast.error("Une erreur s'est produite lors de la mise à jour.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
        onClose();
    };

    const currentUserId = localStorage.getItem('userId');
    const currentDrinkId = userInfos.boissonPrefereeId ? userInfos.boissonPrefereeId : null;

    const filteredUsers = searchTermUsers
        ? users
            .filter(user =>
                (user.firstname.toLowerCase().includes(searchTermUsers.toLowerCase()) ||
                    user.lastname.toLowerCase().includes(searchTermUsers.toLowerCase())) &&
                user.id.toString() !== currentUserId
            )
            .slice(0, 5)
        : [];

    const filteredDrinks = searchTermDrinks
        ? drinks
            .filter(drink =>
                drink.title.toLowerCase().includes(searchTermDrinks.toLowerCase()) &&
                drink.id !== currentDrinkId
            )
            .slice(0, 5)
        : [];

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto p-6" ref={modalRef}>
                <div className="mt-3 text-center">
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleEditDoublette}
                            className={`mx-2 font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${editingMode === 'doublette' ? activeButtonStyle : inactiveButtonStyle}`}
                        >
                            Doublette
                        </button>
                        <button
                            onClick={handleEditBoisson}
                            className={`mx-2 font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${editingMode === 'boisson' ? activeButtonStyle : inactiveButtonStyle}`}
                        >
                            Boisson
                        </button>
                    </div>

                    {editingMode === 'doublette' && (
                        <>
                            <input
                                type="text"
                                placeholder="Rechercher par prénom ou nom"
                                value={searchTermUsers}
                                onChange={handleSearchUserChange}
                                className="mt-1 border-gray-300 rounded-md shadow-sm w-full"
                            />
                            <div className="mt-2">
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {user.firstname} {user.lastname}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={onClose}
                                    className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-gray-800 border border-gray-800 text-white hover:bg-gray-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </>
                    )}
                    {editingMode === 'boisson' && (
                        <>
                            <input
                                type="text"
                                placeholder="Rechercher par le nom d'une boisson"
                                value={searchTermDrinks}
                                onChange={handleSearchDrinkChange}
                                className="mt-1 border-gray-300 rounded-md shadow-sm w-full"
                            />
                            <div className="mt-2">
                                {filteredDrinks.map((drink) => (
                                    <div
                                        key={drink.id}
                                        onClick={() => handleDrinkSelect(drink)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {drink.title}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={onClose}
                                    className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-gray-800 border border-gray-800 text-white hover:bg-gray-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

};

EditAdditionalInfoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditAdditionalInfoModal;
