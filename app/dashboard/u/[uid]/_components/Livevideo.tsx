import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useRef } from "react";

export default function Livevideo({
  participant,
}: {
  participant: Participant;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((t) => t.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" height="100%" />
    </div>
  );
}
