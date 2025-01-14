import { z } from "zod";

export const limitZod = z.coerce
  .number({ message: "Debería ser un número." })
  .min(1);
