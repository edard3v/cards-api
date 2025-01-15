import { db } from "db/db";
import { cards } from "db/schema";

export const getCardsService = async () => {
  return await db.select().from(cards);
};
