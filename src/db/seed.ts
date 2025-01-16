import { db } from "./db";
import { ACCOUNTS } from "./drafts/accounts.draft";
import { CARDS } from "./drafts/cards.draft";
import { CATEGORIES } from "./drafts/categories.draft";
import { PACKS } from "./drafts/packs.draft";
import { accounts, cards, categories, packs } from "./schema";

const seed = async () => {
  await db.delete(cards).execute();
  await db.delete(categories).execute();
  await db.delete(accounts).execute();
  await db.delete(packs).execute();

  await db.insert(accounts).values(ACCOUNTS);
  await db.insert(categories).values(CATEGORIES);
  await db.insert(cards).values(CARDS);
  await db.insert(packs).values(PACKS);
};

seed().catch(console.error);
