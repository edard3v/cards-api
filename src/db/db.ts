import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { DB_CREDENTIAL } from "../../drizzle.config";
import * as relations from "./relations";

export const db = drizzle({
  connection: DB_CREDENTIAL,
  schema: { ...schema, ...relations },
});
