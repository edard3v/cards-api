import { z } from "zod";

export const emailZod = z.string().email({ message: "ejemplo@gmail.com" });
