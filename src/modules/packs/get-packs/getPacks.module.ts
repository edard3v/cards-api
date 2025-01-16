import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getPacksDTO } from "./getPacks.dto";
import { getPacksService } from "./getPacks.service";

export const getPacksModule = new Hono();

getPacksModule.get(
  "/",
  zValidator("query", getPacksDTO),
  // Controller
  async (context) => {
    const filters = context.req.valid("query");
    const packs = await getPacksService(filters);
    return context.json(packs);
  }
);
