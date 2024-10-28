import { AppDataSource } from "../config/data-source.config";
import { Customer } from "../entities";

export class CustomerService {
  private customerRepository = AppDataSource.getRepository(Customer);

  async createCustomer(customer: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customer);
    return await this.customerRepository.save(newCustomer);
  }

  async getCustomer(id: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async getCustomerByTerm(args: any): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { cellular: args.cellular, dni: args.dni },
    });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async updateCustomer(
    id: string,
    customer: Partial<Customer>
  ): Promise<Customer | null> {
    await this.customerRepository.update(id, customer);
    return this.customerRepository.findOne({ where: { id } });
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
