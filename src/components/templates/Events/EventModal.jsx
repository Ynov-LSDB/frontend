import React, { useEffect, useState } from 'react';
import axios from "axios";
import api from "../../../toolkit/api.config";
import { toast } from 'react-toastify';

const EventModal = ({ isOpen, onClose }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [category_id, setCategory_id] = useState("");
    const [adresse, setAdresse] = useState("");
    const [is_food_on_site, setIs_food_on_site] = useState(false);
    const [registered_limit, setRegistered_limit] = useState("");
    const [team_style, setTeam_style] = useState("");
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios(api("get", "categories", null))
            .then((response) => {
                const categoriesData = response.data.data;
                setCategories(categoriesData);
            })
            .catch((error) => {
                console.error('Error fetching categories data:', error.response);
            });
    }, []);

    const handleSubmitCreateEvent = (e) => {
        e.preventDefault();
        onClose();

    const dataEvent = {
        title: title,
        description: description,
        date: date,
        price: price,
        category_id: category_id,
        adresse: adresse,
        is_food_on_site: is_food_on_site,
        registered_limit: registered_limit,
        team_style: team_style
    }

    console.log(dataEvent);
    axios(api("post", "event", dataEvent, token))
        .then((response) => {
            console.log(response);
            toast('Votre événement a bien été crée ✅', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        .catch((error) => {
            console.error('Error create event data:', error.response);
            toast('Erreur lors de la création de votre événement...', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        });
    }


    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setIs_food_on_site(isChecked);
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center">
                    <div className="bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-auto p-6">
                        <div className="mt-3 text-center">
                            <h3 className="text-white text-3xl font-semibold mb-4">Créer un événement</h3>
                            <form className="w-full max-w-2xl mx-auto">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
                                        Titre
                                    </label>
                                    <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-lg" value={title} onChange={(e) => { setTitle(e.target.value) }}/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
                                        Description
                                    </label>
                                    <input type="textarea" id="description" name="description" className="w-full px-3 py-2 border rounded-lg" value={description} onChange={(e) => { setDescription(e.target.value) }}/>
                                </div>
                                <div className="flex flex-wrap -mx-4">
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="date" className="block text-white text-sm font-bold mb-2">
                                            Date de l'événement
                                        </label>
                                        <input type="date" id="date" name="date" className="w-full px-3 py-2 border rounded-lg" value={date} onChange={(e) => { setDate(e.target.value) }}/>
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="price" className="block text-white text-sm font-bold mb-2">
                                            Prix
                                        </label>
                                        <input type="number" id="price" name="price" className="w-full px-3 py-2 border rounded-lg" value={price} onChange={(e) => { setPrice(e.target.value) }}/>
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="category_id" className="block text-white text-sm font-bold mb-2">
                                            Catégorie
                                        </label>
                                        <select
                                        id="category_id"
                                        name="category_id"
                                        className="w-full px-3 py-2 border rounded-lg"
                                        value={category_id}
                                        onChange={(e) => {
                                            setCategory_id(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled>
                                            Choisissez une catégorie
                                        </option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="adresse" className="block text-white text-sm font-bold mb-2">
                                            Adresse
                                        </label>
                                        <input type="text" id="adresse" name="adresse" className="w-full px-3 py-2 border rounded-lg" value={adresse} onChange={(e) => { setAdresse(e.target.value) }}/>
                                    </div>
                                    <div className="mb-4 w-full md:w-1/2">
                                        <label htmlFor="is_food_on_site" className="block text-white text-sm font-bold mb-2">
                                            Nourriture sur place
                                        </label>
                                        <input type="checkbox" id="is_food_on_site" name="is_food_on_site" value={is_food_on_site}  onChange={handleChange} />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="registered_limit" className="block text-white text-sm font-bold mb-2">
                                            Limite d'inscription
                                        </label>
                                        <input type="number" id="registered_limit" name="registered_limit" className="w-full px-3 py-2 border rounded-lg" value={registered_limit} onChange={(e) => { setRegistered_limit(e.target.value) }}/>
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="team_style" className="block text-white text-sm font-bold mb-2">
                                            Style d'équipe
                                        </label>
                                        <select
                                            id="team_style"
                                            name="team_style"
                                            className="w-full px-3 py-2 border rounded-lg"
                                            value={team_style}
                                            onChange={(e) => {
                                                setTeam_style(e.target.value);
                                            }}
                                        >
                                            <option value="" disabled>
                                                Choisissez un style d'équipe
                                            </option>
                                            <option value="TêteTête">Tête tête</option>
                                            <option value="Doublette">Doublette</option>
                                            <option value="Triplette">Triplette</option>
                                            <option value="Quadrette">Quadrette</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex">
                                    <button type="button" onClick={onClose} className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Fermer
                                    </button>
                                    <button type="submit" onClick={handleSubmitCreateEvent} className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Confirmer l'événement
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventModal;
