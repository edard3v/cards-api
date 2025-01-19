import { db } from "db/db";
import { cards } from "db/schema";

export const addCardService = async (params: Params) => {
  return await db.insert(cards).values({ ...params });
};

type Params = {
  authorId: UUID;
  name: string;
  back: string;
  categoryId: string;
  front?: string;
  img?: string;
  audio?: string;
};
