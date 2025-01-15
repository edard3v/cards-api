import { z } from "zod";
import { uuidZod } from "utils/zod/uuid.zod";
import { limitZod } from "utils/zod/limit.zod";
import { pageZod } from "utils/zod/page.zod";

export const getCardsDTO = z
  .object({
    name: z.string().min(1).max(150),
    categoryId: uuidZod,
    page: pageZod,
    limit: limitZod,
  })
  .partial()
  .strict();

export type GetCardsDTO = z.infer<typeof getCardsDTO>;
