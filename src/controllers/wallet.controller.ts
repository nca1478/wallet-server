import { SoapError } from "../errors";
import { BadRequestException } from "../exceptions";
import { WalletService } from "../services";
import { WalletValidation } from "../utils";

export class WalletController {
  private walletService = new WalletService();
  private soapError = new SoapError();

  async rechargeWallet(args: any) {
    try {
      const body = await WalletValidation.validateRecharge(args).catch(
        (error) => {
          throw new BadRequestException(error);
        }
      );

      return this.walletService.rechargeWallet(body);
    } catch (error) {
      this.soapError.handle(error);
    }
  }

  async getAvailableWallet(args: any) {
    try {
      const body = await WalletValidation.validate(args).catch((error) => {
        throw new BadRequestException(error);
      });

      return this.walletService.getAvailableWallet(body);
    } catch (error) {
      this.soapError.handle(error);
    }
  }
}
