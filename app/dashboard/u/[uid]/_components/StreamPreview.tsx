"use client";
import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/lib/hooks/useViewerToken";
import VideoStream from "./Video";
import { streamsType } from "@/types/stream";

export function StreamPreview({ stream }: { stream: streamsType }) {
  // Helper to open popout windows
  // function openPopout(name: string, url: string) {
  //   window.open(url, name, "width=400,height=600,resizable,scrollbars");
  // }
  const roomid = stream?.roomid || "";
  const uid = stream?.userId || "";
  const { Id, token, name } = useViewerToken(roomid, uid);
  //
  if (!Id || !token || !name) return <p>{Id}</p>;

  return (
    <LiveKitRoom
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL_wss!}
      token={token}
      connect={true}
    >
      <VideoStream hostName={stream.user.name} hostId={stream.user.id} />
    </LiveKitRoom>
  );
}
