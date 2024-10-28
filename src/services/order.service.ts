import { AppDataSource } from "../config/data-source.config";
import { Order } from "../entities";
import { Utils } from "../utils";
import * as bcrypt from "bcrypt";
import {
  CustomerService,
  EmailService,
  TokenService,
  WalletService,
} from "./index";
import { OrderStatus } from "../entities/order.entity";

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

      const tokenConfirm = Utils.generateRandomToken();

      // crear/guardar orden de pago
      const newOrder = this.orderRepository.create({
        tokenConfirm,
        amount: amountNumber,
        customer,
      });

      const order = await this.orderRepository.save(newOrder);

      const sessionId = await this.tokenService.createToken({
        orderId: order.id,
      });

      const emailArgs = {
        sessionId,
        order,
        tokenConfirm,
        email: customer.email,
      };

      // enviar email de la orden con el tokenConfirm y sessionId
      await this.emailService.sendOrderEmail(emailArgs);

      return { sessionId, amount, tokenConfirm, customer: customer.id };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getOrder(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ["customer"],
    });
  }

  async confirmOrder(args: any): Promise<any> {
    try {
      const { sessionId, tokenConfirm } = args;

      // verificar sessionId y obtener id de la orden
      const { orderId } = await this.tokenService.decodeToken(sessionId);

      const order = await this.getOrder(orderId);

      if (order!.status === OrderStatus.PAID) {
        throw new Error("La orden ya fué pagada");
      }

      // validar tokenConfirm (el token de 6 digitos)
      if (
        !tokenConfirm ||
        !bcrypt.compareSync(tokenConfirm, order!.tokenConfirm)
      ) {
        throw new Error("Token para confirmar la orden no válido");
      }

      const wallet: any = await this.walletService.getWallet(
        order!.customer.id
      );

      // descontar dinero del wallet
      const discountWallet = await this.walletService.discountWallet(
        wallet,
        order!.amount
      );

      if (discountWallet === false) {
        throw new Error("Monto a descontar supera al disponible en la wallet");
      }

      order!.status = OrderStatus.PAID;
      this.orderRepository.save(order!);

      const customer = await this.customerService.getCustomer(
        order!.customer.id
      );

      // notificación por email
      await this.emailService.confirmedOrderEmail(customer!.email);

      return { msg: "Orden confirmada exitosamente" };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
