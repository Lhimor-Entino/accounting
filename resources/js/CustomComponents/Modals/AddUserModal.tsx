import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import useCustomToast from "@/hooks/useCustomToast";
import { Account, Role, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEventHandler } from "react";


interface Props {

}
const roles = [
    { role: 'MAKER', role_id: '1' },
    { role: 'APPROVER', role_id: '2' },
    { role: 'ENCODERS', role_id: '3' }
]
const AddUserModal = (props: Props) => {
    const { createdToast } = useCustomToast()
    const { data, setData, processing, post, reset } = useForm({
        name: "",
        email: "",
        id: 0,
        role: "0",

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

    const handleSelectChange = (value:string) => {
        setData("role", value)
    }
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button >Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Provide the user information and press save to create user.
                    </DialogDescription>
                </DialogHeader>

                <form className='flex flex-col gap-y-5' id="asset-form" onSubmit={handleSubmit}>

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

                    <div className='mt-2'>
                        <Label htmlFor="username" className="text-right">
                            Role 
                        </Label>
                        <Select value={data.role} onValueChange={handleSelectChange}>
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
                </form>


                <div className='mt-5'>
                    <Button className='w-full' form='asset-form' type="submit">
                        {processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />}Save Account</Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal


