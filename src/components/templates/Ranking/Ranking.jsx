import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
  } from '@tanstack/react-table'

const testData = [
    {
        id: 1,
        name: "Jean",
        win: 5
    },
    {
        id: 2,
        name: "Paul",
        win: 4
    },
    {
        id: 3,
        name: "Jacques",
        win: 3
    },
    {
        id: 4,
        name: "Pierre",
        win: 3
    },
    {
        id: 5,
        name: "Jacqueline",
        win: 8
    },
    {
        id: 6,
        name: "Jeanne",
        win: 0
    },
    {
        id: 7,
        name: "Marie",
        win: 2
    },
    {
        id: 8,
        name: "Luc",
        win: 6
    },
    {
        id: 9,
        name: "Sophie",
        win: 1
    },
    {
        id: 10,
        name: "Thomas",
        win: 7
    },
    {
        id: 11,
        name: "Emma",
        win: 4
    },
    {
        id: 12,
        name: "Nicolas",
        win: 2
    },
    {
        id: 13,
        name: "Julie",
        win: 3
    },
    {
        id: 14,
        name: "Alexandre",
        win: 5
    },
    {
        id: 15,
        name: "Camille",
        win: 1
    },
    {
        id: 16,
        name: "Mathieu",
        win: 6
    },
    {
        id: 17,
        name: "Laura",
        win: 3
    },
    {
        id: 18,
        name: "Antoine",
        win: 4
    },
    {
        id: 19,
        name: "Elodie",
        win: 2
    },
    {
        id: 20,
        name: "Vincent",
        win: 7
    }
]

const columnHelper = createColumnHelper()

const columns = [
    columnHelper.accessor('rank', {
        cell: info => info.getValue(),
        header: () => <span> Rang </span>
    }),
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
        header: () => <span> Nom </span>
    }),
    columnHelper.accessor('win', {
        cell: info => info.getValue(),
        header: () => <span> Victoire </span>
    }),
]

const Ranking = () => {

    const [data, setData] = React.useState(() => [...testData])
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }) 
    
    return (
        <div className="relative min-h-screen items-start justify-center flex">
            <div className="bg-white shadow-lg rounded-lg p-4 mt-5 flex flex-col w-3/4">
                <h1 className="text-xl text-center font-bold mb-5"> Classement </h1>
                    {/* <div className="p-2">
                        <table>
                            <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
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
                            {table.getRowModel().rows.map(row => {
                                return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                        </td>
                                    )
                                    })}
                                </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div className="h-4" />


                        <div className="flex items-center gap-2">
                            <button
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            >
                            {'<<'}
                            </button>
                            <button
                            className="border rounded p-1"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            >
                            {'<'}
                            </button>
                            <button
                            className="border rounded p-1"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            >
                            {'>'}
                            </button>
                            <button
                            className="border rounded p-1"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            >
                            {'>>'}
                            </button>
                            <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount()}
                            </strong>
                            </span>
                            <span className="flex items-center gap-1">
                            | Go to page:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                                }}
                                className="border p-1 rounded w-16"
                            />
                            </span>
                            <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            >
                            {[25, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div> */}

                {/* <table id="leaderboard">
                    <thead>
                        <tr>
                            <th className="w-1/6">Position</th>
                            <th className="w-4/6">Nom</th>
                            <th className="w-1/6">Victoires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderBoard.map((player, index) => (
                            <tr key={player.id}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.win}</td>
                            </tr>
                        ))}
                    </tbody>

                </table> */}
            </div>
        </div>
    )
}

export default Ranking;