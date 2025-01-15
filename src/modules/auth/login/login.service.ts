import { db } from "db/db";
import type { LoginDTO } from "./login.dto";
import { LoginErr } from "errors/Login.err";
import { Encrypt } from "services/encrypt/encrypt";
import { JWT } from "services/tokens/jwt";
import type { JwtPayload } from "jsonwebtoken";
import type { Role } from "db/enums/role";

export const loginService = async (login: LoginDTO) => {
  const account = await db.query.accounts.findFirst({
    where: (account, { eq }) => eq(account.email, login.email),
  });
  if (!account) throw new LoginErr();

  const isLogged = Encrypt.compare(login.password, account.password);
  if (!isLogged) throw new LoginErr();

  const token = JWT.sign({
    id: account.id,
    role: account.role,
    img: account.img,
    name: account.name,
    email: account.email,
  });

  return token;
};

export interface TokenPayload extends JwtPayload {
  id: UUID;
  role: Role;
  name: string;
  img: string;
  email: string;
}
