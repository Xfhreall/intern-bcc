"use client"

import type { Reports } from "@/types/reportTypes"

import React, { useState, useMemo, useCallback, useEffect } from "react"
import { format } from "date-fns"
import { RefreshCw, Search } from "lucide-react"
import { addToast } from "@heroui/toast"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    type ColumnDef,
    type FilterFn,
} from "@tanstack/react-table"

import { useUserReports } from "@/hooks/useSeaStatus"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const StatusBadge = React.memo(({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "invalid":
                return "bg-red-500 text-white"
            case "waiting":
                return "bg-yellow-400 text-white"
            case "verified":
                return "bg-green-500 text-white"
            case "resolved":
                return "bg-blue-500 text-white"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <span className={`py-2 text-sm rounded-md inline-block w-28 text-center ${getStatusColor(status)}`}>{status}</span>
    )
})

StatusBadge.displayName = "StatusBadge"

const dateFilterFn: FilterFn<Reports> = (row, columnId, filterValue) => {
    if (!filterValue || filterValue === "all") return true

    const rowValue = row.getValue(columnId) as string

    if (!rowValue) return false

    try {
        const rowDate = format(new Date(rowValue), "yyyy-MM-dd")

        return rowDate === filterValue
    } catch (e) {
        return e ? false : true
    }
}

const formatDisplayDate = (dateString: string) => {
    try {
        const date = new Date(dateString)
        const day = format(date, "dd")
        const month = format(date, "MM")

        return `${day}-${month}-2025`
    } catch (e) {
        return "Invalid date" + e
    }
}
const getUniqueDates = (reports: Reports[]) => {
    const uniqueDates = new Set<string>()

    if (Array.isArray(reports)) {
        reports.forEach((report) => {
            const formattedDate = format(new Date(report.createdAt), "yyyy-MM-dd")

            uniqueDates.add(formattedDate)
        })
    }

    return Array.from(uniqueDates).sort()
}

