import { uuidZod } from "utils/zod/uuid.zod";
import { z } from "zod";
import { nameZod } from "../zod/name.zod";

export const addPackDTO = z
  .object({
    name: nameZod,
    categoryId: uuidZod,
  })
  .strict();

export type AddPackDTO = z.infer<typeof addPackDTO>;
