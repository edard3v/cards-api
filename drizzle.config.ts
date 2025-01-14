import { IS_PRODUCTION } from "app/config";
import { defineConfig } from "drizzle-kit";

export const DB_CREDENTIAL = {
  url: !IS_PRODUCTION
    ? "file:./src/db/cards.db"
    : process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
};

export default defineConfig({
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  dialect: "turso",
  dbCredentials: DB_CREDENTIAL,
});
