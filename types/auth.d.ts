import { User as PrismaUser } from "@prisma/client";

type UserType = Pick<PrismaUser, "name" | "email"> &
  Partial<Pick<PrismaUser, "pic" | "bio" | "streamkey">>;

export { UserType };
