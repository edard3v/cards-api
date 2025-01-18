import { z } from "zod";

export const fileZod = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "El archivo no puede estar vacío",
  });
