import { Encrypt } from "services/encrypt/encrypt";
import type { StartRegisterDTO } from "./startRegister.dto";
import { db } from "db/db";
import { EmailErr } from "errors/Email.err";
import { JWT } from "services/tokens/jwt";
import { sendMailToVerifyRegister } from "./sendMailToVerifyRegister.service";

export const startRegisterService = async (credentials: StartRegisterDTO) => {
  await checkEmail(credentials.email);

  const newAccount = { ...credentials };
  newAccount.password = Encrypt.hash(newAccount.password);

  const token = JWT.sign(newAccount, {
    expiresIn: "20m",
  });

  const link = `${process.env.API_BASE_URL}/end-register/${token}`;
  await sendMailToVerifyRegister(newAccount.email, link);
};

const checkEmail = async (email: string) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, email),
  });
  if (account) throw new EmailErr();
};
