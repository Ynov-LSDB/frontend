import React, { useEffect, useState } from "react";
import {
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import axios from 'axios';
import api from "../../../toolkit/api.config";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Atoms
import Loader from "../../atoms/Loader";

const Ranking = () => {

    const [pagination, setPagination] = useState({
      pageIndex: 0, // page index matlab = page number
      pageSize: 25, // page size matlab = limit
    });
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        setLoading(true);
        console.log(api("get", "users/ranking?page=" + (pagination.pageIndex + 1) + "&size=" + pagination.pageSize))
        axios(api("get", "users/ranking?page=" + (pagination.pageIndex + 1) + "&size=" + pagination.pageSize
        )).then((response) => {
            let data = response.data.data;
            data.data.forEach((_, index) => {
                let user = data.data[index];
                user.rank = index + 1 + (pagination.pageIndex * pagination.pageSize);
                user.name = user.firstname + " " + user.lastname;
            });
            setData(data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        });
    }, [pagination]);

    const table = useReactTable({
        data: data.data || [],
        state: {
          pagination,
        },
        pageCount: data.last_page,
        manualPagination: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    });
    
    return (
        <div className="flex justify-center">
            {loading 
                ? (<Loader />)
                :<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 w-3/5">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-12 border-b-4 text-center">
                            <tr className="px-6 py-3 text-base">
                                <th> Rang </th>
                                <th> Nom </th>
                                <th> Score </th>
                            </tr>
                        </thead>
                        <tbody>
                            { table.getRowModel().rows.map((row) => (
                                <tr className="border-b border-gray-200">
                                    <th className="font-medium text-gray-900 whitespace-nowrap bg-gray-50 py-2 flex justify-center">
                                        <div className={getRankStyle(row.original.rank)}>
                                            {row.original.rank}
                                        </div>
                                    </th>
                                    <th className="font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                                        {row.original.name}
                                    </th>
                                    <th className="font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                                        {row.original.score}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full text-xs text-gray-700 uppercase bg-gray-50 border-t-4 h-12 flex items-center">
                        <div className="w-1/3"> {' '} </div>
                        <div className="w-1/3 flex justify-center">
                            <button
                                disabled={!table.getCanPreviousPage()}
                                onClick={() => table.previousPage()}
                                color="primary"
                                variant="contained"
                            >
                                <FaChevronLeft size={20} />
                            </button>
                            <span className="text-lg mx-3">
                                {table.getState().pagination.pageIndex + 1} /{' '}
                                {table.getPageCount()}
                            </span>
                            <button
                                disabled={!table.getCanNextPage()}
                                onClick={() => table.nextPage()}
                                color="primary"
                                variant="contained"
                            >
                                <FaChevronRight size={20} />
                            </button>
                        </div>
                        <span className="w-1/3 flex justify-end pr-5 items-center">
                            Aller à la page :
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}
                                className="border p-1 rounded w-10 ml-1"
                            />
                        </span>
                    </div>
                </div>
            }
        </div> 
    );
};

function getRankStyle(rank) {
    switch (rank) {
        case 1:
            return "bg-yellow-400 rounded-full w-6 h-6";
        case 2:
            return "bg-gray-400 rounded-full w-6 h-6";
        case 3:
            return "bg-yellow-600 rounded-full w-6 h-6";
        default:
            return "";
    }
}

export default Ranking;