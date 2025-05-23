"use client";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Compass,
  Heart,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getAllUsersAction } from "@/server/actions/userAction";
import { User } from "@prisma/client";
import Image from "next/image";
import { UserType } from "@/types/user";

const fetcher = async () => await getAllUsersAction();
export default function Sidebar() {
  const [collapsed, setIsCollapsed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [recommended, setRecommended] = useState<UserType[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768); // 'md' is 768px
    };

    handleResize(); // run once on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, error, isLoading } = useSWR<User[]>("getalluser", fetcher);
  useEffect(() => {
    if (data) setRecommended(data);
  }, [data]);
  if (error) return <div>Error loading user</div>;
  return (
    <aside
      className={cn(
        "flex flex-col bg-black text-white transition-width duration-300  p-2 ",
        collapsed ? "w-15" : "w-64",
      )}
    >
      {/* Collapse button */}
      <div className="m-2 flex ">
        {!collapsed ? (
          <div
            className="ml-auto hover:cursor-pointer"
            onClick={() => setIsCollapsed(true)}
          >
            <ArrowLeftFromLine size={18} />
          </div>
        ) : (
          <div
            className=" hover:cursor-pointer"
            onClick={() => setIsCollapsed(false)}
          >
            <ArrowRightFromLine size={18} />
          </div>
        )}
      </div>
      {/* Main nav */}
      <div className="flex flex-col px-2 space-y-1">
        {/* <NavItem icon={<Home size={18} />} label="Home" collapsed={collapsed} /> */}
        <NavItem
          icon={<Compass size={18} />}
          label="Browse"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Heart size={18} />}
          label="Following"
          collapsed={collapsed}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 my-2" />
      {/* Scrollable recommendations */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col p-4 space-y-3    ">
          {!collapsed && (
            <>
              <h3 className="text-sm text-green-500 font-semibold">
                Recommended
              </h3>
              <ul className="flex-1 space-y-3 overflow-auto">
                {isLoading ? (
                  <div>loading...</div>
                ) : (
                  (showAll ? recommended : recommended.slice(0, 4)).map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between hover:cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <Image
                          src={s.pic ?? "https://picsum.photos/seed/picsum/200"}
                          width={33}
                          height={33}
                          alt="profile pic"
                          className="rounded-full"
                        />
                        <p className="text-sm font-semibold">{s.name}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm">100</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              {recommended.length > 6 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-2 text-xs text-green-500 hover:underline self-start"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  collapsed,
}: {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center cursor-pointer rounded-md px-2 py-2 hover:bg-green-500 hover:text-black transition-colors",
        collapsed ? "justify-center" : "gap-2",
      )}
    >
      {/* fix icon sizing so it never shrinks */}
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <span className=" text-sm font-medium ">{label}</span>}
    </div>
  );
}
