import { currentUser } from "@clerk/nextjs/server";

const clerkUserDetail = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  return { name: user?.firstName, email, pic: user?.imageUrl };
};

export { clerkUserDetail };
