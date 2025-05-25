import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import Livevideo from "./Livevideo";

export default function VideoStream({
  // hostName,
  hostId,
}: {
  hostName: string;
  hostId: string;
}) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((t) => t.participant.identity === hostId);

  let content;
  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p> offline</p>;
  } else if (!participant || tracks.length === 0) {
    content = <p> loading...</p>;
  } else {
    content = <Livevideo participant={participant} />;
  }
  return <div>{content}</div>;
}
