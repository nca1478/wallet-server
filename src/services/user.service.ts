import { AppDataSource } from "../config/data-source.config";
import { User } from "../entities";
import { CustomerService } from "./customer.service";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private customerService = new CustomerService();

  async createUser(args: Partial<any>): Promise<User | any> {
    const createdUser = this.userRepository.create(args);
    const savedUser = await this.userRepository.save(createdUser);

    const newCustomer = {
      name: args.name,
      email: args.email,
      cellular: args.cellular,
      dni: args.dni,
      user: savedUser,
    };

    const createdCustomer = await this.customerService.createCustomer(
      newCustomer
    );

    return { ...savedUser, customer: createdCustomer.id };
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
