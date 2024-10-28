import { WalletService } from "../services";

export class WalletController {
  private walletService = new WalletService();

  async rechargeWallet(args: any) {
    return this.walletService.rechargeWallet(args);
  }

  async getAvailableWallet(args: any) {
    return this.walletService.getAvailableWallet(args);
  }
}
