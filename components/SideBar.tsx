"use client";

import { Home, Compass, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

const recommended = [
  { name: "JimothyBilliams", viewers: 914, category: "Just Chatting" },
  { name: "SamXFrank", viewers: 1800, category: "IRL" },
  { name: "iceinmyvein", viewers: 1100, category: "Slots & Casino" },
  { name: "12amcupid", viewers: 449, category: "Slots & Casino" },
  { name: "pr3s5ure", viewers: 227, category: "Fortnite Zero Build" },
  {
    name: "ToriProductions",
    viewers: 122,
    category: "World of Warcraft Clas...",
  },
  { name: "ExtraStreamer1", viewers: 95, category: "Chess" },
  { name: "ExtraStreamer2", viewers: 87, category: "Music" },
];

export default function Sidebar() {
  const [collapsed] = useState(false); // use for collaspable sidebar might implement later
  const [showAll, setShowAll] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-black text-white transition-width duration-300",
        collapsed ? "w-16" : "w-64",
        "min-h-screen", // ensure full viewport height
      )}
    >
      {/* Main nav */}
      <div className="flex flex-col px-2 space-y-1">
        <NavItem icon={<Home size={18} />} label="Home" collapsed={collapsed} />
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
        <div className="flex flex-col p-4 space-y-3">
          {!collapsed && (
            <>
              <h3 className="text-sm text-green-500 font-semibold">
                Recommended
              </h3>
              <ul className="flex-1 space-y-3 overflow-auto">
                {(showAll ? recommended : recommended.slice(0, 4)).map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between hover:cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-semibold">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.category}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs">
                        {s.viewers.toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
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
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}
