import { AppDataSource } from "../config/data-source.config";
import { Wallet } from "../entities";

export class WalletService {
  private walletRepository = AppDataSource.getRepository(Wallet);

  async createWallet(wallet: Partial<Wallet>): Promise<Wallet> {
    const createdWallet = this.walletRepository.create(wallet);
    return await this.walletRepository.save(createdWallet);
  }
}