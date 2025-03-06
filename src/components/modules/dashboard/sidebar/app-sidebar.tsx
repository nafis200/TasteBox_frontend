"use client"

import * as React from "react"
import {
  Bot,
  SquareTerminal,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
// This is sample data.
const data = {
  navMain: [
    {
      title: "Meal Options",
      url: "/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Make Meal",
          url: "/admin/dashboard/createmeal",
        },
        {
          title: "Updated Meal",
          url: "/admin/dashboard/updatemeal",
        },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      items: [
        {
          title: "View Order",
          url: "/admin/dashboard/vieworder",
        },
        {
          title: "Payment Order",
          url: "/admin/dashboard/paymentorder",
        },
      ],
      icon: Bot,
    },
  ],
  navMainuser: [
    {
      title: "Meal Options",
      url: "/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "prefer Meal",
          url: "/user/dashboard/prefermeal",
        },
        {
          title: "View and update",
          url: "/user/dashboard/preferviewmeal",
        },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      items: [
        {
          title: "Payment Order details",
          url: "/user/dashboard/preferpaymentorder",
        },
        {
          title: "View Order details",
          url: "/user/dashboard/prefervieworder",
        },
      ],
      icon: Bot,
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user} = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">Meal Box</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {
           user?.jwtPayload?.role === 'user' ? <NavMain items={data.navMainuser} /> : <NavMain items={data.navMain} />
        }
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
