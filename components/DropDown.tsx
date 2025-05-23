"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust if path is different

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // optional: for profile icon
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserByEmailAction } from "@/server/actions/userAction";

export function UserDropdown({ email }: { email: string | undefined }) {
  const [userId, setUserId] = useState<string>();
  useEffect(() => {
    if (email) {
      const getUserId = async () => {
        const userRes = await getUserByEmailAction(email);
        setUserId(userRes?.id);
      };
      getUserId();
    }
  }, [email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={`/dashboard/u/${userId}/stream`}>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export function DashboardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <Link href="/">
          <DropdownMenuItem>Back to Home</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <SignOutButton>Logout</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
