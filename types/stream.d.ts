import { Streams as PrismaStream } from "@prisma/client";

type StreamType = Partial<
  Pick<
    PrismaStream,
    | "id"
    | "title"
    | "thumbnail"
    | "roomid"
    | "streamurl"
    | "streamkey"
    | "isLive"
    | "startedAt"
    | "endedAt"
    | "userId"
  >
>;

export { StreamType };
