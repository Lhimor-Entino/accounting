
import {
  BanknoteIcon,
  Calculator,
  Calendar,
  CreditCard,
  IdCardIcon,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/Components/ui/command"
import { Account, PageProps } from "@/types"
import { useEffect, useState } from "react"
import { usePage } from "@inertiajs/react"

interface Props {
  accounts: Account[]
}
const AccountPayableList = (props: Props) => {
  const { accounts } = props
  const [data, setData] = useState<Account[]>(accounts)

  // GET ALL ACCOUNT TYPE Account Receivable
  useEffect(() => {
    const filteredData = accounts.filter((a: Account) => a.account_sub_id === 13) // 3 HERE MEANS AR
    setData(filteredData)
  }, [accounts])
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]" >
      <CommandInput placeholder="Type a command or search..." className=" focus:outline-none border-none " />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Account List">
          {
            data.map((dt: Account, index: number) => <CommandItem key={index} className="flex gap-x-3">

              <div className="flex items-center gap-x-2">
                <BanknoteIcon />
                <span>{dt.name}</span>
              </div>
              <span className="bg-slate-200 p-1 pr-3 pl-3 rounded-sm text-xs"> Source of Fund ( {dt.account_payables_source_of_fund?.bank_name} )</span>
            </CommandItem>)
          }

        </CommandGroup>
        <CommandSeparator />

      </CommandList>
    </Command>
  )
}

export default AccountPayableList
