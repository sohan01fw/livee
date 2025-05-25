"use server";
// app/api/livekit/token/route.ts (example for route handler)

import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";
import { getSelf } from "../../services/auth.service";
import { getStreamsByUserId } from "../../services/streamService";

export async function Token(uid: string, roomId: string) {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const userName = `Guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, name: userName };
  }

  const host = await getStreamsByUserId(uid);
  if (!host) {
    throw new Error("No host found");
  }
  const isHost = host.authid === self?.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: host ? `host-${self?.id}` : self?.id,
      name: self?.firstName ?? "",
    },
  );

  token.addGrant({
    room: roomId,
    roomJoin: true,
    canPublish: isHost,
    canPublishData: true,
    canSubscribe: true,
  });

  return Promise.resolve({ token: await token.toJwt() });
}
