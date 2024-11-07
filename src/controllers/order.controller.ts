import { SoapError } from "../errors";
import { BadRequestException } from "../exceptions";
import { OrderService } from "../services";
import { OrderValidation } from "../utils";

export class OrderController {
  private orderService = new OrderService();
  private soapError = new SoapError();

  async createOrder(args: any) {
    try {
      const body = await OrderValidation.validateCreateOrder(args).catch(
        (error) => {
          throw new BadRequestException(error);
        }
      );

      return this.orderService.createOrder(body);
    } catch (error) {
      this.soapError.handle(error);
    }
  }

  async confirmOrder(args: any) {
    try {
      const body = await OrderValidation.validateConfirmOrder(args).catch(
        (error) => {
          throw new BadRequestException(error);
        }
      );

      return this.orderService.confirmOrder(body);
    } catch (error) {
      this.soapError.handle(error);
    }
  }
}
