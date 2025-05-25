import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./u/[uid]/_components/Navbar";
import { DashSidebar } from "./u/[uid]/_components/Sidebar";

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
