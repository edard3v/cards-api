import { relations } from "drizzle-orm/relations";
import { accounts, cards, categories, packs, packsCards } from "./schema";

export const cardsRelations = relations(cards, ({ one, many }) => ({
  account: one(accounts, {
    fields: [cards.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [cards.categoryId],
    references: [categories.id],
  }),
  packsCards: many(packsCards),
}));

export const accountsRelations = relations(accounts, ({ many }) => ({
  cards: many(cards),
  packs: many(packs),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  cards: many(cards),
  packs: many(packs),
}));

export const packsRelations = relations(packs, ({ one, many }) => ({
  category: one(categories, {
    fields: [packs.categoryId],
    references: [categories.id],
  }),
  account: one(accounts, {
    fields: [packs.accountId],
    references: [accounts.id],
  }),
  packsCards: many(packsCards),
}));

export const packsCardsRelations = relations(packsCards, ({ one }) => ({
  card: one(cards, {
    fields: [packsCards.cardId],
    references: [cards.id],
  }),
  pack: one(packs, {
    fields: [packsCards.packId],
    references: [packs.id],
  }),
}));
