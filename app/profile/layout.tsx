import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "livee-profile",
  description: "This is live stream platform",
};

export default function IndexLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="grid grid-rows-[auto_1fr] h-screen">
        <nav className="row-span-1 col-span-full">
          <Navbar />
        </nav>
        <div className="grid grid-cols-[250px_1fr] h-full">
          <aside className=" w-[17rem] h-[70vh]  overflow-hidden overflow-y-scroll ">
            <Sidebar />
          </aside>
          <main className="overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
