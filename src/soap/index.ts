import { Application } from "express";
import { UserService } from "./user.service";
import { CustomerService } from "./customer.service";

export class SoapServices {
  private customerService = new CustomerService();
  private userService = new UserService();

  constructor(public app: Application) {}

  public start() {
    this.userService.initialize(this.app);
    this.customerService.initialize(this.app);
  }
}
