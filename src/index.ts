import express from "express";
import path from "path";
import fs from "fs";
import * as soap from "soap";
import { createConnection } from "typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";

const app = express();
const port = 3000;

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "V1400nca$$",
  database: "soap-db",
  entities: [User],
  synchronize: true,
})
  .then(() => {
    const wsdlPath = path.resolve(__dirname, "wsdl", "user.service.wsdl");
    const wsdl = fs.readFileSync(wsdlPath, "utf8");
    const userController = new UserController();

    const service = {
      UserService: {
        UserServiceSoapPort: {
          createUser: userController.createUser.bind(userController),
          getUser: userController.getUser.bind(userController),
          getAllUsers: userController.getAllUsers.bind(userController),
          updateUser: userController.updateUser.bind(userController),
          deleteUser: userController.deleteUser.bind(userController),
        },
      },
    };

    soap.listen(app, "/wsdl", service, wsdl);

    app.listen(port, () => {
      console.log(`SOAP server running on http://localhost:${port}/wsdl`);
    });
  })
  .catch((error) => console.log(error));
