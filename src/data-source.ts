import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "V1400nca$$",
  database: "soap-db",
  entities: [User],
  synchronize: true,
});
