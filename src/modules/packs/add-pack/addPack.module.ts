import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { addPackDTO } from "./addPack.dto";

export const addPackModule = new Hono();

addPackModule.get(
  "/",
  zValidator("json", addPackDTO),
  // Controller
  (context) => {
    return context.json({ msg: "😁" });
  }
);
