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
import { Input } from "@/components/ui/input"
import { Label } from "@/Components/ui/label"
import { CalendarIcon, ShieldXIcon } from "lucide-react"
import { Textarea } from "@/Components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { FormEventHandler, useEffect, useState } from "react"
import { useForm } from "@inertiajs/react"
import { Calendar } from "@/Components/ui/calendar"
import { getFormattedDateString, isNow } from "@/utils/dateUtils"
import useCustomToast from "@/hooks/useCustomToast"



type Props = {
    showDeactivateModal: boolean
    setShowDeactivateModal: (arg: boolean) => void
    name: string
    selectedId:number
}

const DeactivateUserModal = (props: Props) => {

    const {deactivateToast} = useCustomToast()
    const { showDeactivateModal, setShowDeactivateModal, name,selectedId } = props
    const [date, setDate] = useState<Date>()
    const { data, setData, processing, post, reset } = useForm({
        reason: "",
        effectivity_date: "",
        id:selectedId
    });
    useEffect(() => {
        if (!date) return

        setData("effectivity_date", date.toLocaleString())
    }, [date])

    const handleSubmit:FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        if (!date) return
        const isCurrentDate =  isNow(date.toLocaleString())

        const msg = !isCurrentDate ? `User ${name}  account will be deactivated at ${getFormattedDateString(data.effectivity_date)}.`:`User ${name}  account deactivated.`
        post(route('users.deactivateAccount'),{
            onSuccess: () => {
                deactivateToast(msg)
                reset()
                setShowDeactivateModal(false)
               
            },
            onError: () => alert("error")
        })
    }
    return (
        <Dialog open={showDeactivateModal} onOpenChange={() => setShowDeactivateModal(!showDeactivateModal)}>
            {/* <DialogTrigger asChild>
                <Button variant="outline">
                    <ShieldXIcon />
                    Deactivate Account
                </Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Deactivate User Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to deactivate <span className=" font-bold text-red-500">{name}'s</span> account? This action is irreversible. Click Save to confirm.
                    </DialogDescription>
                </DialogHeader>
                <form id="da-form" onSubmit={handleSubmit}> 
                <div className="grid gap-4 py-4">
                    <div >
                        <Label htmlFor="name" className="text-right ">
                            Deactivation Reason
                        </Label>
                        <Textarea value={data.reason} onChange={({ target }) => setData("reason", target.value)} className="mt-2" placeholder="Type here..." />
                    </div>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}

                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !data.effectivity_date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? format(date, "PPP") : <span>Pick effectivity date </span>}
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
                    </div>
        
                </div>

                </form>
       
                <DialogFooter>
                    <Button type="submit" form="da-form">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeactivateUserModal