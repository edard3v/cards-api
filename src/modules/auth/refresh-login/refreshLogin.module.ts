import { verifyAuth } from "middlewares/verifyAuth.middleware";
import { Hono } from "hono";
import { refreshLoginService } from "./refreshLogin.service";

export const refreshLoginModule = new Hono();

refreshLoginModule.post(
  "",

  verifyAuth,

  // Controller
  async (context) => {
    const tokenPayload = context.get("tokenPayload");
    const newToken = refreshLoginService(tokenPayload);
    return context.json({ token: newToken });
  }
);
