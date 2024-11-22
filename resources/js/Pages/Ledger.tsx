import { Ledgers } from '@/types'
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
import { ArrowUpDown, BadgeInfoIcon, BriefcaseBusinessIcon, CalendarClockIcon, ChevronDown, InfoIcon, MoreHorizontal, ShieldXIcon, UserCircle2 } from "lucide-react"
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"

import Authenticated from '@/Layouts/AuthenticatedLayout'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import LedgerTbl from '@/CustomComponents/Tables&List/legder/LedgerTbl'

type Props = {
    ledgers: Ledgers[]
}

const Ledger = (props: Props) => {
    const { ledgers } = props

    return (
        <div className="w-full">

            <Authenticated>
                <div className='flex flex-col gap-x-9 w-full' >

                    <div className='flex gap-4'>
                        <div className='flex-1 flex items-center gap-x-2 '>
                            <BriefcaseBusinessIcon className=' text-slate-600 w-5 h-5' />
                            <p className=' text-slate-700 font-bold text-lg'>General Ledger</p>
                        </div>
                    </div>              
                    <LedgerTbl ledgers={ledgers}/>
                </div>

            </Authenticated>

        </div>
    )
}

export default Ledger