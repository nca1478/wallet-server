import fs from "fs";
import path from "path";
import * as soap from "soap";
import { WalletController } from "../controllers";

export class WalletService {
  private wsdlPath: string;
  private wsdl: string;
  private walletController = new WalletController();

  constructor() {
    this.wsdlPath = path.resolve(
      __dirname,
      "..",
      "wsdl",
      "wallet.service.wsdl"
    );
    this.wsdl = fs.readFileSync(this.wsdlPath, "utf8");
  }

  public get service() {
    const { walletController } = this;

    return {
      WalletService: {
        WalletServiceSoapPort: {
          rechargeWallet:
            walletController.rechargeWallet.bind(walletController),
          getAvailableWallet:
            walletController.getAvailableWallet.bind(walletController),
        },
      },
    };
  }

  public initialize(app: any): void {
    soap.listen(app, "/wsdl/wallet", this.service, this.wsdl);
  }
}
