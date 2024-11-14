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
  account_type: number
}

const CashOnHandForm = (props: Props) => {
  const { assetType,account_type } = props
  const { createdToast } = useCustomToast()
  const { data, setData, processing, post, reset } = useForm({
    account_sub_id:assetType,
    bank_account_code : "",
    bank_name:"",
    branch:"",
    account_name:"",
    currency:"",
    account_no:"",
    name:"",
    num_months_depreciation:"",
    otherInfo:[] as AccountOtherInfo[],
    account_type:account_type
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
      <form className='flex flex-col gap-y-1' onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="bac" className="text-right">
            Custodian Name 
          </Label>
          <Input
            id="bac"
            className="col-span-3"
            value={data.name}
            onChange={({target})=>setData('name',target.value)}
            disabled={processing ? true : false}
          />
        </div>
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
          <Button className='w-full' type="submit">
            {processing && <LoaderCircleIcon className=' w-5 h-4 animate-spin ' />}
            Save Account
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CashOnHandForm