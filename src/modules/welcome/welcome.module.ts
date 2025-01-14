import { Hono } from "hono";
import { welcomeService } from "./welcome.service.ts";

export const welcomeModule = new Hono();

welcomeModule.get(
  "/",

  // Controller
  (context) => {
    const msg = welcomeService();
    return context.text(msg);
  }
);
