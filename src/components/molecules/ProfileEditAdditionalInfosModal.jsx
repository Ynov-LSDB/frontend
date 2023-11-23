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

    const activeButtonStyle = "bg-white text-gray-800 hover:bg-gray-200";
    const inactiveButtonStyle = "bg-gray-800 text-white hover:bg-gray-700";

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Ferme la modal si l'utilisateur clique en dehors de la modal
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
            setSearchTermUsers(userInfos.doublette ? userInfos.doublette : '');
            console.log("userInfos", userInfos);
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

            setSearchTermDrinks( userInfos.boissonPreferee ? userInfos.boissonPreferee : '' );
            axios(api("get", "drinks", null, token, "multipart/form-data", "*/*"))
                .then((response) => {
                    if (response.data.success) {
                        setDrinks(response.data.data);
                        console.log("drinks", drinks);
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
        if (editingMode === 'doublette') {
            if (selectedUser && searchTermUsers !== userInfos.doublette) {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem("token");
                const data = new FormData();
                data.append('doublette_user_id', String(selectedUser.id)); // Assurez-vous que c'est une chaîne si votre backend s'attend à une chaîne

                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then((response) => {
                        if (response.data.success) {
                            console.log('Doublette saved successfully');
                            onSave(selectedUser.id);
                            window.location.reload();
                            onClose();
                        } else {
                            console.error('Failed to save doublette:', response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("Error modify doublette:", error);
                    });
            } else if (searchTermUsers === userInfos.doublette){
                onClose();
                toast.error("C'est déjà votre doublette.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                onClose();
                toast.error("Cet(te) utilisateur(trice) n'existe pas.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        if (editingMode === 'boisson') {
            if (selectedDrink && userInfos.boissonPreferee !== selectedDrink.title) {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem("token");
                const data = new FormData();
                data.append('fav_drink_id', String(selectedDrink.id));

                axios(api("post", `user/${userId}`, data, token, "multipart/form-data", {"Content-Type": "multipart/form-data"}))
                    .then((response) => {
                        if (response.data.success) {
                            console.log('Boisson saved successfully');
                            onSave(selectedDrink.id);
                            window.location.reload();
                            onClose();
                        } else {
                            console.error('Failed to save boisson:', response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("Error modify boisson:", error);
                    });
            } else {
                onClose();
                if (userInfos.boissonPreferee === selectedDrink.title) {
                    toast.error("C'est déjà votre boisson préférée.", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error("Cette boisson n'existe pas.", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    };

    const currentUserId = localStorage.getItem('userId');
    const currentDrinkId = userInfos.boissonPrefereeId ? userInfos.boissonPrefereeId : null;

    console.log("currentDrinkId", currentDrinkId);
    console.log("drink.id", drinks.id);

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
                                placeholder="Rechercher par titre"
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
