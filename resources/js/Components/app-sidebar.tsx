import { BriefcaseBusinessIcon, Building2Icon, Calendar, CreditCardIcon, Home, Inbox, LayoutDashboardIcon, NotebookPenIcon, Search, Settings, UserCog2Icon } from "lucide-react"

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
    title: "Dashboard",
    url: "welcome",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Accounts",
    url: "accounts.show",
    icon: CreditCardIcon,
  },
  {
    title: "Journal Entry ",
    url: "entry.show",
    icon: NotebookPenIcon,
  },
  {
    title: "General Ledger ",
    url: "ledger.show",
    icon: BriefcaseBusinessIcon,
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
                 
                          
                        <Link href={route(item.url)} >
                           <item.icon className="w-4 h-5" />
                          {item.title}
                        </Link>

                     

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
