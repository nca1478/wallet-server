import { AppDataSource } from "../config/data-source.config";
import { Order } from "../entities";

export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);

  async createOrder(order: Partial<Order>): Promise<any> {
    // const newOrder = this.orderRepository.create(order);
    // return await this.orderRepository.save(newOrder);
    return order;
  }
}
