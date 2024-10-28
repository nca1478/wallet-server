import fs from "fs";
import path from "path";
import * as soap from "soap";
import { OrderController } from "../controllers";
import { envs } from "../config";

export class OrderService {
  private wsdlPath: string;
  private wsdl: string;
  private orderController = new OrderController();
  private soapRoute = "/wsdl/order";
  private urlService = `${envs.API_HOST}:${envs.API_PORT}${this.soapRoute}`;

  constructor() {
    this.wsdlPath = path.resolve(__dirname, "..", "wsdl", "order.service.wsdl");
    this.wsdl = fs.readFileSync(this.wsdlPath, "utf8");
  }

  public get service() {
    const { orderController } = this;

    return {
      OrderService: {
        OrderServiceSoapPort: {
          createOrder: orderController.createOrder.bind(orderController),
        },
      },
    };
  }

  public initialize(app: any): void {
    soap.listen(app, this.soapRoute, this.service, this.wsdl);
    console.log("Order Service running on", this.urlService);
  }
}
