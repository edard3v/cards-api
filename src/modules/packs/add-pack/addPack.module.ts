import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { addPackDTO } from "./addPack.dto";
import { verifyAuth } from "middlewares/verifyAuth.middleware";
import { addPackService } from "./addPack.service";

export const addPackModule = new Hono();

addPackModule.post(
  "/",
  verifyAuth,
  zValidator("json", addPackDTO),
  // Controller
  async (context) => {
    const body = context.req.valid("json");
    const authorId = context.get("tokenPayload").id as UUID;
    await addPackService({ ...body, authorId });
    return context.json({ msg: "Paquete creado correctamente😁" });
  }
);
