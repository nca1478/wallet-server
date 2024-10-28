import { Application } from "express";
import { UserService } from "./user.service";
import { CustomerService } from "./customer.service";
import { WalletService } from "./wallet.service";
import { OrderService } from "./order.service";

export class SoapServices {
  private customerService = new CustomerService();
  private userService = new UserService();
  private walletService = new WalletService();
  private orderService = new OrderService();

  constructor(public app: Application) {}

  public start() {
    this.userService.initialize(this.app);
    this.customerService.initialize(this.app);
    this.walletService.initialize(this.app);
    this.orderService.initialize(this.app);
  }
}
