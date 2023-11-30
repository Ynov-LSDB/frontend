import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../toolkit/api.config";
import EventCard from "../../atoms/EventCard/EventCard";
import ConcoursBase from "../../../assets/images/concours-base.jpg";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {FaChevronLeft, FaChevronRight, FaMedal} from "react-icons/fa";
import Loader from "../../atoms/Loader";

const Events = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 6,
    });
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState({});
    const [userisIn, setUserisIn] = useState(true);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        axios(api(
            "get",
            (userisIn ? "user/inEvent" : "user/notInEvent") + "?page=" + (pagination.pageIndex + 1) + "&size=" + pagination.pageSize,
            null,
            token
        )).then((response) => {
            setEvents(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [userisIn, pagination]);

    const table = useReactTable({
        data: events.data || [],
        state: {
            pagination
        },
        pageCount: events.last_page,
        manualPagination: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col items-center bg-opacity-80 p-5">
            <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded">
                    Créer un événement
                </button>
                <button
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded"
                    onClick={() => setUserisIn(!userisIn)}
                >
                    {userisIn ? "Rejoindre des évenements" : "Mes évenements"}
                </button>
            </div>
            {loading
                ? (<Loader />)
                :<div className="mt-4">
                    {events.data && events.data.length > 0
                        ?   <div>
                                <div className="flex flex-wrap justify-center mt-4">
                                    {events.data.map((event, index) => (
                                        <EventCard
                                        key={index}
                                        title={event.title}
                                        description={event.description}
                                        image={event.imageURL || ConcoursBase}
                                        adresse={event.adresse}
                                        categoryId={event.category_id}
                                        date={event.date}
                                        isFoodOnSite={event.is_food_on_site}
                                        price={event.price}
                                        teamStyle={event.team_style}
                                        canJoin={!userisIn}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-center mt-4 py-2 ml-auto mr-auto bg-gray-700 w-fit rounded-md">
                                    <button
                                        disabled={!table.getCanPreviousPage()}
                                        onClick={() => table.previousPage()}
                                        variant="contained"
                                        className="text-white"
                                    >
                                        <FaChevronLeft size={28} />
                                    </button>
                                    <span className="text-xl mx-3 text-white text-lg">
                                        {table.getState().pagination.pageIndex + 1} /{' '}
                                        {table.getPageCount()}
                                    </span>
                                    <button
                                        disabled={!table.getCanNextPage()}
                                        onClick={() => table.nextPage()}
                                        color="primary"
                                        variant="contained"
                                        className="text-white"
                                    >
                                        <FaChevronRight size={28} />
                                    </button>
                                </div>
                            </div>
                        : <div className="text-center text-3xl text-white p-4">{userisIn ?
                            "Vous n'êtes dans aucun évènement... allé dont en rejoindre un !" :
                            "Vous chômez pas ! vous êtes déjà inscrit sur tout ce qui est possible et imaginable !"}
                        </div> }
                </div>}
        </div>
    );
};

export default Events;
