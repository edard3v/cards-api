import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { verifyAuth } from "middlewares/verifyAuth.middleware";
import { addCardDTO } from "./addCard.dto";
import { Cloudinary } from "services/cloudinary/cloudinary";
import { addCardService } from "./addCard.service";

export const addCardModule = new Hono();

addCardModule.post(
  "/",

  verifyAuth,

  zValidator("form", addCardDTO),

  // Controller
  async (context) => {
    const { img, audio, ...rest } = context.req.valid("form");
    const imgCloud = { url: "", folder: "cards/imgs" };
    const audioCloud = { url: "", folder: "cards/audios" };

    try {
      await Promise.all([
        img && upload(img, imgCloud.folder, imgCloud),
        audio && upload(audio, audioCloud.folder, audioCloud),
      ]);

      const authorId = context.get("tokenPayload").id as UUID;

      await addCardService({
        authorId,
        img: imgCloud.url,
        audio: audioCloud.url,
        ...rest,
      });

      return context.json({ msg: "Carta agregada correctamente 😁." });
    } catch (error) {
      if (imgCloud.url) Cloudinary.destroy(imgCloud.url, imgCloud.folder);
      if (audioCloud.url) Cloudinary.destroy(audioCloud.url, audioCloud.folder);

      throw error;
    }
  }
);

const upload = async (file: File, folder: string, save: { url: string }) => {
  const result = await Cloudinary.upload(file, folder);
  save.url = result.url;
};
