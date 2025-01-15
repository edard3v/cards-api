import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { Role } from "./enums/role";

export const accounts = sqliteTable("accounts", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  role: text("role", { enum: [Role.admin, Role.client, Role.seller] }).default(
    Role.client
  ),
  email: text("email").unique().notNull(),
  name: text("name"),
  tel: integer("tel"),
  country: integer("country"), // recuerda validar con el enum Country
  img: text("img"),
  password: text("password").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export const cards = sqliteTable("cards", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  front: text("front").notNull(),
  back: text("back").notNull(),
  img: text("img"),
  audio: text("audio"),
  likes: integer("likes").default(0),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),

  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "restrict" }),
});

export const packs = sqliteTable("packs", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  likes: integer("likes").default(0),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  accountId: text("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "restrict" }),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
});

export const categories = sqliteTable("categories", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  img: text("img").notNull(),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

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

// accounts
export type InsertAccounts = typeof accounts.$inferInsert;
export type SelectAccounts = typeof accounts.$inferSelect;

// cards
export type InsertCards = typeof cards.$inferInsert;
export type SelectCards = typeof cards.$inferSelect;

// packs
export type InsertPacks = typeof packs.$inferInsert;
export type SelectPacks = typeof packs.$inferSelect;

// categories
export type InsertCategories = typeof categories.$inferInsert;
export type SelectCategories = typeof categories.$inferSelect;

// packs_cards
export type InsertPacksCards = typeof packsCards.$inferInsert;
export type SelectPacksCards = typeof packsCards.$inferSelect;
