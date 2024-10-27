import fs from "fs";
import path from "path";
import * as soap from "soap";
import { CustomerController } from "../controllers";

export class CustomerService {
  private wsdlPath: string;
  private wsdl: string;
  private customerController: CustomerController;

  constructor() {
    this.wsdlPath = path.resolve(
      __dirname,
      "..",
      "wsdl",
      "customer.service.wsdl"
    );
    this.wsdl = fs.readFileSync(this.wsdlPath, "utf8");
    this.customerController = new CustomerController();
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
    soap.listen(app, "/wsdl/customer", this.service, this.wsdl);
  }
}
