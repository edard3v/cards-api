import { db } from "db/db";
import { accounts, cards, categories } from "db/schema";
import { PageErr } from "errors/Page.err";
import type { GetCardsDTO } from "./getCards.dto";
import { and, eq, like } from "drizzle-orm";
import { RecordNotFound } from "errors/RecordNotFound.err";

export const getCardsService = async (params: GetCardsDTO) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(cards.name, `%${name}%`) : undefined,
    categoryId ? eq(cards.categoryId, categoryId) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: cards.id })
      .from(cards)
      .where(and(...where))
  ).length;

  if (!totalRecords) throw new RecordNotFound();

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new PageErr();

  const records = await db
    .select({
      id: cards.id,
      name: cards.name,
      front: cards.front,
      back: cards.back,
      likes: cards.likes,
      category: categories.name,
      author: accounts.email,
      createdAt: cards.createdAt,
      updateAt: cards.updateAt,
      audio: cards.audio,
      img: cards.img,
    })
    .from(cards)
    .leftJoin(accounts, eq(accounts.id, cards.authorId))
    .leftJoin(categories, eq(categories.id, cards.categoryId))
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    limit,
    page,
    totalPages,
    records,
  };
};
