import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import useCustomToast from "@/hooks/useCustomToast";
import { AccessLevel } from "@/types";
import { useForm } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns"
import { CalendarIcon, HourglassIcon, LoaderCircleIcon, LockKeyholeOpen } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator, } from "@/Components/ui/command"
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/ui/calendar";

interface Props {

}
const roles = [
    { role: 'MAKER', role_id: '1' },
    { role: 'APPROVER', role_id: '2' },
    { role: 'ENCODERS', role_id: '3' }
]

// THE VALUE IS IN MONTHS
const durations = [
    { label: "3 Months", months: "3" },
    { label: "6 Months", months: "6" },
    { label: "1 Year", months: "12" }
]
const AddUserModal = (props: Props) => {
    const [date, setDate] = useState<Date>()
    const { createdToast } = useCustomToast()
    const { data, setData, processing, post, reset } = useForm({
        name: "",
        email: "",
        username:"",
        id: 0,
        role: "0",
        privilege: "0",
        password: "pass",
        password_expiration_date: "",
        activation_effectivity_date: "",
        activation_expiration_date: "",
    });

    const { isError, isLoading, data: access_levels, refetch, isFetched } = useQuery({
        queryKey: ['filter'],   // ALL CASH IN BANK ACCOUNTS
        queryFn: () => axios.get(route('access_levels.show')).then((res): AccessLevel[] => res.data),
        // enabled:false
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                createdToast("New User Created")
                reset()
            },
            onError: () => alert("error")
        })
    }

    const handleSelectChange = (value: string) => {
        setData("role", value)
     
    }
    const handleSelectChangePrivilege = (value: string) => {
        setData("privilege", value)
    }
    const handleSelectChangePasswordExp = (value: string) => {
        setData("password_expiration_date", value)
    }
    const handleSelectChangeActivationExp = (value: string) => {
        setData("activation_expiration_date", value)
    }

    useEffect(() => {
        if (!date) return
        setData("activation_effectivity_date", date.toLocaleString())
    }, [date])

    return (
        <Dialog onOpenChange={() => reset()} >
            <DialogTrigger asChild>
                <Button >Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[550px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Provide the user information and press save to create user.
                    </DialogDescription>
                </DialogHeader>

                <form className='flex flex-col gap-y-5' id="asset-form" onSubmit={handleSubmit}>

                    <div className='mt-2'>
                        <Label htmlFor="username" className="text-right">
                            Role
                        </Label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="User Roles" />
                            </SelectTrigger>
                            <SelectContent className=" max-h-64">
                                {roles?.map((role: any, index: number) =>
                                    <SelectItem key={index} value={role.role_id}>{role.role}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="bac" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={data.name}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('name', target.value)}

                        />
                    </div>
                    <div>
                        <Label htmlFor="u_name" className="text-right">
                            User Name
                        </Label>
                        <Input
                            id="u_name"
                            className="col-span-3"
                            value={data.username}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('username', target.value)}

                        />
                    </div>
                    <div>
                        <Label htmlFor="bn" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="bn"
                            className="col-span-3"
                            value={data.email}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('email', target.value)}
                        />
                    </div>


                    {
                        data.role === "3" &&
                        <>
                            <div>
                                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                                    <CommandList>
                                        <CommandGroup heading="Password">
                                            <CommandItem>
                                                <LockKeyholeOpen />

                                                <Input placeholder="Password" value={data.password} onChange={({ target }) => setData('password', target.value)} />
                                            </CommandItem>
                                            <CommandItem className="flex items-center">
                                                <HourglassIcon className="mt-3" />
                                                <div className='mt-2 w-full'>
                                                    <Select onValueChange={handleSelectChangePasswordExp}>
                                                        <SelectTrigger className="w-full mt-1" >
                                                            <SelectValue placeholder="Expiration Date" />

                                                        </SelectTrigger>
                                                        <SelectContent className=" max-h-64">
                                                            {durations?.map((al: any, index: number) =>
                                                                <SelectItem key={index} value={al.months}>{al.label}</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </CommandItem>

                                        </CommandGroup>
                                        <CommandSeparator />
                                        <CommandGroup heading="Activation Period">
                                            <CommandItem>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}

                                                            className={cn(
                                                                "w-full justify-start text-left font-normal",
                                                                !data.password_expiration_date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon />
                                                            {date ? format(date, "PPP") : <span>Pick a date </span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">

                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </CommandItem>
                                            <CommandItem className="flex items-center">

                                                <div className='mt-2 w-full'>

                                                    <Select onValueChange={handleSelectChangeActivationExp}>
                                                        <SelectTrigger className="w-full mt-1" >
                                                            <SelectValue placeholder="Expiration Date" />

                                                        </SelectTrigger>
                                                        <SelectContent className=" max-h-64">
                                                            {durations?.map((al: any, index: number) =>
                                                                <SelectItem key={index} value={al.months}>{al.label}</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </CommandItem>

                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </div>
                            <div className='mt-2'>
                                <Label htmlFor="username" className="text-right">
                                    Privilege
                                </Label>
                                <Select onValueChange={handleSelectChangePrivilege}>
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="User Privilege" />
                                    </SelectTrigger>
                                    <SelectContent className=" max-h-64">
                                        {access_levels?.map((al: AccessLevel, index: number) =>
                                            <SelectItem key={index} value={al.id.toString()}>{al.role}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </>

                    }

                </form>


                <div className='mt-5'>
                    <Button className='w-full' form='asset-form' type="submit">
                        {processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />}Save User</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal


