import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { accounts } from "./accounts";
import { categories } from "./categories";

export const packs = sqliteTable("packs", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  likes: integer("likes").default(0),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  authorId: text("author_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "restrict" }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
});

export type InsertPacks = typeof packs.$inferInsert;
export type SelectPacks = typeof packs.$inferSelect;
