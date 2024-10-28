import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

export class TokenService {
  async createToken(args: any): Promise<any> {
    const payload = args;
    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expiration);
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret);
      return decoded;
    } catch (error) {
      throw new Error("ID de Sessión no inválido o expirado");
    }
  }
}
