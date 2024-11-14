
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
  import { Account } from "@/types"
  import { useEffect, useState } from "react"
  
  interface Props {
    accounts: Account[]
  }
  const AdvancesToOfficers = (props: Props) => {
    const { accounts } = props
    const [data, setData] = useState<Account[]>(accounts)
  
    // GET ALL ACCOUNT TYPE Account Receivable
    useEffect(() => {
      const filteredData = accounts.filter((a: Account) => a.account_sub_id === 14) // 14 HERE MEANS AdvancesToOfficers 
      setData(filteredData)
    }, [accounts])
    return (
      <Command className="rounded-lg border shadow-md md:min-w-[450px]" >
        <CommandInput placeholder="Type a command or search..." className=" focus:outline-none border-none " />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Account List">
            {
              data.map((dt: Account, index: number) => <CommandItem key={index}>
                <BanknoteIcon />
                <span>{dt.name}</span>
              </CommandItem>)
            }
  
          </CommandGroup>
          <CommandSeparator />
  
        </CommandList>
      </Command>
    )
  }
  
  export default AdvancesToOfficers

