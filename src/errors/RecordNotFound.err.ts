import { HTTPException } from "hono/http-exception";

export class RecordNotFound extends HTTPException {
  constructor() {
    super(404, { message: "Recurso no encontrado." });
    this.name = "RecordNotFound";
  }
}
