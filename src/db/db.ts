import { drizzle } from "drizzle-orm/libsql";
import * as schemas from "./schemas";
import { DB_CREDENTIAL } from "../../drizzle.config";
import * as relations from "./relations";

export const db = drizzle({
  connection: DB_CREDENTIAL,
  schema: { ...schemas, ...relations },
});
