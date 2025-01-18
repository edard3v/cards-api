import { fileZod } from "utils/zod/file.zod";
import { uuidZod } from "utils/zod/uuid.zod";
import { z } from "zod";

export const addCardDTO = z
  .object({
    name: z.string().min(1).max(150),
    front: z.string().optional(),
    back: z.string(),
    categoryId: uuidZod,
    img: fileZod.optional(),
    audio: fileZod.optional(),
  })
  .strict();

export type AddCardDTO = z.infer<typeof addCardDTO>;
