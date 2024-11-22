import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, BadgeInfoIcon, CalendarClockIcon, ChevronDown, InfoIcon, MoreHorizontal, ShieldXIcon, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Account, Entries, User } from "@/types"
import { getRoles } from "@/utils/roleUtils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import DeactivateUserModal from "@/CustomComponents/Modals/DeactivateUserModal"
import { getFormattedDateString } from "@/utils/dateUtils"



interface Props {

    entries: Entries[]
}

const EntryTbl = (props: Props) => {
    const { entries } = props
    const [data, setData] = React.useState<Entries[]>(entries)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [showDeactivateModal, setShowDeactivateModal] = React.useState<boolean>(false)
    const [selectedName, setSelectedName] = React.useState<string>("")
    const [selectedId, setSelectedId] = React.useState<number>(0)
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const columns: ColumnDef<Entries>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "reference_no",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Reference Number
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize ml-4" >{row.getValue("reference_no")}</div>
            ),
        },
        {
            accessorKey: "debit_account",
            header: "Debit Account",

            //     return (
            //         <Button
            //             variant="ghost"
            //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            //         >
            //             Debit Account
            //             <ArrowUpDown className="ml-2 h-4 w-4" />
            //         </Button>
            //     )
            // },
            cell: ({ row }) => {
                const debit_account = row.original.debit_account.account_name ?? row.original.debit_account.name
                return <div>{debit_account}</div>
            },
        },
        {
            accessorKey: "credit_account",
            header: "Credit Account",
            cell: ({ row }) => {

                const credit_account = row.original.credit_account.account_name ?? row.original.credit_account.name
                return <div>{credit_account}</div>
            },
        },
        {
            accessorKey: "debit_amount",
            header: " Amount",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("debit_amount")}</div>
            ),
        },

        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("description")}</div>
            ),
        },

        {
            accessorKey: "entry_date",
            header: "Entry Date",
            cell: ({ row }) => (
                <div className="capitalize">{getFormattedDateString(row.getValue("entry_date"))}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const data = row.original.entered_by

                return (
                    <div className="flex items-center gap-x-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions Here {data.name}</DropdownMenuLabel>

                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div>

                )
            },
        },
    ]
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        setData(entries)
    }, entries)
    return (
        <div className="w-full">
            {/* {JSON.stringify(entries)} */}
            {
                showDeactivateModal && <DeactivateUserModal selectedId={selectedId} name={selectedName} showDeactivateModal={showDeactivateModal} setShowDeactivateModal={setShowDeactivateModal} />
            }
            <div className="flex items-center py-4 gap-x-4">
                <Input
                    placeholder="Filter reference number"
                    value={(table.getColumn("reference_no")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("reference_no")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id.replaceAll("_", ' ')}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EntryTbl