import { Hono } from "hono";
import { getCardsService } from "./getCards.service";

export const getCardsModule = new Hono();

getCardsModule.get(
  "/",
  // Controller
  async (context) => {
    const cards = await getCardsService();
    return context.json(cards);
  }
);
