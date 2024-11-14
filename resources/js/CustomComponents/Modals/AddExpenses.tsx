import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import { useToast } from "@/hooks/use-toast"

import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { getDateTime } from "@/utils/dateUtils";
import useCustomToast from "@/hooks/useCustomToast";

interface Props {
    account_type:number
}
const AddExpenses = (props: Props) => {
    const {account_type} = props
    const { createdToast } = useCustomToast()
    const modalRef = useRef(null)
    const { data, setData, processing, post, reset } = useForm({
        account_id: account_type,
        name: "",

    });
   
    const handleSubmit:FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        post(route("sub_types.store"), {
            onSuccess: () => {
                createdToast("New Expense Created")
                reset()
                
                modalRef.current
               
            },
            onError: () => alert("error")
        })
    }

    return (
        <Dialog  >
            <DialogTrigger asChild>
                <Button>Add Expenses</Button>
            </DialogTrigger>
            <DialogContent ref={modalRef} className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add Direct Expense</DialogTitle>
                    <DialogDescription>
                        Provide the Expense information and press save.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="bac" className="text-right">
                            Expense Name
                        </Label>
                        <Input
                            id="bac"
                            className="col-span-3"
                            value={data.name}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('name', target.value)}

                        />
                    </div>
                    <div className="mt-5" >
                        <Button className="w-full">{processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />} Save</Button>
                    </div>

                </form>




            </DialogContent>
        </Dialog>
    )
}

export default AddExpenses
