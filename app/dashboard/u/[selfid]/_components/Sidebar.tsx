import { Key, MonitorPlay, Play, Trophy } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { clerkUserDetail } from "@/lib/user";
import { getUserByEmailAction } from "@/server/actions/userAction";

// Menu items.
const items = [
  {
    title: "Stream Key",
    url: "/key",
    icon: Key,
  },
  {
    title: "Stream",
    url: "/stream",
    icon: Play,
  },
  {
    title: "Achievements",
    url: "/achievement",
    icon: Trophy,
  },
  {
    title: "Studio",
    url: "/studio",
    icon: MonitorPlay,
  },
];

export async function DashSidebar() {
  const { email } = await clerkUserDetail();
  if (!email) return null;
  const user = await getUserByEmailAction(email);
  return (
    <Sidebar className="top-15 min-h-screen ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="font-bold text-4xl"
                >
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/u/${user?.id}/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
