import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/auth";

// check user in db
const userInDb = async (email: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return false;
    }
    return true;
  } catch (e) {
    // log with context
    console.error("[userInDb] unexpected error:", e);
    throw new Error("Failed to check user. Please try again later.");
  }
};
// create a new user
const createUser = async (data: UserType) => {
  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        pic: data.pic,
        bio: data.bio,
        streamkey: data.streamkey,
      },
    });
  } catch (e) {
    // more specific error handling
    if (e instanceof Error && e.message.includes("Unique constraint")) {
      throw new Error("A user with that email already exists.");
    }
    // log with context
    console.error("[createUser] unexpected error:", e);
    throw new Error("Failed to create user. Please try again later.");
  }
};

// get user by email
const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (e) {
    if (e instanceof Error && e.message.includes("Not found")) {
      throw new Error("User not found.");
    }
    // log with context
    console.error("[getUser] unexpected error:", e);
    throw new Error("Failed to get user. Please try again later.");
  }
};

export { createUser, userInDb, getUser };
