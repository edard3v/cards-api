import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { verifyAuth } from "middlewares/verifyAuth.middleware";
import { addCardDTO } from "./addCard.dto";
import { Cloudinary } from "services/cloudinary/cloudinary";
import { CloudinaryErr } from "errors/Cloudinary.err";

export const addCardModule = new Hono();

addCardModule.post(
  "/",

  verifyAuth,

  zValidator("form", addCardDTO),

  // Controller
  async (context) => {
    const { img, audio, ...rest } = context.req.valid("form");
    let imgUrl;
    let audioUrl;
    const folderForImgs = "cards/imgs";
    const folderForAudios = "cards/audios";

    try {
      if (img) {
        try {
          const result = await Cloudinary.upload(img, folderForImgs);
          imgUrl = result.url;
        } catch (error) {
          throw new CloudinaryErr();
        }
      }

      if (audio) {
        try {
          const result = await Cloudinary.upload(audio, folderForAudios);
          audioUrl = result.url;
        } catch (error) {
          throw new CloudinaryErr();
        }
      }

      console.log({ ...rest, img: imgUrl, audio: audioUrl });

      // const authorId = context.get("tokenPayload").id as UUID;
      // await addCardService({ ...body, authorId });
      return context.json({ msg: "Carta agregada correctamente 😁." });
    } catch (error) {
      if (imgUrl) Cloudinary.destroy(imgUrl, folderForImgs);
      if (audioUrl) Cloudinary.destroy(audioUrl, folderForAudios);

      throw error;
    }
  }
);
