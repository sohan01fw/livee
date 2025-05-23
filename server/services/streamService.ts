import { prisma } from "@/lib/prisma";
import { StreamType } from "@/types/stream";
import { Prisma } from "@prisma/client";

const createStream = async (data: StreamType) => {
  try {
    if (!data.userId) throw new Error("User ID is required");
    await prisma.streams.create({
      data: {
        title: data.title || "",
        thumbnail: data.thumbnail ?? null,
        roomid: data.roomid ?? null,
        streamkey: data.streamkey ?? null,
        streamurl: data.streamurl ?? null,
        startedAt: data.startedAt ?? null,
        endedAt: data.endedAt ?? null,
        userId: data.userId!, // add ! only if you're 100% sure it's defined
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", e.code);
    }
    // log with context
    console.error("[createStream] unexpected error:", e);
    throw new Error("Failed to create stream. Please try again later.");
  }
};

const getStreamsByUserId = async (userId: string) => {
  try {
    const streams = await prisma.streams.findMany({
      where: {
        userId: userId, // specify the user
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return streams;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error code:", e.code);
    }
    // log with context
    console.error("[getAllStreams] unexpected error:", e);
    throw new Error("Failed to get streams. Please try again later.");
  }
};

export { createStream, getStreamsByUserId };
