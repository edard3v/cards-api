import { z } from "zod";
import { nameZod } from "../zod/name.zod";
import { uuidZod } from "utils/zod/uuid.zod";
import { pageZod } from "utils/zod/page.zod";
import { limitZod } from "utils/zod/limit.zod";

export const getPacksDTO = z
  .object({
    name: nameZod,
    categoryId: uuidZod,
    page: pageZod,
    limit: limitZod,
  })
  .partial()
  .strict();

export type GetPacksDTO = z.infer<typeof getPacksDTO>;
