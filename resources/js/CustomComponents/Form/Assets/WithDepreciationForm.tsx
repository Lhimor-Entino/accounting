import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/Components/ui/label'
import AddAccountInfoModal from '@/CustomComponents/Modals/AddAccountInfoModal'
import useCustomToast from '@/hooks/useCustomToast'
import { AccountOtherInfo } from '@/types'
import { useForm } from '@inertiajs/react'
import { LoaderCircleIcon } from 'lucide-react'
import { FormEventHandler } from 'react'

type Props = {
    assetType: string
    account_type:number
}

const WithDepreciationForm = (props: Props) => {
    const { assetType,account_type } = props
    const { createdToast } = useCustomToast()
    const { data, setData, processing, post, reset } = useForm({
        account_sub_id: assetType,
        bank_account_code: "",
        bank_name: "",
        branch: "",
        account_name: "",
        currency: "",
        account_no: "",
        name: "",
        num_months_depreciation: 0,
        account_type:account_type,
        otherInfo: [] as AccountOtherInfo[]

    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        post(route("accounts.store"), {
            onSuccess: () => {
                createdToast("New Cash On Hand Account Created")
                reset()
            },
            onError: () => alert("error")
        })
    }
    return (
        <div>
             <div className='mt-5 flex justify-end'>
                <AddAccountInfoModal setData={setData} otherInfo={data.otherInfo} />
            </div>
            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="bac" className="text-right">
                        Name
                    </Label>
                    <Input
                        id="bac"
                        className="col-span-3"
                        onChange={({ target }) => setData("name", target.value)}
                        value={data.name}
                        disabled={processing ? true : false}
                    />
                </div>

                <div>
                    <Label htmlFor="bac" className="text-right">
                        No. of Months Depreciation
                    </Label>
                    <Input
                        id="bac"
                        className="col-span-3"
                        type='number'
                        onChange={({ target }) => setData("num_months_depreciation", parseInt(target.value))}
                        value={data.num_months_depreciation}
                        disabled={processing ? true : false}
                    />
                </div>
                <div className='mt-5'>
                    <Button className='w-full' type="submit">
                        {processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />}
                        Save Account
                    </Button>
                </div>
            </form>
        </div>
    )
}


export default WithDepreciationForm