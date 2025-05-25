import { Streams as PrismaStream } from "@prisma/client";
import { UserType } from "./user";

type Streams = Partial<
  Pick<
    PrismaStream,
    | "id"
    | "title"
    | "thumbnail"
    | "roomid"
    | "authid"
    | "streamurl"
    | "streamkey"
    | "isLive"
    | "startedAt"
    | "endedAt"
    | "userId"
  >
>;
interface streamsType extends Streams {
  user: UserType;
}

export { streamsType };
