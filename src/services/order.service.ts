import { AppDataSource } from "../config/data-source.config";
import { Order } from "../entities";
import { Utils } from "../utils";
import {
  CustomerService,
  EmailService,
  TokenService,
  WalletService,
} from "./index";

export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);
  private customerService = new CustomerService();
  private walletService = new WalletService();
  private tokenService = new TokenService();
  private emailService = new EmailService();

  async createOrder(args: any): Promise<any> {
    try {
      const { amount } = args;
      const amountNumber = Number(amount);

      if (isNaN(amount) || amountNumber <= 0) {
        throw new Error("El monto de la orden debe ser un número mayor que 0");
      }

      const customer = await this.customerService.getCustomerByTerm(args);
      if (!customer) {
        throw new Error("Cliente no encontrado");
      }

      const wallet = await this.walletService.getAvailableWallet(args);
      if (!wallet) {
        throw new Error("Billetera no encontrada");
      }

      if (amountNumber > Number(wallet.available)) {
        throw new Error("No hay disponibilidad en la billetera");
      }

      const sessionId = await this.tokenService.createToken({
        customerId: customer.id,
      });

      const tokenConfirm = Utils.generateRandomToken();

      // create order
      const newOrder = this.orderRepository.create({
        tokenConfirm,
        amount: amountNumber,
        customer,
      });

      const order = await this.orderRepository.save(newOrder);

      // send email
      const emailArgs = {
        sessionId,
        order,
        tokenConfirm,
        email: customer.email,
      };

      await this.emailService.sendOrderEmail(emailArgs);

      return { sessionId, amount, tokenConfirm, customer: customer.id };
    } catch (error: any) {
      return error;
    }
  }
}
