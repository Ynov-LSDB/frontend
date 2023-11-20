import React, { useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(""); // format: "YYYY-MM-DD" (ex: "2021-01-01")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            firstname: firstName,
            lastname: lastName,
            birth_date: birthDate,
            email: email,
            password: password,
            confirm_password: confirmPassword,
        };
        console.log(data);
        axios(api("post", "register", data))
        .then((response) => {
            console.log(response.data);
            setSuccess(true);
        })
        .catch((error) => {
            console.error('Error to registration', error.response);
            setSuccess(false);
        });
    };

    return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-8 rounded shadow-md w-1/4 text-center">
            <h1 className="text-white text-3xl font-semibold mb-4">S'inscrire</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Nom
                    </label>
                    <input type="text" id="lastname" className="w-full px-3 py-2 border rounded-lg" value={lastName} onChange={(e)=>
                    {setLastName(e.target.value)}}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Prénom
                    </label>
                    <input type="text" id="firstname" className="w-full px-3 py-2 border rounded-lg" value={firstName} onChange={(e)=>
                    {setFirstName(e.target.value)}}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-white text-sm font-bold mb-2">Date de naissance</label>
                    <input type="date" id="birth_date" name="birth_date" className="w-full px-3 py-2 border rounded-lg" value={birthDate} onChange={(e)=>
                    {setBirthDate(e.target.value)}}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg" value={email} onChange={(e)=>
                    {setEmail(e.target.value)}}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Mot de passe</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg" value={password} onChange={(e)=>
                    {setPassword(e.target.value)}}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Confirmer le mot de
                        passe</label>
                    <input type="password" name="confirm_password" id="confirm_password" className="w-full px-3 py-2 border rounded-lg" value={confirmPassword}
                        onChange={(e)=> {setConfirmPassword(e.target.value)}}/>
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
                        Se connecter
                    </button>
                </div>
            </form>
            {success && <p className="text-green-500 mt-4">Vous êtes inscrit !</p>}
            {!success && <p className="text-red-500 mt-4">Votre compte n'a pas été crée</p>}
        </div>
    </div>
    );
};

export default Register;
