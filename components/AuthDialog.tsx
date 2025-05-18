// components/AuthDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignedOut, SignIn } from "@clerk/nextjs";

export function AuthDialog({ type }: { type: "login" | "signup" }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={type === "login" ? "ghost" : "default"}
          className={
            type === "signup"
              ? "bg-green-500 hover:bg-green-600 text-black"
              : ""
          }
        >
          {type === "login" ? "Log In" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-500 text-xl font-bold">
            {type === "login" ? "Welcome to Livee" : "Join Livee"}
          </DialogTitle>
        </DialogHeader>

        {type === "signup" ? (
          <div>
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
          </div>
        ) : (
          <div>
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
