import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { CATEGORIES } from "./drafts/categories.draft";
import { accounts, categories } from "./schema";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);

  await db.delete(categories).execute();
  await db.insert(categories).values(CATEGORIES);
};

seed().catch(console.error);
