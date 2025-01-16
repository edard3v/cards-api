import { imgZod } from "utils/zod/img.zod";
import { urlZod } from "utils/zod/url.zod";
import { uuidZod } from "utils/zod/uuid.zod";
import { z } from "zod";

export const addCardDTO = z
  .object({
    name: z.string().min(1).max(150),
    front: z.string().optional(),
    back: z.string(),
    img: imgZod.optional(),
    audio: urlZod.optional(),
    categoryId: uuidZod,
  })
  .strict();

export type AddCardDTO = z.infer<typeof addCardDTO>;
