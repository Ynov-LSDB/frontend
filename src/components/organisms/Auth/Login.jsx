import React, { useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };

        axios(api("post", "login", data))
            .then((response) => {
                console.log(response);
                setSuccess(true);
            })
            .catch((error) => {
                console.error('Error fetching events data:', error.response);
                setSuccess(false);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-1/4 text-center">
                <h1 className="text-white text-3xl font-semibold mb-4">Se connecter</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg">Se connecter</button>
                    <div className="text-white mt-4 ">
                        <p>Mot de passe oublié ? <Link to='/auth/resetpassword' className="font-bold underline">Rénitialiser</Link></p>
                    </div>
                    <div className="text-white mt-4">
                        <p>Si vous n'avez pas de compte ? <Link to="/auth/register" className="font-bold underline">S'inscrire</Link></p>
                    </div>
                </form>
                {success && <p className="text-green-500 mt-4">Vous êtes connecté !</p>}
                {!success && <p className="text-red-500 mt-4">Identifiant incorrect</p>}
            </div>
        </div>
    );
};

export default Login;
