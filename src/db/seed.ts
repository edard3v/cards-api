import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { accounts } from "./schema";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);
};

seed().catch(console.error);
