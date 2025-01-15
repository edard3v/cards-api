import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { categories } from "./categories";
import { accounts } from "./accounts";

export const cards = sqliteTable("cards", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  front: text("front"),
  back: text("back").notNull(),
  img: text("img"),
  audio: text("audio"),
  likes: integer("likes").default(0),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),

  authorId: text("author_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "restrict" }),
});

export type InsertCards = typeof cards.$inferInsert;
export type SelectCards = typeof cards.$inferSelect;
