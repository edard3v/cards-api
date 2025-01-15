import { Hono } from "hono";
import { getCardsService } from "./getCards.service";
import { zValidator } from "@hono/zod-validator";
import { getCardsDTO } from "./getCards.dto";

export const getCardsModule = new Hono();

getCardsModule.get(
  "/",

  zValidator("query", getCardsDTO),
  // Controller
  async (context) => {
    const filters = context.req.valid("query");
    const cards = await getCardsService(filters);
    return context.json(cards);
  }
);
