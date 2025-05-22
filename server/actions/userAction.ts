// app/actions/userActions.ts
"use server";

import { UserType } from "@/types/auth";
import { createUser, getUser, userInDb } from "../services/userService";

async function userInDbAction(email: string) {
  return await userInDb(email);
}
async function createUserAction(data: UserType) {
  return await createUser(data);
}

async function getUserAction(email: string) {
  return await getUser(email);
}

export { createUserAction, userInDbAction, getUserAction };
