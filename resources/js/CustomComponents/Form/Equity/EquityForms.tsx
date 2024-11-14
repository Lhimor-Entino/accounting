import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/Components/ui/label"
import { useState } from "react"
import { usePage } from "@inertiajs/react"
import { Account, AccountTypes, PageProps, SubAccountTypes } from "@/types"
import AccountReceivableList from "@/CustomComponents/Tables&List/assets/AccountReceivableList"

import GeneralForm from "../GeneralForm"
import AccountPayableForm from "../Liabilities/AccountPayableForm"
type Props = {

    account_type: number
}
const EquityForms = (props: Props) => {
    const [equityType, setEquitytType] = useState<string>("")
    const { account_type } = props
    const { accountSubTypes, accountTypes } = usePage<PageProps>().props;
    const handleSelectChange = (value: string) => {
        setEquitytType(value); // Update state with the selected value
    };
    return (
        <div>
            <div>
                <Label htmlFor="username" className="text-right">
                    Liabilities Account Type {equityType}
                </Label>
                <Select value={equityType} onValueChange={handleSelectChange} >
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Types" />
                    </SelectTrigger>
                    <SelectContent className=" max-h-64">
                        {accountSubTypes.map((at: SubAccountTypes, index: number) => at.account_id == account_type &&
                            <SelectItem key={index} value={at.id.toString()}>{at.name}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
            </div>
            <div className='mt-7'>

                {equityType.length < 1 && <p className=" text-xs text-center text-slate-500">Select Assest Type To display form</p>}
            </div>

            <div>

                {/* {liabilityType === "13" && <AccountPayableForm liabilityType={liabilityType} /> } */}
                {equityType === "15" && <GeneralForm type={equityType} account_type={account_type} />}
            </div>
        </div>
    )
}

export default EquityForms
