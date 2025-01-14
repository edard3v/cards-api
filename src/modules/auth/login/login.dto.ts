import z from "zod";
import { emailZod } from "utils/zod/email.zod";
import { passwordZod } from "utils/zod/password.zod";

export const loginDTO = z
  .object({
    email: emailZod,
    password: passwordZod,
  })
  .strict();

export type LoginDTO = z.infer<typeof loginDTO>;
