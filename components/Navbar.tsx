"use client";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button is here
import { Input } from "@/components/ui/input"; // Assuming shadcn/ui Input is here
import { AuthDialog } from "./AuthDialog";
import { useUser } from "@clerk/nextjs";
import { UserDropdown } from "./DropDown";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* You can replace this with an SVG logo or an Image component */}
            <span className="font-bold text-2xl text-green-500">livee</span>
            <span className="font-bold text-sm text-primary hidden sm:inline-block">
              ™
            </span>
          </Link>
          {/* Desktop navigation items can go here if needed */}
        </div>

        {/* Search Bar - Centered for larger screens */}
        <div className="flex-1 flex justify-center px-4 lg:px-8">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background min-w-40"
              />
            </div>
          </div>
        </div>

        {/* notifications icon */}
        <div className="mx-4 hover:cursor-pointer ">
          <Bell size={20} />
        </div>
        {/* Desktop Auth Buttons */}
        {!isSignedIn ? (
          !isLoaded ? (
            <div>Loading...</div>
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Button variant="ghost" asChild>
                <AuthDialog type="login" />
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-black"
                asChild
              >
                <AuthDialog type="signup" />
              </Button>
            </div>
          )
        ) : (
          <UserDropdown />
        )}
      </div>
    </header>
  );
};

export default Navbar;
