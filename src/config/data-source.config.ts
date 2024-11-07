import path from "path";
import { DataSource } from "typeorm";
import { envs } from "./envs.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [path.join(__dirname, "../src/entities/*.entity.{ts,js}")],
  synchronize: Boolean(envs.DB_SYNCHRONIZE),
});
