import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { startRegisterDTO } from "./startRegister.dto";
import { startRegisterService } from "./startRegister.service";

export const startRegisterModule = new Hono();

startRegisterModule.post(
  "/",

  zValidator("json", startRegisterDTO),

  // Controller
  async (context) => {
    const credentials = context.req.valid("json");
    await startRegisterService(credentials);
    return context.text("Email de verificación enviando correctamente.");
  }
);
