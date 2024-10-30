import { AppDataSource } from "../config/data-source.config";
import { User } from "../entities";
import { BodyValidation } from "../utils";
import { CustomerService, WalletService } from "./index";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private customerService = new CustomerService();
  private walletService = new WalletService();

  async createUser(args: Partial<any>): Promise<User | any> {
    try {
      BodyValidation.validateUser(args);

      const { email } = args;

      const findUser = await this.getUserByEmail(email);
      if (findUser) {
        throw new Error("Usuario ya está registrado");
      }

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

      const newWallet = {
        customer: createdCustomer,
      };

      const createdWallet = await this.walletService.createWallet(newWallet);

      return {
        ...savedUser,
        customer: createdCustomer.id,
        wallet: createdWallet.id,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
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
