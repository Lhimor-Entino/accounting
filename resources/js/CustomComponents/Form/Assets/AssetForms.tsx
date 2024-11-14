import React, { useState } from 'react'
import CashInBankForm from './CashInBankForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/Components/ui/label"
import { AccountTypes, PageProps, SubAccountTypes } from '@/types'
import { usePage } from '@inertiajs/react'
import CashOnHandForm from './CashOnHandForm'
import GeneralForm from '../GeneralForm'
import WithDepreciationForm from './WithDepreciationForm'
type Props = {
    account_type : number,
   
}

const sameForms = ['3', '4', '5', '6', '7'] // ID OF ASSET TYPES
const withDepreciationForms = ['8', '9', '10', '11', '12']
const AssetForms = (props: Props) => {
    const [assetType, setAssetType] = useState<string>("")
    const {account_type} = props
    const { accountSubTypes } = usePage<PageProps>().props;
    const handleSelectChange = (value: string) => {
      
        setAssetType(value); // Update state with the selected value
    };
 
    return (
        <div>
            <div>
                <Label htmlFor="username" className="text-right">
                    Assets Account Type 
                </Label>
                <Select value={assetType} onValueChange={handleSelectChange} >
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Types" />
                    </SelectTrigger>
                    <SelectContent className=" h-64">
                        {accountSubTypes.map((at: SubAccountTypes, index: number) => at.account_id == account_type &&
                            <SelectItem key={index} value={at.id.toString()}>{at.name}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-7'>

                {assetType.length < 1 && <p className=" text-xs text-center text-slate-500">Select Assest Type To display form</p>}
            </div>
            <div>

                {assetType === "1" && <CashInBankForm assetType={assetType} account_type={account_type} />}
                {assetType === "2" && <CashOnHandForm assetType={assetType} account_type={account_type}/>}
                {sameForms.includes(assetType) && <GeneralForm type={assetType} account_type={account_type} />}
                {withDepreciationForms.includes(assetType) && <WithDepreciationForm assetType={assetType} account_type={account_type} />}


            </div>

        </div>
    )
}

export default AssetForms