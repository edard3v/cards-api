import { transporter } from "services/emails/transporter";

export const sendMailToVerifyRegister = async (to: string, link: string) => {
  return await transporter.sendMail({
    from: process.env.NODEMAILER_GMAIL,
    to,
    subject: "Vericar email 🚀 template-bun 🚀",
    html: `<a href=${link} style="color: royalblue">Haz clic en mí para verificar su registro</a>`,
  });
};
