import { HTTPException } from "hono/http-exception";

export class CloudinaryErr extends HTTPException {
  constructor() {
    super(500, {
      message: "Error cargando archivos en cloudinary.",
    });
    this.name = "CloudinaryErr";
  }
}
