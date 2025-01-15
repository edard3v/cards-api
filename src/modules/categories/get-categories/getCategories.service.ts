import { db } from "db/db";

export const getCategoriesService = async () => {
  const categories = await db.query.categories.findMany({
    columns: { id: true, name: true, img: true },
  });

  return categories;
};
