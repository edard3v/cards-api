import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { packs } from "./packs";
import { cards } from "./cards";
import { sql } from "drizzle-orm";

export const packsCards = sqliteTable(
  "packs_cards",
  {
    packId: text("pack_id")
      .notNull()
      .references(() => packs.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => cards.id, { onDelete: "cascade" }),

    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  },
  (packsCards) => {
    return {
      id: primaryKey({ columns: [packsCards.packId, packsCards.cardId] }),
    };
  }
);

export type InsertPacksCards = typeof packsCards.$inferInsert;
export type SelectPacksCards = typeof packsCards.$inferSelect;
