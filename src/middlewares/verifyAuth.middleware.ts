import type { MiddlewareHandler } from "hono";
import { JWT } from "../services/tokens/jwt.ts";
import type { JwtPayload } from "jsonwebtoken";
import { Unauthorized } from "errors/Unauthorized.err.ts";
import { BearerErr } from "errors/Bearer.err.ts";

export const verifyAuth: MiddlewareHandler<T> = async (context, next) => {
  const Authorization = context.req.header("Authorization");
  if (!Authorization) throw new Unauthorized();

  const [prefix, token] = Authorization.split(" ");
  if (prefix !== "Bearer") throw new BearerErr();
  if (!token) throw new Unauthorized();

  const tokenPayload = JWT.verify(token) as JwtPayload;

  context.set("tokenPayload", tokenPayload);

  await next();
};

type T = {
  Variables: { tokenPayload: JwtPayload };
};
