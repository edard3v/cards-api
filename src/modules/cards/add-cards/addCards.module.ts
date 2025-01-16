import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { addCardService } from "./addCard.service";
import { verifyAuth } from "middlewares/verifyAuth.middleware";
import { addCardDTO } from "./addCard.dto";

export const addCardModule = new Hono();

addCardModule.post(
  "/",

  verifyAuth,

  zValidator("json", addCardDTO),

  // Controller
  async (context) => {
    const body = context.req.valid("json");
    const authorId = context.get("tokenPayload").id as UUID;
    await addCardService({ ...body, authorId });
    return context.json({ msg: "Carta agregada correctamente 😁." });
  }
);
