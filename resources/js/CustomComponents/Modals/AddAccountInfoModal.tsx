import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import { AccountOtherInfo } from "@/types"
import { useForm } from "@inertiajs/react"
import { Value } from "@radix-ui/react-select"
import { PlusIcon } from "lucide-react"
import { FormEventHandler, useState } from "react"
interface Props {
    setData: (key: string, value: AccountOtherInfo[]) => void;
    otherInfo:AccountOtherInfo[]
}


// Initial values for resetting
const initialState: AccountOtherInfo = {
    field: "",
    account_id: 0,
    value: ""
};
const AddAccountInfoModal = (props: Props) => {
    const { setData: setAdditionalData,otherInfo } = props
    const [data, setData] = useState<AccountOtherInfo>(initialState)

    const handleAdditionalData:FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        setAdditionalData("otherInfo", [
            ...otherInfo, // Spread the current otherInfo array
           data
          ])

          setData(initialState)
    }
    const handleSetData = (type: number, val: string) => {
        if (type === 1) {
            setData(prevData => ({
                ...prevData,
                field: val
            }));

        } else {
            setData(prevData => ({
                ...prevData,
                value: val
            }));
        }
    }
    return (
        <Popover onOpenChange={() => setData(initialState)}>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"sm"}><PlusIcon /> Add Info</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <form onSubmit={handleAdditionalData}>
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Other Account Details</h4>
                        <p className="text-sm text-muted-foreground">
                            Additional Informations
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Field</Label>
                            <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                                value={data.field}
                                onChange={({ target }) => handleSetData(1, target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Value</Label>
                            <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                                value={data.value}
                                onChange={({ target }) => handleSetData(2, target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 items-center gap-4 mt-3">
                            <Button size={"sm"} type="submit">Save Information</Button>
                        </div>
                    </div>
                </div>

                </form>
          

            </PopoverContent>
        </Popover>
    )
}

export default AddAccountInfoModal