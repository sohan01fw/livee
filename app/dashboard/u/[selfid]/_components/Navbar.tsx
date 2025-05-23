"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { DashboardDropdown } from "@/components/DropDown";

export const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo and Desktop Navigation */}
        <h2 className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* You can replace this with an SVG logo or an Image component */}
            <span className="font-bold text-2xl text-green-500">livee</span>
            <span className="font-bold text-sm text-primary hidden sm:inline-block">
              ™
            </span>
          </Link>
          {/* Desktop navigation items can go here if needed */}
        </h2>

        {/* Desktop Auth Buttons */}
        {isSignedIn && <DashboardDropdown />}
      </div>
    </header>
  );
};
