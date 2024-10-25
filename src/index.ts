import express from "express";
import path from "path";
import fs from "fs";
import * as soap from "soap";
import { AppDataSource, envs } from "./config";
import { UserController } from "./controllers/user.controller";

const app = express();
const port = Number(envs.PORT);

AppDataSource.initialize()
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
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
