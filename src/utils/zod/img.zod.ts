import { z } from "zod";

export const imgZod = z
  .string()
  .url({ message: "Debería ser una url." })
  .or(z.literal(null));
