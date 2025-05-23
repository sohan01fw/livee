import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { DashSidebar } from "./u/[selfid]/_components/Sidebar";
import { Navbar } from "./u/[selfid]/_components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "livee dashboard",
  description: "The livee dashboard to stream, achievements, and more.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <aside>
      <Navbar />
      <SidebarProvider>
        <DashSidebar />
        <main>{children}</main>
        <Toaster />
      </SidebarProvider>
    </aside>
  );
}
