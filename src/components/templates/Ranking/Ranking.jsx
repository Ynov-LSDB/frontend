import React, { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Stack,
    Button,
    Typography,
} from '@mui/material';

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
      pageSize: 10, // page size matlab = limit
    });
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        setLoading(true);
        console.log("users/ranking?page=" + (pagination.pageIndex + 1))
        axios(api("get", "users/ranking?page=" + (pagination.pageIndex + 1)
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
        <div>
            {loading 
                ? (<Loader />)
                :<TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell variant="head" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            { table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Stack direction="row" justifyContent={'space-between'} sx={{ p: 3 }}>
                        <Button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            color="primary"
                            variant="contained"
                        >
                            <FaChevronLeft />
                        </Button>
                        <Typography>
                            {table.getState().pagination.pageIndex + 1} /{' '}
                            {table.getPageCount()}
                        </Typography>
                        <Button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            color="primary"
                            variant="contained"
                        >
                            <FaChevronRight />
                        </Button>
                    </Stack>
                </TableContainer>
            }
        </div> 
    );
};

export default Ranking;