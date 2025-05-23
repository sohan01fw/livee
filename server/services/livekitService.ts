import { prisma } from "@/lib/prisma";
import { StreamKeyAndUrlType } from "@/types/user";
import { Prisma } from "@prisma/client";

export const updateKeyAndUrl = async (data: StreamKeyAndUrlType) => {
  console.log("UPDATE KEY AND URL lamoo:", data);
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        streamkey: data.streamkey,
        streamurl: data.streamurl,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", e.code);
    }

    // log with context
    console.error("[getUser] unexpected error:", e);
    throw new Error("Failed to update user. Please try again later.");
  }
};
