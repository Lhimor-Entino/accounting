import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Account, AccountTypes, PageProps, SubAccountTypes } from "@/types"
import { usePage } from "@inertiajs/react"
import { getAccountSubType } from "@/utils/globalUtils"
import CashOnBankTable from "../Tables&List/assets/CashOnBankTable"
import CashOnHandList from "../Tables&List/assets/CashOnHandList"
import AccountReceivableList from "../Tables&List/assets/AccountReceivableList"
import AdvancesToEmployeesList from "../Tables&List/assets/AdvancesToEmployeesList"
import AdvancesToOfficersList from "../Tables&List/assets/AdvancesToOfficersList"
import OfficeSuppliesInventoryList from "../Tables&List/assets/OfficeSuppliesInventoryList"
import ComputerSuppliesInventoryList from "../Tables&List/assets/ComputerSuppliesInventoryList"
import FurnituresAndFixturesList from "../Tables&List/assets/FurnituresAndFixturesList"
import ComputerEquipmentsList from "../Tables&List/assets/ComputerEquipmentsList"
import VehicleList from "../Tables&List/assets/VehicleList"
import LeaseHoldImprovementList from "../Tables&List/assets/LeaseHoldImprovementList"
import PropertiesList from "../Tables&List/assets/PropertiesList"
import BreadCrubHeader from "../BreadCrubHeader"

interface Props {
    accounts: Account[]
    account_type: number
}

const Assets = (props: Props) => {
    const { accounts,account_type } = props
    const { accountSubTypes } = usePage<PageProps>().props
    const [filterType, setFilterType] = React.useState<string>("1")
    const [activeAccountType, setActiveAccountType] = React.useState<string>("")

    const handleFilterType = (typeID: string) => {
        setFilterType(typeID)
    }
    React.useEffect(() => {
        const activeType = getAccountSubType(accountSubTypes, parseInt(filterType))
        setActiveAccountType(activeType)
    }, [filterType])

    return (
        <div className="w-full">
            <div className="mt-4 pl-4">
        
                <BreadCrubHeader activeAccountType={activeAccountType} baseRoute={"Assets"} />
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
                                <SelectItem key={as.name} value={as.id.toString()}>{as.name}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>

            {
                filterType == "1" ? <CashOnBankTable accounts={accounts} /> :
                filterType == "2" ? <CashOnHandList accounts={accounts} /> :
                filterType == "3" ? <AccountReceivableList accounts={accounts} /> :
                filterType == "4" ? <AdvancesToEmployeesList accounts={accounts} /> :
                filterType == "5" ?  <AdvancesToOfficersList accounts={accounts} />:
                filterType == "6" ?  <OfficeSuppliesInventoryList accounts={accounts} /> :
                filterType == "7"? <ComputerSuppliesInventoryList accounts={accounts} />:
                filterType == "8"? <FurnituresAndFixturesList accounts={accounts} />: 
                filterType == "9"? <ComputerEquipmentsList accounts={accounts} />:
                filterType == "10"? <VehicleList accounts={accounts} />:
                filterType == "11"? <LeaseHoldImprovementList accounts={accounts} />: 
                filterType == "12"? <PropertiesList accounts={accounts} />:   ""
            }
        </div>
    )
}

export default Assets