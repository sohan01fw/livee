// app/actions/userActions.ts
"use server";

import { UserType } from "@/types/user";
import {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  userInDb,
} from "../services/userService";

async function userInDbAction(email: string) {
  return await userInDb(email);
}
async function createUserAction(data: UserType) {
  return await createUser(data);
}

async function getUserByEmailAction(email: string) {
  return await getUserByEmail(email);
}

async function getUserByIdAction(id: string) {
  return await getUserById(id);
}

async function getAllUsersAction() {
  return await getAllUsers();
}

export {
  createUserAction,
  userInDbAction,
  getUserByEmailAction,
  getUserByIdAction,
  getAllUsersAction,
};
