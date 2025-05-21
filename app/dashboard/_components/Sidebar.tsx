import {
  Key,
  MonitorPlay,
  Play,
  Settings,
  Trophy,
  UserPen,
} from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "Stream Key",
    url: "/dashboard/key",
    icon: Key,
  },
  {
    title: "Stream",
    url: "/dashboard/stream",
    icon: Play,
  },
  {
    title: "Achievements",
    url: "/dashboard/achievement",
    icon: Trophy,
  },
  {
    title: "Studio",
    url: "/dashboard/studio",
    icon: MonitorPlay,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserPen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function DashSidebar() {
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
                    <Link href={item.url}>
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
