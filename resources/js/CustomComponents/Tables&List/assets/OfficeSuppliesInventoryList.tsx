
import {
    Layers3Icon,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/Components/ui/command"
  import { Account } from "@/types"
  import { useEffect, useState } from "react"
  
  interface Props {
    accounts: Account[]
  }
const OfficeSuppliesInventoryList = (props: Props) => {
    const { accounts } = props
    const [data, setData] = useState<Account[]>(accounts)
  
    // GET ALL ACCOUNT TYPE Office Supplies Inventory
    useEffect(() => {
      const filteredData = accounts.filter((a: Account) => a.account_sub_id === 6) // 3 HERE MEANS OSI
      setData(filteredData)
    }, [accounts])
    return (
      <Command className="rounded-lg border shadow-md md:min-w-[450px]" >
        <CommandInput placeholder="Type a command or search..." className=" focus:outline-none border-none " />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Account List">
            {
              data.map((dt: Account, index: number) => <CommandItem>
                <Layers3Icon />
                <span>{dt.name}</span>
              </CommandItem>)
            }
  
          </CommandGroup>
          <CommandSeparator />
  
        </CommandList>
      </Command>
    )
}

export default OfficeSuppliesInventoryList