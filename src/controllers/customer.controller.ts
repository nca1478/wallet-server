import { CustomerService } from "../services";

export class CustomerController {
  private customerService = new CustomerService();

  async createCustomer(args: any) {
    return this.customerService.createCustomer(args);
  }

  async getCustomer(args: any) {
    return this.customerService.getCustomer(args.id);
  }

  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  async updateCustomer(args: any) {
    return this.customerService.updateCustomer(args.id, args);
  }

  async deleteCustomer(args: any) {
    return this.customerService.deleteCustomer(args.id);
  }
}
