import { z } from "zod";

export const pageZod = z.coerce
  .number({ message: "Debería ser un número." })
  .min(1);
