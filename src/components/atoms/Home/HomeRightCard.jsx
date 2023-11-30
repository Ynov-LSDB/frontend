import React, { useState, useEffect } from "react";
import api from "../../../toolkit/api.config";
import axios from "axios";
import {FaMedal} from "react-icons/fa";

const HomeRightCard = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const params = new URLSearchParams({ size: 3 });

        axios(api("get", `users/ranking?${params.toString()}`, null, token))
            .then((response) => {
                setRanking(response.data.data.data);
                console.log('response', response);
            }).catch((error) => {
            console.log(error);
        });
    }, []);

    const getMedalClass = (index) => {
        switch (index) {
            case 0:
                return 'text-yellow-400';
            case 1:
                return 'text-blue-200';
            case 2:
                return 'text-yellow-700';
            default:
                return '';
        }
    }

    const renderRanking = () => {
        return ranking.map((user, index) => (
            <div key={user.id} className={`flex items-center p-2 mb-4 rounded-lg shadow ${index < 3 ? 'bg-gray-100' : ''}`}>
                <div className={`w-8 h-8 flex justify-center items-center rounded-full text-white ${getMedalClass(index)}`}>
                    <FaMedal size={35}></FaMedal>
                </div>
                <div className="flex-1 ml-4">
                    <div className="text-lg font-semibold text-gray-800">{user.firstname} {user.lastname}</div>
                    <div className="text-sm text-gray-600">Score: {user.score}</div>
                </div>
            </div>
        ));
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">Découvre nos meilleurs boulistes !</h2>
            {renderRanking()}
            <div className="mt-auto text-left">
                <button
                    onClick={() => { window.location.href = "/ranking" }}
                    className="bg-transparent border text-sm text-gray-600 border-gray-600 font-bold mt-4 py-2 px-4 rounded-full hover:bg-gray-200"
                >
                    Voir plus
                </button>
            </div>
        </div>
    );
}

export default HomeRightCard;
