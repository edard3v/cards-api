import z from "zod";
import { emailZod } from "utils/zod/email.zod";
import { passwordZod } from "utils/zod/password.zod";

export const startRegisterDTO = z
  .object({
    email: emailZod,
    password: passwordZod,
  })
  .strict();

export type StartRegisterDTO = z.infer<typeof startRegisterDTO>;
