import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

export class TokenService {
  async createToken(args: any): Promise<any> {
    const payload = args;
    return jwt.sign(payload, jwtConfig.secret, jwtConfig.expiration);
  }

  async decodeToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            reject("sessionId ha expirado. Debe crear una nueva orden.");
          } else {
            reject("sessionId no válido");
          }
        }

        resolve(decoded);
      });
    });
  }
}
