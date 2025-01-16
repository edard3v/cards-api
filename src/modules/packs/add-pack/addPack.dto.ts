import { uuidZod } from "utils/zod/uuid.zod";
import { z } from "zod";

export const addPackDTO = z
  .object({
    name: z.string().min(1).max(150),
    categoryId: uuidZod,
  })
  .strict();

export type AddPackDTO = z.infer<typeof addPackDTO>;
