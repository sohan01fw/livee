import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

export default function VideoStream({
  hostName,
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
    content = <p>live video</p>;
  }
  return <div>{content}</div>;
}
