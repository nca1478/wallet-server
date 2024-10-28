import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

export class TokenService {
  async createToken(args: any): Promise<any> {
    const payload = args;
    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expiration);
  }
}
