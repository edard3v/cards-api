import { z } from "zod";

export const urlZod = z.string().url();
