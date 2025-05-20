"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Helper to open popout windows
function openPopout(name: string, url: string) {
  window.open(url, name, "width=400,height=600,resizable,scrollbars");
}

// Stream Preview Component
function StreamPreview() {
  return (
    <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">Stream Preview</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openPopout("StreamPreview", "/popout/stream")}
        >
          Popout
        </Button>
      </div>
      <div className="bg-black h-48 rounded-lg flex items-center justify-center text-zinc-400">
        OFFLINE
      </div>
      <div className="mt-2 text-center text-sm text-zinc-400">OFFLINE</div>
    </Card>
  );
}

// Activity Feed Component
function ActivityFeed() {
  return (
    <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">Activity Feed</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openPopout("ActivityFeed", "/popout/activity")}
        >
          Popout
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto text-zinc-400 text-sm">
        <p className="italic">It is quiet. Too quiet...</p>
        <p className="mt-1">
          We will show your new follows, subs, cheers, and raids activity here.
        </p>
      </div>
    </Card>
  );
}

// Chat Window Component
function ChatWindow() {
  return (
    <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-white">My Chat</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openPopout("ChatWindow", "/popout/chat")}
        >
          Popout
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="text-zinc-400 text-xs">
          10:52 <span className="text-green-500">sohan12cwact:</span> hi
        </div>
        <div className="text-zinc-400 text-sm italic">
          Welcome to the chat room!
        </div>
      </div>
    </Card>
  );
}

// Main Dashboard Layout
export default function DashboardLayout() {
  return (
    <main className="grid grid-cols-3 h-screen gap-2 p-2 bg-black text-white">
      <StreamPreview />
      <ActivityFeed />
      <ChatWindow />
    </main>
  );
}
