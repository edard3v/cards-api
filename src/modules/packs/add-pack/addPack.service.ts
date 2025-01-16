import { db } from "db/db";
import type { AddPackDTO } from "./addPack.dto";
import { packs } from "db/schema";

export const addPackService = async (params: Params) => {
  return await db.insert(packs).values({ ...params });
};

interface Params extends AddPackDTO {
  authorId: UUID;
}
