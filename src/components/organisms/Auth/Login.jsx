import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };

        axios(api("post", "login", data, null, "multipart/form-data", "*/*"))
            .then((response) => {
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("userId", response.data.data.user.id);
                setIsLoggedIn(true);
                setError(null);
                navigate('/');
                toast('Vous êtes connecté ✅', {
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
                console.error('Error fetching events data:', error.response);
                setIsLoggedIn(false);
                warningAlert();
            });
    };  

    const warningAlert = () => {
        toast.error("Echec de la connexion...", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div className="flex justify-center items-center mt-20">
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
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {isLoggedIn && <p className="text-green-500 mt-4">Vous êtes connecté !</p>}
            </div>
        </div>
    );
};

export default Login;
