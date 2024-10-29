import fs from "fs";
import path from "path";
import * as soap from "soap";
import { UserController } from "../controllers";
import { envs } from "../config";

export class UserService {
  private wsdlPath: string;
  private wsdl: string;
  private userController = new UserController();
  private soapRoute = "/wsdl/user";
  private urlService = `${envs.API_HOST}:${envs.API_PORT}${this.soapRoute}`;

  constructor() {
    this.wsdlPath = path.resolve(`${process.cwd()}/wsdl/user.service.wsdl`);
    this.wsdl = fs.readFileSync(this.wsdlPath, "utf8");
  }

  public get service() {
    const { userController } = this;

    return {
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
  }

  public initialize(app: any): void {
    soap.listen(app, this.soapRoute, this.service, this.wsdl);
    console.log("User Service running on", this.urlService);
  }
}
