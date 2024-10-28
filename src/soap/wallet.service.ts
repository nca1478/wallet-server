import fs from "fs";
import path from "path";
import * as soap from "soap";
import { WalletController } from "../controllers";
import { envs } from "../config";

export class WalletService {
  private wsdlPath: string;
  private wsdl: string;
  private walletController = new WalletController();
  private soapRoute = "/wsdl/wallet";
  private urlService = `${envs.API_HOST}:${envs.API_PORT}${this.soapRoute}`;

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
    soap.listen(app, this.soapRoute, this.service, this.wsdl);
    console.log("Wallet Service running on", this.urlService);
  }
}
