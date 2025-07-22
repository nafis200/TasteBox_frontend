import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar"
import Navbar1 from "@/components/shared/Navbar1"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Taste_box_Dashboard",
  description: "Meal Shop restaurant",
   icons: {
    icon: "/faviconz.ico", 
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar1 />
        <main className="p-4 pt-0 min-h-screen bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
