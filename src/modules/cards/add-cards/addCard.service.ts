import { db } from "db/db";
import { cards } from "db/schema";
import type { AddCardDTO } from "./addCard.dto";

export const addCardService = async (params: Params) => {
  return await db.insert(cards).values({ ...params });
};

interface Params extends AddCardDTO {
  authorId: UUID;
}
