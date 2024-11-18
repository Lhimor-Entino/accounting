import { Building2Icon, Calendar, CreditCardIcon, Home, Inbox, NotebookPenIcon, Search, Settings, UserCog2Icon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

import { Inertia } from "@inertiajs/inertia"
import { Link } from '@inertiajs/react';

import ActiveLink from "@/CustomComponents/ActiveLink";
import { Button } from "./ui/button";
import User from "@/CustomComponents/Navigation/User";
// Menu items.
const items = [
  {
    title: "Home",
    url: "welcome",
    icon: Home,
  },
  {
    title: "Accounts",
    url: "accounts.show",
    icon: CreditCardIcon,
  },
  {
    title: "Journal Entry ",
    url: "accounts.show",
    icon: NotebookPenIcon,
  },
  {
    title: "Users",
    url: "users.show",
    icon: UserCog2Icon,
  },
  {
    title: "Companies",
    url: "accounts.show",
    icon: Building2Icon,
  },
  {
    title: "Settings",
    url: "accounts.show",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="">
        <User />
        <SidebarGroup>
          <SidebarGroupLabel >Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {items.map((item) =>

                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {
                      item.title !== 'Settings' ? (
                   
                        <Link href={route(item.url)} >
                           <item.icon className="w-4 h-5" />
                          {item.title}
                        </Link>

                      ) : <Popover>
                        <PopoverTrigger className="flex gap-2 ml-2">

                          <item.icon className="w-4 h-5" />
                          <span>{item.title}</span>
                        </PopoverTrigger>
                        <PopoverContent >
                          <Button onClick={() => Inertia.post(route('logout'))} >log out</Button>
                        </PopoverContent>
                      </Popover>
                    }

                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
