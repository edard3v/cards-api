import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginDTO } from "./login.dto";
import { loginService } from "./login.service";

export const loginModule = new Hono();

loginModule.post(
  "",

  zValidator("json", loginDTO),

  // Controller
  async (context) => {
    const credentials = context.req.valid("json");
    const token = await loginService(credentials);
    return context.json({ token });
  }
);
