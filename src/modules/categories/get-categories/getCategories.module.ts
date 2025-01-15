import { Hono } from "hono";
import { getCategoriesService } from "./getCategories.service";

export const getCategoriesModule = new Hono();

getCategoriesModule.get(
  "/",
  // Controller
  async (context) => {
    const categories = await getCategoriesService();
    return context.json(categories);
  }
);
