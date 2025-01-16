import { and, eq, like } from "drizzle-orm";
import type { GetPacksDTO } from "./getPacks.dto";
import { accounts, categories, packs } from "db/schema";
import { db } from "db/db";
import { RecordNotFound } from "errors/RecordNotFound.err";
import { PageErr } from "errors/Page.err";

export const getPacksService = async (params: GetPacksDTO) => {
  const { page = 1, limit = 20, name, categoryId } = params;

  const where = [
    name ? like(packs.name, `%${name}%`) : undefined,
    categoryId ? eq(packs.categoryId, categoryId) : undefined,
  ].filter(Boolean);

  const totalRecords = (
    await db
      .select({ id: packs.id })
      .from(packs)
      .where(and(...where))
  ).length;

  if (!totalRecords) throw new RecordNotFound();

  const totalPages = Math.ceil(totalRecords / limit) || 1;
  if (page > totalPages) throw new PageErr();

  const records = await db
    .select({
      id: packs.id,
      name: packs.name,
      likes: packs.likes,
      category: categories.name,
      author: accounts.email,
      createdAt: packs.createdAt,
      updateAt: packs.updateAt,
    })
    .from(packs)
    .leftJoin(accounts, eq(accounts.id, packs.authorId))
    .leftJoin(categories, eq(categories.id, packs.categoryId))
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
