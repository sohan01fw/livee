import { currentUser } from "@clerk/nextjs/server";

const getSelf = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  return user;
};

export { getSelf };
