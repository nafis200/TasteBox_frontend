"use client";

import * as React from "react";
import {
  Home,
  Coffee,
  ClipboardList,
  Tag,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const data = {
  navMain: [
    {
      title: "Dashboard Home",
      url: "#",
      icon: Home,
      items: [
        {
          title: "Home page",
          url: "/admin/dashboard",
        },
        {
          title: "ProfilePage",
          url: "/admin/dashboard/home",
        },
      ],
      isActive: true,
    },
    {
      title: "Meal Options",
      url: "#",
      icon: Coffee,
      isActive: true,
      items: [
        {
          title: "Make Meal",
          url: "/admin/dashboard/createmeal",
        },
        {
          title: "Update Meal",
          url: "/admin/dashboard/updatemeal",
        },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      icon: ClipboardList,
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
    },
    {
      title: "Cupon Options",
      url: "#",
      icon: Tag,
      items: [
        {
          title: "Create Cupon",
          url: "/admin/dashboard/cupon/create",
        },
        {
          title: "Delete Cupon",
          url: "/admin/dashboard/cupon/viewcoupon",
        },
      ],
    },
  ],
  navMainuser: [
     {
      title: "Dashboard Home",
      url: "#",
      icon: Home,
      items: [
        {
          title: "Home page",
          url: "/user/dashboard",
        },
        {
          title: "ProfilePage",
          url: "/user/dashboard/home",
        },
      ],
      isActive: true,
    },
    {
      title: "Meal Options",
      url: "#",
      icon: Coffee,
      isActive: true,
      items: [
        {
          title: "Prefer Meal",
          url: "/user/dashboard/prefermeal",
        },
        {
          title: "View and Update",
          url: "/user/dashboard/preferviewmeal",
        },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Payment Order Details",
          url: "/user/dashboard/preferpaymentorder",
        },
        {
          title: "View Order Details",
          url: "/user/dashboard/prefervieworder",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

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
        {user?.jwtPayload?.role === "user" ? (
          <NavMain items={data.navMainuser} />
        ) : (
          <NavMain items={data.navMain} />
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
