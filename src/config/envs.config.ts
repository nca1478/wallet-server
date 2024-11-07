import "dotenv/config";
import { get } from "env-var";

export const envs = {
  API_PORT: get("API_PORT").required().asPortNumber(),
  API_HOST: get("API_HOST").required().asString(),
  JWT_SESSION_SECRET: get("JWT_SESSION_SECRET").required().asString(),
  JWT_EXPIRATION: get("JWT_EXPIRATION").required().asString(),
  NODE_ENV: get("NODE_ENV").required().asString(),

  DB_HOST: get("DB_HOST").required().asString(),
  DB_PORT: get("DB_PORT").required().asPortNumber(),
  DB_USERNAME: get("DB_USERNAME").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_NAME: get("DB_NAME").required().asString(),
  DB_SYNCHRONIZE: get("DB_SYNCHRONIZE").required().asBool(),

  EMAIL_SERVICE: get("EMAIL_SERVICE").required().asString(),
  EMAIL_HOST: get("EMAIL_HOST").required().asString(),
  EMAIL_PORT: get("EMAIL_PORT").required().asPortNumber(),
  EMAIL_AUTH_USER: get("EMAIL_AUTH_USER").required().asEmailString(),
  EMAIL_AUTH_PASS: get("EMAIL_AUTH_PASS").required().asString(),
  EMAIL_SECURE: get("EMAIL_SECURE").required().asBool(),
  EMAIL_REJECT_UNAUTHORIZED: get("EMAIL_REJECT_UNAUTHORIZED")
    .required()
    .asBool(),
};
