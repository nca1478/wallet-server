import { OrderService } from "../services";

export class OrderController {
  private orderService = new OrderService();

  async createOrder(args: any) {
    return this.orderService.createOrder(args);
  }

  async confirmOrder(args: any) {
    return this.orderService.confirmOrder(args);
  }
}
