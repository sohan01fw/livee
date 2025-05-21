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
export const createKeyUrl = async (): Promise<KeyUrl> => {
  const ingressOptions: CreateIngressOptions = {
    name: "OBS Stream",
    roomName: "livee-room-1",
    participantIdentity: "obs-streamer",
    bypassTranscoding: true,
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
  //delete all ingress
  const roomname = String(ingressOptions.roomName);
  await deleteAllIngress(roomname);
  const ingressData = await ingressClient.createIngress(
    IngressInput.RTMP_INPUT,
    ingressOptions,
  );
  if (!ingressData || !ingressData.url || !ingressData.streamKey) {
    throw new Error("Failed to create ingress");
  }
  const url = ingressData.url;
  const key = ingressData.streamKey;

  return {
    url,
    key,
  };
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
