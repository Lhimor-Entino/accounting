import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/Components/ui/menubar"
import { useIsMobile } from "@/hooks/use-mobile"
import { CreditCardIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Link, usePage } from "@inertiajs/react"
import { AccountTypes, PageProps } from "@/types"
import { Inertia } from "@inertiajs/inertia"
interface Props {
    account_type: number
}

const FinancialStatements = (props: Props) => {
    const { account_type } = props
    const { accountTypes } = usePage<PageProps>().props

    return (
        <>
            {useIsMobile() ?
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="w-full">Accout Types</MenubarTrigger>
                        <MenubarContent >

                            {
                                accountTypes.map((at: AccountTypes) => (
                                    <MenubarItem >
                                        <Link href={route('accounts.show', { id: at.id })}>
                                            {at.name}
                                        </Link>
                                    </MenubarItem>

                                ))
                            }


                        </MenubarContent>
                    </MenubarMenu>


                </Menubar>
                :
                <Menubar >
                    <MenubarMenu >
                        <MenubarTrigger disabled className=" text-gray-400 border-r-2 hover:text-gray-400"><CreditCardIcon /></MenubarTrigger>
                    </MenubarMenu>
                    {
                        accountTypes.map((at: AccountTypes) =>
                            <MenubarMenu key={at.name} >
                                <MenubarTrigger className={`${account_type == at.id ? "bg-slate-900 text-white" : "bg-none"} cursor-pointer`}>
                                    <Link
                                        className={` w-full`}
                                        href={route('accounts.show', { id: at.id })}
                                    >
                                        {at.name}
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>
                        )
                    }

                </Menubar>}

        </>


    )
}

export default FinancialStatements