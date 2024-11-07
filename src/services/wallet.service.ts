import { AppDataSource } from "../config/data-source.config";
import { Wallet } from "../entities";
import { SoapError } from "../errors";
import { BadRequestException, NotFoundException } from "../exceptions";
import { CustomerService } from "./customer.service";

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);
  private customerService = new CustomerService();
  private soapError = new SoapError();

  async createWallet(wallet: Partial<Wallet>): Promise<Wallet> {
    const createdWallet = this.walletRepository.create(wallet);
    return await this.walletRepository.save(createdWallet);
  }

  async rechargeWallet(args: any): Promise<any> {
    try {
      const { value } = args;

      if (isNaN(value) || Number(value) <= 0) {
        throw new BadRequestException("El valor debe ser válido o mayor que 0");
      }

      const customer = await this.customerService.getCustomerByTerm(args);
      if (!customer) {
        throw new NotFoundException("Cliente no encontrado");
      }

      const wallet = await this.walletRepository.findOne({
        where: { customer },
      });
      if (!wallet) {
        throw new NotFoundException("Billetera no encontrada");
      }

      wallet.available = Number(wallet.available) + Number(value);
      await this.walletRepository.save(wallet);

      return {
        id: wallet.id,
        available: wallet.available,
      };
    } catch (error: any) {
      this.soapError.handle(error);
    }
  }

  async getAvailableWallet(args: any): Promise<any> {
    try {
      const customer = await this.customerService.getCustomerByTerm(args);
      if (!customer) {
        throw new NotFoundException("Cliente o Billetera no encontrada");
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
      this.soapError.handle(error);
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
