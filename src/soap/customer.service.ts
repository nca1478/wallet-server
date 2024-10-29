import fs from "fs";
import path from "path";
import * as soap from "soap";
import { CustomerController } from "../controllers";
import { envs } from "../config";

export class CustomerService {
  private wsdlPath: string;
  private wsdl: string;
  private customerController = new CustomerController();
  private soapRoute = "/wsdl/customer";
  private urlService = `${envs.API_HOST}:${envs.API_PORT}${this.soapRoute}`;

  constructor() {
    this.wsdlPath = path.resolve(`${process.cwd()}/wsdl/customer.service.wsdl`);
    this.wsdl = fs.readFileSync(this.wsdlPath, "utf8");
  }

  public get service() {
    const { customerController } = this;

    return {
      CustomerService: {
        CustomerServiceSoapPort: {
          createCustomer:
            customerController.createCustomer.bind(customerController),
          getCustomer: customerController.getCustomer.bind(customerController),
          getAllCustomers:
            customerController.getAllCustomers.bind(customerController),
          updateCustomer:
            customerController.updateCustomer.bind(customerController),
          deleteCustomer:
            customerController.deleteCustomer.bind(customerController),
        },
      },
    };
  }

  public initialize(app: any): void {
    soap.listen(app, this.soapRoute, this.service, this.wsdl);
    console.log("Customer Service running on", this.urlService);
  }
}
