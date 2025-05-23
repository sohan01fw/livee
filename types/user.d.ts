import { User as PrismaUser } from "@prisma/client";

type UserType = Pick<PrismaUser, "name" | "email"> &
  Partial<Pick<PrismaUser, "id", "pic" | "bio">>;

export { UserType, StreamKeyAndUrlType };
