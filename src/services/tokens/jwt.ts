// @ts-types="@types/jsonwebtoken"
import jwt, { type SignOptions } from "jsonwebtoken";
import { TokenErr } from "../../errors/Token.err.ts";

export class JWT {
  static secret = process.env.SECRET_JWT;
  static expiresIn = "1w";

  static verify(token: string) {
    if (!this.secret) throw new TypeError("Se requiere un SECRET (.env)");

    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new TokenErr();
    }
  }

  static sign(payload: object, options?: SignOptions) {
    if (!this.secret) throw new TypeError("Se requiere un SECRET (.env)");

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
      ...options,
    });
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
