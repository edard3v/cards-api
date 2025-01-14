import { z } from "zod";

export const uuidZod = z
  .string()
  .length(36, { message: "Debería ser un uuid." });
