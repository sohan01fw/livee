"use server";
import { StreamType } from "@/types/stream";
import { createStream, getStreamsByUserId } from "../services/streamService";

const createStreamAction = async (data: StreamType) => {
  return await createStream(data);
};
const getStreamByUserIdAction = async (userId: string) => {
  return await getStreamsByUserId(userId);
};

export { createStreamAction, getStreamByUserIdAction };
