import { envs } from "./envs.config";

export const jwtConfig = {
  secret: envs.JWT_SESSION_SECRET,
  expiration: { expiresIn: envs.JWT_EXPIRATION },
};
