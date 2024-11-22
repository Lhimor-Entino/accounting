import React, { useEffect } from 'react'
import BreadCrubHeader from '../BreadCrubHeader'
import { getAccountSubType } from '@/utils/globalUtils'
import { usePage } from '@inertiajs/react'
import { Account, PageProps, SubAccountTypes } from '@/types'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import AccountPayableList from '../Tables&List/liabilities/AccountPayableList'
import AdvancesToOfficers from '../Tables&List/liabilities/AdvancesToOfficers'
import Sales from '../Tables&List/revenue/Sales'
import InterestIncome from '../Tables&List/revenue/InterestIncome'
import OtherIncome from '../Tables&List/revenue/OtherIncome'
interface Props {
    accounts: Account[]
    account_type: number
}

const Revenue = (props: Props) => {
    const { accounts, account_type } = props
    const { accountSubTypes } = usePage<PageProps>().props
    const [filterType, setFilterType] = React.useState<string>("")

    useEffect(() => {
        const initialType = accountSubTypes.filter(as => as.account_id == account_type)

        setFilterType(initialType[0].name)
    }, [])
    const handleFilterType = (typeID: string) => {
        setFilterType(typeID)
    }
    return (
        <div className='w-full'>
            <div className="mt-4 pl-4">

                <BreadCrubHeader activeAccountType={filterType} baseRoute='Liabilities' />
            </div>
            <div className="flex items-center py-4 gap-x-4">
  
                <Select onValueChange={handleFilterType} value={filterType}>
                    <SelectTrigger className="w-[200px] ">
                        <SelectValue placeholder={"Asset Account Type "} />

                    </SelectTrigger>
                    <SelectContent onCloseAutoFocus={e => e.preventDefault()}>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>

                            {accountSubTypes.map((as: SubAccountTypes) => as.account_id == account_type &&
                                <SelectItem key={as.name} value={as.name}>{as.name}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>

            {
                filterType.toLocaleLowerCase() === "sales" ? 
                <Sales accounts={accounts} /> :
                filterType.toLocaleLowerCase() ==="interest income" ?
                <InterestIncome accounts={accounts} />:
                filterType.toLocaleLowerCase() === "other income" ? <OtherIncome accounts={accounts} />:""
            }
        </div>
    )
}

export default Revenue
