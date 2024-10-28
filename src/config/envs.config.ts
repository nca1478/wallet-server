import "dotenv/config";
import { get } from "env-var";

export const envs = {
  API_PORT: get("API_PORT").required().asPortNumber(),
  API_HOST: get("API_HOST").required().asString(),
  JWT_SESSION_SECRET: get("JWT_SESSION_SECRET").required().asString(),
  JWT_EXPIRATION: get("JWT_EXPIRATION").required().asString(),

  DB_HOST: get("DB_HOST").required().asString(),
  DB_PORT: get("DB_PORT").required().asPortNumber(),
  DB_USERNAME: get("DB_USERNAME").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  DB_SYNCHRONIZE: get("DB_SYNCHRONIZE").required().asBool(),
};
