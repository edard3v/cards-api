import { v2 as cloudinary } from "cloudinary";
import type { CloudinaryFile } from "./types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class Cloudinary {
  static async upload(file: File, folder: string) {
    const arrayBuffer = await file.arrayBuffer();
    // Subir una imagen o video a Cloudinary usando upload_stream para manejar el binario
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: file.name.split(".").at(0),
          folder: folder,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Enviar el contenido binario del archivo al stream
      stream.end(Buffer.from(arrayBuffer));
    });

    return uploadResult as CloudinaryFile;
  }

  static async destroy(url: string, folder: string) {
    const name = url.split("/").at(-1)?.split(".").at(0);
    const publicId = `${folder}/${name}`;
    await cloudinary.uploader.destroy(publicId);
  }
}
