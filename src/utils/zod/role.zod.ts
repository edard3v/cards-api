import { Role } from "db/schemas";
import { z } from "zod";

export const roleZod = z.nativeEnum(Role);
