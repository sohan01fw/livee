// import Home from "@/components/pages/Home/Index";
import { currentUser } from "@clerk/nextjs/server";
import { createUserAction, userInDbAction } from "@/server/actions/userAction";
import { UserType } from "@/types/auth";
export default async function Home() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;
  const userindb = await userInDbAction(email as string);
  if (userindb === false) {
    const data: UserType = {
      name: user?.firstName,
      email: user?.emailAddresses[0]?.emailAddress,
      pic: user?.imageUrl,
    };
    await createUserAction(data);
  }
  return <div>hello</div>;
}
