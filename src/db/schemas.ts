import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export enum Role {
  admin = "ADMIN",
  seller = "SELLER",
  client = "CLIENT",
}

export const accounts = sqliteTable("accounts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.admin, Role.client, Role.seller] }).default(
    Role.client
  ),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  name: text("name"),
  address: text("address"),
  img: text("img"),
  tel: integer("tel"),
  country: integer("country"),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

// Accounts
export type InsertAccount = typeof accounts.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
