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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { useForm, usePage } from "@inertiajs/react"
import { FormEventHandler, useState } from "react"
import CashInBankForm from "../Form/Assets/CashInBankForm"
import { AccountTypes, PageProps } from "@/types"
import { getAccountType } from "@/utils/globalUtils"
import AssetForms from "../Form/Assets/AssetForms"
import LiabilitiesForms from "../Form/Liabilities/LiabilitiesForms"
import EquityForms from "../Form/Equity/EquityForms"
import RevenueForms from "../Form/Revenue/RevenueForms"

interface Props {
    account_type: number
}
const AddAccountModal = (props: Props) => {
    const { account_type } = props
    const [assetType,setAssetType] = useState<string>("")
    const {accountSubTypes,accountTypes} = usePage<PageProps>().props;
    

    const handleSelectChange = (value:string) => {
        setAssetType(value); // Update state with the selected value
      };

    return (
        <Dialog onOpenChange={() => setAssetType("")}>
            <DialogTrigger asChild>
                <Button >Add Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Add {getAccountType(accountTypes,account_type)} Account</DialogTitle>
                    <DialogDescription>
                        Provide the account information and press save to create your account.
                    </DialogDescription>
                </DialogHeader>
        
                    <div className="grid gap-4 py-4">           
                        <div>
                            {account_type == 1 && <AssetForms account_type={account_type}/>}    
                            {account_type == 2 && <LiabilitiesForms account_type={account_type} />} 
                            {account_type == 3 && <EquityForms account_type={account_type} />} 
                            {account_type == 4 && <RevenueForms account_type={account_type} />} 
                        </div>
                    </div>
             

         
            </DialogContent>
        </Dialog>
    )
}

export default AddAccountModal