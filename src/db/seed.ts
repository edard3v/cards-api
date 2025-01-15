import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { CARDS } from "./drafts/cards.draft";
import { CATEGORIES } from "./drafts/categories.draft";
import { accounts, cards, categories } from "./schema";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);

  await db.delete(categories).execute();
  await db.insert(categories).values(CATEGORIES);

  await db.delete(cards).execute();
  await db.insert(cards).values(CARDS);
};

seed().catch(console.error);
