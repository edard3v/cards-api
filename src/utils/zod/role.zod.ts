import { Role } from "db/schema";
import { z } from "zod";

export const roleZod = z.nativeEnum(Role);
