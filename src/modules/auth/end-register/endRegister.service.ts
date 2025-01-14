import { db } from "../../../db/db";
import { accounts } from "../../../db/schemas";
import type { StartRegisterDTO } from "../start-register/startRegister.dto";

export const endRegisterService = async (newAccount: StartRegisterDTO) => {
  await db.insert(accounts).values({ ...newAccount });
};
