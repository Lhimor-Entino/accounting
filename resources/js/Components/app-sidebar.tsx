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
import { usePage } from "@inertiajs/inertia"
import { Link } from '@inertiajs/react';

import ActiveLink from "@/CustomComponents/ActiveLink";

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
    url: "company.show",
    icon: Building2Icon,
  },
  {
    title: "Settings",
    url: "settings.show",
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
                 
                          <ActiveLink href={item.url} title={item.title} >
                          <item.icon className="w-4 h-5" />
                          {item.title}
                          </ActiveLink>
                        {/* <Link href={} >
                      
                        </Link> */}

                     

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
