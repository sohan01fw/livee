// app/actions/userActions.ts
"use server";

import { User } from "@/types/auth";
import { createUser } from "../services/userService";

export async function createUserAction(data: User) {
  return await createUser(data);
}
