import { Button } from "@/components/ui/button"
import { Label } from "@/Components/ui/label";
import useCustomToast from "@/hooks/useCustomToast";
import { Account } from "@/types";
import { format, setDate } from "date-fns"
import { Check, ChevronsUpDown, CircleDollarSignIcon, CreditCardIcon, HourglassIcon, IndentIncreaseIcon, LoaderCircleIcon, LockKeyholeOpen } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@/Components/ui/command"
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Badge } from "@/Components/ui/badge"
import * as React from "react"
import { ScrollArea } from "@/Components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import TextInput from "@/Components/TextInput";
import { Inertia } from "@inertiajs/inertia";

interface Props {
    accounts: Account[]
}
interface AccountInput {
    id: number,
    name: string
}
interface tableData {
    account_name: string,
    debit: string,
    credit: string,
    id: number,
    tempEntryID: number // use to pair entry
    entryDate:Date,
    description:string
}
const AddJournalEntryModal = (props: Props) => {
    const { accounts } = props
    const [entryDate, setEntryDate] = useState<Date>()
    const [description, setDescription] = useState<string>("")
    const { createdToast, warningToast } = useCustomToast()
    const [open, setOpen] = React.useState(false)
    const [openCredit, setOpenCredit] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [debitAccount, setDebitAccount] = useState<AccountInput>();
    const [creditAccount, setCreditAccount] = useState<AccountInput>();
    const [debitAmount, setDebitAmount] = useState<string>("")
    const [creditAmount, setCreditAmount] = useState<string>("")
    const [tblData, setTblData] = useState<tableData[]>([])
    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        if (!debitAccount?.id || !creditAccount?.id) {
            warningToast('Add Journal Entry Failed.', 'Please provide all needed data')
            return
        }
        if (!entryDate) {
            warningToast('Add Journal Entry Failed.', 'Date field is required')
            return
        }
        if (!description) {
            warningToast('Add Journal Entry Failed.', 'Description field is required')
            return
        }
        const newEntry: tableData[] = [{
            account_name: debitAccount?.name || "",
            debit: debitAmount,
            credit: "0",
            id: debitAccount?.id,
            tempEntryID: tblData.length,
            description,
            entryDate: entryDate || new Date()

        },
        {
            account_name: creditAccount?.name || "",
            debit: "0",
            credit: creditAmount,
            id: creditAccount?.id,
            tempEntryID: tblData.length,
            description,
            entryDate: entryDate || new Date()

        },
        ]
        setTblData((prevData) => {
            // If prevData exists, append newEntry to it, otherwise initialize with newEntry
            return [...prevData, ...newEntry];
        });
        resetValue()
    }

    const resetValue = () => {
        setCreditAccount(undefined)
        setDebitAccount(undefined)
        setCreditAmount("")
        setDebitAmount("")
        setDescription("")
        setEntryDate(undefined)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: number) => {
        const inputValue = e.target.value;
        // Regex to allow only digits and one decimal point
        const regex = /^[0-9]*\.?[0-9]*$/;

        // If the input matches the regex, update the state; otherwise, ignore the input
        if (regex.test(inputValue)) {
            if (type === 1) {
                setDebitAmount(inputValue)
            } else {
                setCreditAmount(inputValue)
            }
        } else {
            e.preventDefault()
        }
    };

    const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation();  // This stops the click event from bubbling up

        // if (!entryDate) {
        //     warningToast('Save journal failed.', 'Please provide all needed data')
        //     return
        // }
        const groupedEntry = tblData.reduce((acc: any, entry: tableData) => {
            const { tempEntryID, debit, credit, account_name, id,description,entryDate } = entry;

            // Initialize the group if it doesn't exist yet
            if (!acc[tempEntryID]) {
                acc[tempEntryID] = {
                    tempEntryID,
                    debit: 0,
                    credit: 0,
                    debit_account_name: "",  // Store the name for debit account (string)
                    credit_account_name: ""  // Store the name for credit account (string)
                };
            }

            // Sum the debit and credit values
            acc[tempEntryID].debit += parseFloat(debit);
            acc[tempEntryID].credit += parseFloat(credit);
            acc[tempEntryID].description = description;
            acc[tempEntryID].entryDate = entryDate;
            // Conditionally assign the account name to debit or credit account name
            if (parseFloat(credit) === 0 && !acc[tempEntryID].debit_account_name) {
                acc[tempEntryID].debit_account_name = account_name;  // Only assign if it's not already assigned
                acc[tempEntryID].debit_account_id = id;  // Only assign if it's not already assigned
            }
            if (parseFloat(debit) === 0 && !acc[tempEntryID].credit_account_name) {
                acc[tempEntryID].credit_account_name = account_name;  // Only assign if it's not already assigned
                acc[tempEntryID].credit_account_id = id;
            }

            return acc;
        }, {});

        console.log(groupedEntry) 
            
        Inertia.post(route('entry.store'), {
            data: groupedEntry,

        }, {
            onSuccess: () => {

                createdToast('New journal saved successfully')
            }
        })


    }

    const handleAccountChange = (value: AccountInput, type: number) => {

        if (type === 1) {
            if (creditAccount) {
                if (creditAccount.id === value.id) {
                    warningToast("Account Error", "Debit and Credit account can't be same")
                    return
                }
            }
            setDebitAccount(value)
        } else {
            if (debitAccount) {
                if (debitAccount.id === value.id) {
                    warningToast("Account Error", "Credit accounts cannot be the same. Please select different accounts for each side of the transaction")
                    return
                }
            }
            setCreditAccount(value)
        }
    }

    console.log(accounts)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Add Entry</Button>
            </SheetTrigger>
            <SheetContent side={"bottom"} className=" h-full">
                <SheetHeader>
                    <SheetTitle>Add New Journal Entry</SheetTitle>
                    <SheetDescription>
                        Click <span className="text-red-800 font-bold">[Add Entry] </span>
                        to add a new record to the table. Once you have reviewed and finalized all entries,
                        click <span className="text-red-800 font-bold"> [Save All Entries] </span>to save them.
                        <span >All Fields are required.</span>
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-5">



                    <div className="grid grid-flow-col grid-cols-3 gap-20">
                        <div className=" col-span-1">
                            <form className='flex flex-col gap-y-5 w-full' id="asset-form" onSubmit={handleSubmit} >
                                <div className="w-full">
                                    <Label className="text-right w-full">
                                        Date
                                    </Label>
                                    <Popover>
                                        <PopoverTrigger className={cn(
                                            "w-full  justify-start text-left font-normal border border-gray-300 p-1 pl-3 text-sm rounded-sm",
                                            !entryDate && "text-slate-900"
                                        )}  >
                                            {entryDate ? format(entryDate, "PPP") : "Pick a date"}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">

                                            <Calendar
                                                mode="single"
                                                selected={entryDate}
                                                onSelect={setEntryDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="w-full ">
                                    <Label htmlFor="desc" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="desc" value={description} onChange={({ target }) => setDescription(target.value)} className="w-full" placeholder="Type your description here." />
                                </div>
                                <div className="mt-3">
                                    <Command className="rounded-lg border shadow-md ">
                                        <CommandList>
                                            <CommandGroup heading="Debit Account">
                                                <CommandItem>
                                                    <CreditCardIcon />
                                                    <Popover open={open} onOpenChange={setOpen} >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={open}
                                                                className="w-full justify-between"
                                                            >
                                                                {
                                                                    debitAccount?.name || "Select Debit Account"

                                                                }
                                                                <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0 ">
                                                            <Command>
                                                                <CommandInput className="w-full" placeholder="Search Account..." />
                                                                <CommandList className="w-full">
                                                                    <CommandEmpty className="w-full">Account not found.</CommandEmpty>
                                                                    <CommandGroup >
                                                                        <ScrollArea className=" h-52">
                                                                            {accounts.map((account) => (
                                                                                <CommandItem
                                                                                    
                                                                                    key={account.id}
                                                                                    value={account.account_name ?? account.name}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpen(false)
                                                                                        handleAccountChange({ id: account.id, name: account.account_name || account.name }, 1)

                                                                                    }}
                                                                                >
                                                                                    <div className="flex justify-between w-full">
                                                                                        {account.account_name ?? account.name} <Badge className=" rounded-2xl text-[10px] bg-gray-400 ml-3 p-0 pl-2 pr-2">{account.account_sub_type.name}<IndentIncreaseIcon className="ml-2 mr-2 h-2 w-2"/>{account.account_sub_type.account_type.name}</Badge>
                                                                                    </div>

                                                                                    <Check
                                                                                        className={cn(
                                                                                            "ml-auto",
                                                                                            value === account.account_name ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </ScrollArea>

                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </CommandItem>
                                                <CommandItem >
                                                    <CircleDollarSignIcon />
                                                    <TextInput onChange={(e) => handleInputChange(e, 1)} value={debitAmount} className="p-2 pl-2 pr-4 w-full text-xs" type="text" placeholder="Debit Amount" />
                                                </CommandItem>
                                            </CommandGroup>
                                            <CommandGroup heading="Credit Account">
                                                <CommandItem>
                                                    <CreditCardIcon />
                                                    <Popover open={openCredit} onOpenChange={setOpenCredit} >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={open}
                                                                className="w-full justify-between"
                                                            >
                                                                {creditAccount?.name || "Select Credit Account"
                                                                }
                                                                <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0 ">
                                                            <Command>
                                                                <CommandInput className="w-full" placeholder="Search Account..." />
                                                                <CommandList className="w-full">
                                                                    <CommandEmpty className="w-full">Account not found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        <ScrollArea className=" h-52">
                                                                            {accounts.map((account) => (
                                                                                <CommandItem
                                                                                    key={account.id}
                                                                                    value={account.account_name ?? account.name}
                                                                                    onSelect={(currentValue) => {
                                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                                        setOpenCredit(false)
                                                                                        handleAccountChange({ id: account.id, name: account.account_name || account.name }, 2)

                                                                                    }}
                                                                                >
                                                                                    {account.account_name ?? account.name}
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "ml-auto",
                                                                                            value === account.account_name ? "opacity-100" : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </ScrollArea>
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </CommandItem>

                                                <CommandItem >
                                                    <CircleDollarSignIcon />
                                                    <TextInput onChange={(e) => handleInputChange(e, 2)} value={creditAmount} className="p-2 pl-2 pr-4 w-full text-xs" type="text" placeholder="Credit Amount" />
                                                </CommandItem>
                                            </CommandGroup>
                                            <CommandSeparator />
                                        </CommandList>
                                    </Command>
                                </div>
                            </form>
                            <div className='mt-5'>
                                <Button className='w-full' size={"sm"} form='asset-form' type="submit">
                                    Add Entry</Button>
                            </div>
                        </div>
                        <div className=" col-span-2 ">
                            <div className="max-h-[450px] overflow-y-auto">
                                <Table>
                                    <TableCaption>A list of your entries. Review before submission.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead >Account</TableHead>
                                            <TableHead>Debit</TableHead>
                                            <TableHead>Credit</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            tblData?.map((tdata: tableData, index: number) =>
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium w-[250px]">
                                                        {tdata.account_name}
                                                    </TableCell>
                                                    <TableCell> {tdata.debit === "0" ? "" : `$ ${tdata.debit}`}</TableCell>
                                                    <TableCell>{tdata.credit === "0" ? "" : `$ ${tdata.credit}`}</TableCell>

                                                </TableRow>)
                                        }

                                    </TableBody>
                                </Table>
                            </div>


                            <div className='mt-5'>
                                <Button onClick={(e) => handleSave(e)} disabled={tblData.length < 1 ? true : false} size={"sm"} className='w-full' type="button">
                                    Save all Entries</Button>
                            </div>

                        </div>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default AddJournalEntryModal
