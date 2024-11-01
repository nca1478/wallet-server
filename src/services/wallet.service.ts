import { AppDataSource } from "../config/data-source.config";
import { Wallet } from "../entities";
import { BodyValidation } from "../utils";
import { CustomerService } from "./customer.service";

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);
  private customerService = new CustomerService();

  async createWallet(wallet: Partial<Wallet>): Promise<Wallet> {
    const createdWallet = this.walletRepository.create(wallet);
    return await this.walletRepository.save(createdWallet);
  }

  async rechargeWallet(args: any): Promise<any> {
    try {
      BodyValidation.validateRechargeWallet(args);

      const { value } = args;

      if (isNaN(value) || Number(value) <= 0) {
        throw new Error("El valor debe ser un número mayor que 0");
      }

      const customer = await this.customerService.getCustomerByTerm(args);
      if (!customer) {
        throw new Error("Cliente no encontrado");
      }

      const wallet = await this.walletRepository.findOne({
        where: { customer },
      });
      if (!wallet) {
        throw new Error("Billetera no encontrada");
      }

      wallet.available = Number(wallet.available) + Number(value);
      await this.walletRepository.save(wallet);

      return {
        id: wallet.id,
        available: wallet.available,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAvailableWallet(args: any): Promise<any> {
    try {
      BodyValidation.validateWallet(args);

      const customer = await this.customerService.getCustomerByTerm(args);
      if (!customer) {
        throw new Error("Cliente o Billetera no encontrada");
      }

      const wallet = await this.walletRepository.findOne({
        where: { customer },
      });

      const responseWallet = {
        id: wallet?.id,
        available: wallet?.available,
      };

      return responseWallet;
    } catch (error) {
      throw error;
    }
  }

  async getWallet(customerId: string): Promise<Wallet | null> {
    return await this.walletRepository.findOne({
      where: { customer: { id: customerId } },
    });
  }

  async discountWallet(wallet: Wallet, amount: number) {
    try {
      if (Number(wallet.available) < Number(amount)) {
        return false;
      }

      wallet.available = Number(wallet.available) - Number(amount);
      this.walletRepository.save(wallet);

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
