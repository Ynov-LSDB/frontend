import React from "react";
import Weather from "../../../toolkit/apiWeather.config";

import HomeLeftCard from "../../atoms/Home/HomeLeftCard";
import HomeRightCard from "../../atoms/Home/HomeRightCard";

const Home = () => {

    return (
        <div className="relative">
            <div className="absolute right-0 z-10 max-w-s">
                <Weather />
            </div>

            <div className="pt-40 flex justify-center items-start space-x-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl mx-auto">
                {/* Carte de gauche */}
                    <HomeLeftCard />
                {/* Carte de droite */}
                    <HomeRightCard />
                </div>
            </div>
        </div>
    );

};

export default Home;
