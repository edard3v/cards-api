import type { NotFoundHandler } from "hono";

export const notFoundHandler: NotFoundHandler = (context) => {
  context.status(404);
  return context.json({ msg: "Ruta no encontrada" });
};
