"use client";
import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/lib/hooks/useViewerToken";
import VideoStream from "./Video";
import { streamsType } from "@/types/stream";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Helper to open popout windows
function openPopout(name: string, url: string) {
  window.open(url, name, "width=400,height=600,resizable,scrollbars");
}

export function StreamBoard({ stream }: { stream: streamsType }) {
  const roomid = stream?.roomid || "";
  const uid = stream?.userId || "";
  const { Id, token, name } = useViewerToken(roomid, uid);
  //
  if (!Id || !token || !name) return <p>{Id}</p>;
  // Activity Feed Component
  function ActivityFeed() {
    return (
      <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col min-h-[30rem]">
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
            We will show your new follows, subs, cheers, and raids activity
            here.
          </p>
        </div>
      </Card>
    );
  }

  // Chat Window Component
  function ChatWindow() {
    return (
      <Card className="bg-zinc-900 p-4 rounded-2xl flex flex-col min-h-[30rem]">
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
  const StreamsLayout = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-white">Stream Preview</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openPopout("livestream", "/popout/livestream")}
          >
            Popout
          </Button>
        </div>
        <LiveKitRoom
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL_wss!}
          token={token}
          connect={true}
          className="min-h-[20rem]"
        >
          <VideoStream hostName={stream.user.name} hostId={stream.user.id} />
        </LiveKitRoom>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
      <div className="col-span-1 max-h-[30rem]">
        <StreamsLayout />
      </div>
      <div className="col-span-1  max-h-auto overflow-scroll-y">
        <ActivityFeed />
      </div>
      <div className="col-span-1 max-h-auto overflow-scroll-y">
        <ChatWindow />
      </div>
    </div>
  );
}
