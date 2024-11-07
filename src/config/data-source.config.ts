import { DataSource } from "typeorm";
import { envs } from "./envs.config";

const env = envs.NODE_ENV;
const entities =
  env === "development"
    ? `${process.cwd()}/src/entities/*.entity.{ts,js}`
    : `${process.cwd()}/dist/entities/*.entity.{ts,js}`;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [entities],
  synchronize: Boolean(envs.DB_SYNCHRONIZE),
});
