import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/Components/ui/label'
import AddAccountInfoModal from '@/CustomComponents/Modals/AddAccountInfoModal'
import { useForm } from '@inertiajs/react'
import { LoaderCircleIcon, PlusIcon } from 'lucide-react'
import React, { FormEventHandler } from 'react'
import { AccountTypes, AccountOtherInfo } from '@/types'
import useCustomToast from '@/hooks/useCustomToast'
type Props = {
    assetType: string;
    account_type: number
}

const CashInBankForm = (props: Props) => {
    const { assetType } = props
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
        num_months_depreciation: "",
        otherInfo: [] as AccountOtherInfo[]

    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        post(route("accounts.store"), {
            onSuccess: () => {
                createdToast("New Cash In Back Account Created")
                reset()
            },
            onError: () => alert("error")
        })
    }
    return (
        <div className='h-[350px] overflow-y-auto scroll'>
            <div className='mt-5 flex justify-end'>
                <AddAccountInfoModal setData={setData} otherInfo={data.otherInfo} />
            </div>
     
            <form className='flex flex-col gap-y-1' id="asset-form" onSubmit={handleSubmit}>

                <div>
                    <Label htmlFor="bac" className="text-right">
                        Bank Account Code
                    </Label>
                    <Input
                        id="bac"
                        className="col-span-3"
                        value={data.bank_account_code}
                        disabled={processing ? true : false}
                        onChange={({ target }) => setData('bank_account_code', target.value)}

                    />
                </div>
                <div>
                    <Label htmlFor="bn" className="text-right">
                        Bank Name
                    </Label>
                    <Input
                        id="bn"
                        className="col-span-3"
                        value={data.bank_name}
                        disabled={processing ? true : false}
                        onChange={({ target }) => setData('bank_name', target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="br" className="text-right">
                        Branch
                    </Label>
                    <Input
                        id="br"
                        className="col-span-3"
                        value={data.branch}
                        disabled={processing ? true : false}
                        onChange={({ target }) => setData('branch', target.value)}
                    />
                </div>
                <div className='grid grid-cols-1 gap-x-3'>
                    <div>
                        <Label htmlFor="an" className="text-right">
                            Account Name
                        </Label>
                        <Input
                            id="an"
                            className="col-span-3"
                            value={data.account_name}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('account_name', target.value)}
                        />
                    </div>

                </div>
                <div className='grid grid-cols-2 gap-x-3'>

                    <div>
                        <Label htmlFor="anum" className="text-right">
                            Currency
                        </Label>
                        <Input
                            id="anum"
                            className="col-span-3"
                            value={data.currency}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('currency', target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="anum" className="text-right">
                            Account No.
                        </Label>
                        <Input
                            id="anum"
                            className="col-span-3"
                            value={data.account_no}
                            disabled={processing ? true : false}
                            onChange={({ target }) => setData('account_no', target.value)}
                        />
                    </div>
                </div>

            </form>
            <div className='mt-5'>
                <Label>Other Account Information</Label>
                <table className="min-w-full table-auto border-collapse mt-2">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Description</th>
                            <th className="px-2 py-1 text-left text-xs font-semibold text-gray-700">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.otherInfo?.map((oi, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="px-2 py-1 text-xs">{oi.field}</td>
                                    <td className="px-2 py-1 text-xs">{oi.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='mt-5'>
                <Button className='w-full' form='asset-form' type="submit">
                    {processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />}Save Account</Button>
            </div>
        </div>
    )
}

export default CashInBankForm