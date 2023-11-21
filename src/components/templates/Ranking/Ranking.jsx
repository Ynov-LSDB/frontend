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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

import axios from 'axios';
import api from "../../../toolkit/api.config";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Atoms
import Loader from "../../atoms/Loader";

const fakeData = [
    { id: 1, firstname: 'John', lastname: 'Doe', score: 100},
    { id: 2, firstname: 'Jane', lastname: 'Doe', score: 200},
    { id: 3, firstname: 'Alice', lastname: 'Smith', score: 150},
    { id: 4, firstname: 'Bob', lastname: 'Johnson', score: 250},
    { id: 5, firstname: 'Emily', lastname: 'Brown', score: 180},
    { id: 6, firstname: 'Michael', lastname: 'Davis', score: 300},
    { id: 7, firstname: 'Olivia', lastname: 'Miller', score: 220},
    { id: 8, firstname: 'William', lastname: 'Wilson', score: 120},
    { id: 9, firstname: 'Sophia', lastname: 'Anderson', score: 280},
    { id: 10, firstname: 'James', lastname: 'Taylor', score: 190},
    { id: 11, firstname: 'Ava', lastname: 'Thomas', score: 230},
    { id: 12, firstname: 'Benjamin', lastname: 'Clark', score: 140},
    { id: 13, firstname: 'Mia', lastname: 'Lewis', score: 270},
    { id: 14, firstname: 'Ethan', lastname: 'Harris', score: 160},
    { id: 15, firstname: 'Charlotte', lastname: 'Martin', score: 210},
];

fakeData.sort((a, b) => b.score - a.score);
  
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('rank', {
        header: 'Rang',
    }),
    columnHelper.accessor('firstname', {
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
            setData(response.data.data);
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
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
                        {loading 
                            ? (<Loader />)
                            : table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        }
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
        </div>
    );
};

export default Ranking;