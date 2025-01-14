import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { JWT } from "services/tokens/jwt";
import {
  startRegisterDTO,
  type StartRegisterDTO,
} from "../start-register/startRegister.dto";
import { endRegisterService } from "./endRegister.service";

export const endRegisterModule = new Hono<{
  Variables: { credentials: StartRegisterDTO };
}>();

endRegisterModule.get(
  "/:token",

  zValidator("param", z.object({ token: z.string() }).strict()),

  async (context, next) => {
    const { token } = context.req.valid("param");
    const decoded = JWT.verify(token);
    const credentials = startRegisterDTO.passthrough().parse(decoded);
    context.set("credentials", credentials);

    await next();
  },

  // Controller
  async (context) => {
    const credentials = context.get("credentials");
    await endRegisterService(credentials);
    return context.text("¡Enhorabuena! Se ha registrado correctamente.");
  }
);
