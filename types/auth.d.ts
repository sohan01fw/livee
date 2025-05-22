import { User as PrismaUser } from "@prisma/client";

type User = Pick<PrismaUser, "name" | "email" | "pic" | "streamkey" | "bio">;

export { User };
