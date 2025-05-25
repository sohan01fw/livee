"use server";

import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressAudioOptions,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  IngressVideoOptions,
  RoomServiceClient,
  TrackSource,
} from "livekit-server-sdk";
import { v4 } from "uuid";
import { createStreamAction, getStreamByUserIdAction } from "../streamAction";
import { getSelf } from "../../services/auth.service";
import { getUserById } from "../../services/userService";

const ingressClient = new IngressClient(
  process.env.LIVEKIT_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const roomServiceClient = new RoomServiceClient(
  process.env.LIVEKIT_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

//create the ingress
export const createKeyUrl = async (userId: string): Promise<void> => {
  const room = await getStreamByUserIdAction(userId);
  //delete all ingress
  const roomname = String(room?.roomid);
  await deleteAllIngress(roomname);

  const user = await getUserById(userId);

  const roomId = v4();
  const ingressOptions: CreateIngressOptions = {
    name: "OBS Stream",
    roomName: roomId,
    participantIdentity: userId,
    participantName: user?.name || "",
    video: new IngressVideoOptions({
      source: TrackSource.CAMERA,
      encodingOptions: {
        case: "preset",
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    }),
    audio: new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: "preset",
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      },
    }),
  };

  const ingressData = await ingressClient.createIngress(
    IngressInput.RTMP_INPUT,
    ingressOptions,
  );
  if (!ingressData || !ingressData.url || !ingressData.streamKey) {
    throw new Error("Failed to create ingress");
  }
  const url = ingressData.url;
  const key = ingressData.streamKey;

  // get auth self id
  const selfid = await getSelf();
  // update the db with new key and url
  await createStreamAction({
    userId,
    roomid: roomId,
    authid: selfid?.id,
    streamkey: key,
    streamurl: url,
  });
};

//list the ingress data
export const getKeyUrl = async () => {
  const listIngress = await ingressClient.listIngress({});
  console.log("LIST INGRESS:", listIngress);
};

export interface KeyUrl {
  url: string;
  key: string;
}

// export const updateIngress = async () => {
//   await ingressClient.updateIngress(ingressData.ingressId,ingressOptions);
//   return ingressData;
// };

//delete single ingress

export const deleteIngress = async () => {
  // const target = ingresses.find((i) => i.ingressId === "IN_piPLyAWcjdSF");
  // console.log(target);
  // if (target) {
  //   await ingressClientSide.deleteIngress(target.ingressId);
  // }
};
export const deleteAllIngress = async (roomName: string) => {
  const ingresses = await ingressClient.listIngress({ roomName });
  const rooms = await roomServiceClient.listRooms([roomName]);

  for (const room of rooms) {
    await roomServiceClient.deleteRoom(room.name);
  }
  // delete in parallel
  for (const ingr of ingresses) {
    await ingressClient.deleteIngress(ingr.ingressId);
  }
};
