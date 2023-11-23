import React, { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import axios from 'axios';
import api from "../../../toolkit/api.config";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Atoms
import Loader from "../../atoms/Loader";
  
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('rank', {
        header: 'Rang',
    }),
    columnHelper.accessor('name', {
        header: 'Nom',
    }),
    columnHelper.accessor('score', {
        header: 'Score',
    }),
];

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
        columns,
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
                :<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 w-3/4">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-10 border-b-4 text-center">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr className="px-6 py-3">
                                    {headerGroup.headers.map((header) => (
                                        <th>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            { table.getRowModel().rows.map((row) => (
                                <tr className="border-b border-gray-200">
                                    {row.getVisibleCells().map((cell) => (
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        <div className="w-full text-xs text-gray-700 uppercase bg-gray-50 border-t-4 h-14 flex justify-center items-center content-center">
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
                </div>
            }
        </div> 
    );
};

export default Ranking;