const UserReports = () => {
    const { data, isLoading, error, refetch } = useUserReports()
    const reports = useMemo(() => data || [], [data])

    const [nameFilter, setNameFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("")

    const uniqueDates = useMemo(() => getUniqueDates(reports), [reports])

    const columns = useMemo<ColumnDef<Reports>[]>(
        () => [
            {
                accessorKey: "title",
                header: "Name",
                cell: ({ row }) => {
                    return <span className="font-semibold">{row.getValue("title")}</span>
                },
                size: 200,
            },
            {
                enableHiding: true,
                accessorKey: "createdAt",
                header: "Date",
                cell: ({ row }) => {
                    const date = row.getValue("createdAt")

                    if (!date) return null

                    return <span className="text-gray-500">{formatDisplayDate(date as string)}</span>
                },
                filterFn: dateFilterFn,
                size: 120,
            },
            {
                accessorKey: "status",
                header: () => <div className="mr-6 text-right">Status</div>,
                cell: ({ row }) => {
                    return (
                        <div className="text-right">
                            <StatusBadge status={row.getValue("status") as string} />
                        </div>
                    )
                },
                size: 150,
            },
        ],
        [],
    )

    const columnFilters = useMemo(() => {
        const filters = []

        if (dateFilter && dateFilter !== "all") filters.push({ id: "createdAt", value: dateFilter })
        if (statusFilter && statusFilter !== "all") filters.push({ id: "status", value: statusFilter })

        return filters
    }, [dateFilter, statusFilter])

    const globalFilterFn = useCallback((row: { getValue: (arg0: any) => any }, columnId: any, filterValue: string) => {
        const value = row.getValue(columnId)

        if (!value || typeof value !== "string") return false

        return value.toLowerCase().includes(filterValue.toLowerCase())
    }, [])

    const table = useReactTable({
        data: reports,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: nameFilter,
            columnFilters,
        },
        onGlobalFilterChange: setNameFilter,
        globalFilterFn,
        enableSorting: false,
        enableMultiSort: false,
        enableColumnFilters: true,
        enableGlobalFilter: true,
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0,
            },
        },
        pageCount: Math.ceil(reports.length / 10),
    })

    const handleNameFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }, [])

    const handleDateFilterChange = useCallback((value: string) => {
        setDateFilter(value)
    }, [])

    const handleStatusFilterChange = useCallback((value: string) => {
        setStatusFilter(value)
    }, [])

    const handleRefresh = useCallback(() => {
        refetch()
        if (error) {
            addToast({
                color: "danger",
                title: "Error refreshing reports",
                description: "An error occurred while refreshing your reports",
                timeout: 5000,
                shouldShowTimeoutProgress: true,
            })
        } else {
            addToast({
                color: "success",
                title: "Reports refreshed",
                description: "Your reports have been successfully refreshed",
                timeout: 5000,
                shouldShowTimeoutProgress: true,
            })
        }
    }, [refetch, error])

    useEffect(() => {
        const currentTopItemIndex = table.getState().pagination.pageIndex * table.getState().pagination.pageSize
        const newPageIndex = Math.floor(currentTopItemIndex / table.getState().pagination.pageSize)

        if (newPageIndex !== table.getState().pagination.pageIndex) {
            table.setPageIndex(newPageIndex)
        }
    }, [
        table.getState().pagination.pageSize,
        table.getState().pagination.pageIndex,
        table.getState().pagination.pageSize,
    ])

    const rows = table.getRowModel().rows

    if (isLoading) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <div className="animate-pulse">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full p-6 bg-white rounded-lg shadow">
                <Alert variant="destructive">
                    <AlertTitle>{`Session Expired :(`}</AlertTitle>
                    <AlertDescription>Please relog to get status report</AlertDescription>
                </Alert>
            </div>
        )
    }


    return (
        <div className="w-full p-6 my-6 bg-white rounded-lg shadow">
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input className="pl-8 w-[180px]" placeholder="Name" value={nameFilter} onChange={handleNameFilterChange} />
                </div>

                <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        {uniqueDates.map((date) => (
                            <SelectItem key={date} value={date}>
                                {formatDisplayDate(date)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="font-medium text-white">
                        <SelectItem className="text-black bg-gray-100" value="all">All Status</SelectItem>
                        <SelectItem className="my-1 bg-red-500 focus:bg-red-700 focus:text-inherit text-inherit" value="invalid">Invalid</SelectItem>
                        <SelectItem className="my-1 bg-yellow-400 focus:bg-yellow-700 focus:text-inherit text-inherit" value="waiting">Waiting</SelectItem>
                        <SelectItem className="my-1 bg-green-500 focus:bg-green-700 focus:text-inherit text-inherit" value="verified">Verified</SelectItem>
                        <SelectItem className="my-1 bg-blue-500 focus:bg-blue-700 focus:text-inherit text-inherit" value="resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="ml-auto" size="icon" variant="outline" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>

            {reports.length > 0 ? (
                <>
                    <div className="border rounded-md">
                        <div className="w-full overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead
                                                    key={header.id}
                                                    style={{ minWidth: header.column.getSize() }}
                                                >
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {rows.length > 0 ? (
                                        rows.map((row) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={`py-4 ${cell.column.id === "status" ? "text-right pr-6" : ""}`}
                                                        style={{ minWidth: cell.column.getSize() }}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell className="h-24 text-center" colSpan={columns.length}>
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    {reports.length > 0 && (
                        <div className="flex flex-col items-center justify-between gap-4 py-4 mt-4 sm:flex-row">
                            <div className="text-sm text-muted-foreground">
                                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                                {Math.min(
                                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                    table.getFilteredRowModel().rows.length
                                )}{" "}
                                of {table.getFilteredRowModel().rows.length} entries
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    className="h-8 px-4"
                                    disabled={!table.getCanPreviousPage()}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => table.previousPage()}
                                >
                                    Previous
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                                        const pageIndex = i;
                                        const isCurrentPage = pageIndex === table.getState().pagination.pageIndex;
                                        const isLastPage = pageIndex === table.getPageCount() - 1;

                                        if (
                                            pageIndex === 0 ||
                                            isLastPage ||
                                            Math.abs(pageIndex - table.getState().pagination.pageIndex) <= 1
                                        ) {
                                            return (
                                                <Button
                                                    key={pageIndex}
                                                    className="w-8 h-8 p-0"
                                                    size="sm"
                                                    variant={isCurrentPage ? "default" : "outline"}
                                                    onClick={() => table.setPageIndex(pageIndex)}
                                                >
                                                    {pageIndex + 1}
                                                </Button>
                                            );
                                        }


                                        if (
                                            pageIndex === 1 && table.getState().pagination.pageIndex > 2 ||
                                            pageIndex === table.getPageCount() - 2 && table.getState().pagination.pageIndex < table.getPageCount() - 3
                                        ) {
                                            return <span key={pageIndex} className="px-1">...</span>;
                                        }

                                        return null;
                                    })}
                                </div>
                                <Button
                                    className="h-8 px-4"
                                    disabled={!table.getCanNextPage()}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => table.nextPage()}
                                >
                                    Next
                                </Button>
                                <Select
                                    value={table.getState().pagination.pageSize.toString()}
                                    onValueChange={(value) => {
                                        const newPageSize = Number(value);
                                        const currentTopItemIndex = table.getState().pagination.pageIndex * table.getState().pagination.pageSize;
                                        const newPageIndex = Math.floor(currentTopItemIndex / newPageSize);

                                        table.setPageSize(newPageSize);
                                        table.setPageIndex(newPageIndex);
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[80px]">
                                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[10, 20].map((pageSize) => (
                                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
                    <p>No reports found. Create a new report to get started.</p>
                </div>
            )}
        </div>
    )
}

export default UserReports

