import { User as PrismaUser } from "@prisma/client";

type UserType = Pick<PrismaUser, "name" | "email"> &
  Partial<Pick<PrismaUser, "id", "pic" | "bio" | "streamkey" | "streamurl">>;

interface StreamKeyAndUrlType extends UserType {
  id: string;
  streamkey: string;
  streamurl: string;
}
export { UserType, StreamKeyAndUrlType };
