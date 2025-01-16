import { z } from "zod";

export const nameZod = z.string().min(1).max(150);
