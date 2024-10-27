import { Application } from "express";
import { UserService } from "./user.service";

export class SoapServices {
  private userService = new UserService();

  constructor(public app: Application) {}

  public start() {
    this.userService.initialize(this.app);
  }
}
