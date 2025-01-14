import { hashSync, compareSync } from "bcrypt";

export class Encrypt {
  static salt = 10;

  static hash(data: string) {
    return hashSync(data, this.salt);
  }

  static compare(data: string, encrypted: string) {
    return compareSync(data, encrypted);
  }
}
