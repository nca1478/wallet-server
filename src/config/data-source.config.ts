import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { envs } from "./envs.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: Number(envs.DB_PORT),
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  entities: [User],
  synchronize: envs.DB_SYNCHRONIZE,
});
