// import Home from "@/components/pages/Home/Index";
import { clerkUserDetail } from "@/lib/user";
import { createUserAction, userInDbAction } from "@/server/actions/userAction";
import { UserType } from "@/types/user";
export default async function Home() {
  const { email, name, pic } = await clerkUserDetail();
  const userindb = await userInDbAction(email as string);
  if (userindb === false && email && name) {
    const data: UserType = {
      name,
      email,
      pic,
    };
    await createUserAction(data);
  }
  return <div>hello</div>;
}
