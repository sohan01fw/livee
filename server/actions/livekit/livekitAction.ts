"use server";
import { updateKeyAndUrl } from "@/server/services/livekitService";
import { StreamKeyAndUrlType } from "@/types/user";

async function updateKeyAndUrlAction(data: StreamKeyAndUrlType) {
  console.log("okbro", data);
  return await updateKeyAndUrl(data);
}

export { updateKeyAndUrlAction };
