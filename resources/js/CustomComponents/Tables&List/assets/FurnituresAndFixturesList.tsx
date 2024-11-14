
import { ArmchairIcon, EyeIcon, } from "lucide-react"
import {Command, CommandEmpty, CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,} from "@/Components/ui/command"
import { Account } from "@/types"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"


interface Props {
  accounts: Account[]
}
const FurnituresAndFixturesList = (props: Props) => {
  const { accounts } = props
  const [data, setData] = useState<Account[]>(accounts)

  // GET ALL ACCOUNT TYPE Furnitures And Fixtures
  useEffect(() => {
    const filteredData = accounts.filter((a: Account) => a.account_sub_id === 8) // 7 HERE MEANS FF
    setData(filteredData)
  }, [accounts])
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]" >
      <CommandInput placeholder="Type a command or search..." className=" focus:outline-none border-none " />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Account List">
          {
            data.map((dt: Account, index: number) => 
            <CommandItem key={index} className="flex justify-between" >
              <div className="flex items-center  gap-2">
              <ArmchairIcon />
              <span>{dt.name}</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer rounded-sm  p-[1px] pl-2 pr-2 ">
                <EyeIcon className=" text-gray-500" />
                <p className=" text-gray-500">View Item Breakdown</p>
              </div>
            
            </CommandItem>
            )
          }

        </CommandGroup>
        <CommandSeparator />

      </CommandList>
    </Command>
  )
}

export default FurnituresAndFixturesList
