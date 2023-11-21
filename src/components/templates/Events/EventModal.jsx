import React from 'react';

const EventModal = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center h-screen">
                    <div className="bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-auto p-6">
                        <div className="mt-3 text-center">
                            <h3 className="text-white text-3xl font-semibold mb-4">Créer un événement</h3>
                            <form className="w-full max-w-2xl mx-auto">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
                                        Titre
                                    </label>
                                    <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                                <div className="flex flex-wrap -mx-4">
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="date" className="block text-white text-sm font-bold mb-2">
                                            Date de l'événement
                                        </label>
                                        <input type="date" id="date" name="date" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="price" className="block text-white text-sm font-bold mb-2">
                                            Prix
                                        </label>
                                        <input type="number" id="price" name="price" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="category" className="block text-white text-sm font-bold mb-2">
                                            Catégorie
                                        </label>
                                        <input type="text" id="category" name="category" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="adresse" className="block text-white text-sm font-bold mb-2">
                                            Adresse
                                        </label>
                                        <input type="text" id="adresse" name="adresse" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 w-full md:w-1/2">
                                        <label htmlFor="is_food_on_site" className="block text-white text-sm font-bold mb-2">
                                            Nourriture sur place
                                        </label>
                                        <input type="checkbox" id="is_food_on_site" name="is_food_on_site" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="registered_limit" className="block text-white text-sm font-bold mb-2">
                                            Limite d'inscription
                                        </label>
                                        <input type="number" id="registered_limit" name="registered_limit" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="team_style" className="block text-white text-sm font-bold mb-2">
                                            Style d'équipe
                                        </label>
                                        <input type="text" id="team_style" name="team_style" className="w-full px-3 py-2 border rounded-lg" />
                                    </div>
                                    <div className="mb-4 px-4 w-full md:w-1/2">
                                        <label htmlFor="status" className="block text-white text-sm font-bold mb-2">
                                            Statut
                                        </label>
                                        <select id="status" name="status" className="w-full px-3 py-2 border rounded-lg">
                                            <option value="pending">En attente</option>
                                            <option value="approved">Approuvé</option>
                                            <option value="rejected">Rejeté</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex">
                                    <button type="button" onClick={onClose} className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Fermer
                                    </button>
                                    <button type="submit" className="w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
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
